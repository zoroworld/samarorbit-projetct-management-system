import { useEffect, useState, useRef } from "react";
import {
  getAllProjects,
  updateProject,
  deleteProject,
} from "../../../api/projects";
import { getAllMembers } from "../../../api/members"; // 🔹 You need this
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Link } from "react-router-dom";

const ViewProjects = () => {
  const [projectData, setProjectData] = useState([]);
  const [filters, setFilters] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [editProject, setEditProject] = useState(null);
  const [users, setUsers] = useState([]); // 🔹 All users
  const modalRef = useRef();

  const fetchProjectData = async () => {
    try {
      const data = await getAllProjects();
      setProjectData(data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getAllMembers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      title: { value: null, matchMode: FilterMatchMode.CONTAINS },
      description: { value: null, matchMode: FilterMatchMode.CONTAINS },
      status: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
  };

  useEffect(() => {
    fetchProjectData();
    fetchUsers(); // 🔹 load all users
    initFilters();
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue(value);
  };

  const assignedUsersTemplate = (rowData) => {
    if (!rowData.assignedUsers?.length)
      return <span className="text-muted">No users</span>;
    return (
      <ul className="list-unstyled mb-0">
        {rowData.assignedUsers.map((user) => (
          <li key={user._id}>
            <i className="pi pi-user text-primary me-1" /> {user.username}
          </li>
        ))}
      </ul>
    );
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      await updateProject(editProject._id, {
        ...editProject,
        assignedUsers: editProject.assignedUsers || [],
      });
      fetchProjectData();
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;
    try {
      await deleteProject(projectId);
      fetchProjectData();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const actionTemplate = (rowData) => (
    <div className="d-flex gap-2 justify-content-center">
      <button
        className="btn btn-sm btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#editProjectModal"
        onClick={() =>
          setEditProject({
            ...rowData,
            assignedUsers: rowData.assignedUsers?.map((u) => u._id) || [],
          })
        }
      >
        <i className="pi pi-pencil"></i>
      </button>

      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => handleDelete(rowData._id)}
      >
        <i className="pi pi-trash"></i>
      </button>

      <Link
        to={`/admin/project/${rowData._id}/tasks`}
        className="btn btn-sm btn-primary"
      >
        View tasks
      </Link>
    </div>
  );

  const renderHeader = () => (
    <div className="d-flex justify-content-between align-items-center">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search projects..."
        />
      </span>
    </div>
  );

  return (
    <div className="mt-4">
      <h1 className="mb-4">View Projects</h1>
      <div className="container mt-4">
        <div className="shadow p-0">
          <DataTable
            value={projectData}
            paginator
            rows={5}
            dataKey="_id"
            filters={filters}
            filterDisplay="row"
            globalFilterFields={["title", "description", "status"]}
            header={renderHeader()}
            emptyMessage="No projects found."
            className="p-datatable-striped p-datatable-gridlines"
            responsiveLayout="scroll"
          >
            <Column field="title" header="Name" filter sortable />
            <Column field="description" header="Description" filter sortable />
            <Column field="status" header="Status" filter sortable />
            <Column header="Assigned Users" body={assignedUsersTemplate} />
            <Column
              field="startDate"
              header="Start Date"
              body={(row) => new Date(row.startDate).toLocaleDateString()}
              sortable
            />
            <Column
              field="endDate"
              header="End Date"
              body={(row) => new Date(row.endDate).toLocaleDateString()}
              sortable
            />
            <Column header="Actions" body={actionTemplate} />
          </DataTable>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="editProjectModal"
        tabIndex="-1"
        aria-labelledby="editProjectModalLabel"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleUpdateProject}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Project</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={editProject?.title || ""}
                  onChange={(e) =>
                    setEditProject({ ...editProject, title: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={editProject?.description || ""}
                  onChange={(e) =>
                    setEditProject({
                      ...editProject,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={editProject?.status || ""}
                  onChange={(e) =>
                    setEditProject({ ...editProject, status: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Assign Users</label>
                <select
                  className="form-select"
                  multiple
                  value={editProject?.assignedUsers || []}
                  onChange={(e) =>
                    setEditProject({
                      ...editProject,
                      assignedUsers: Array.from(
                        e.target.selectedOptions,
                        (opt) => opt.value
                      ),
                    })
                  }
                >
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={
                    editProject?.startDate
                      ? new Date(editProject.startDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setEditProject({ ...editProject, startDate: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={
                    editProject?.endDate
                      ? new Date(editProject.endDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setEditProject({ ...editProject, endDate: e.target.value })
                  }
                />
</div>

            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" type="submit">
                Update
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewProjects;
