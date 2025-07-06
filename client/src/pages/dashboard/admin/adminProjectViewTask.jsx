
import { useEffect, useState } from "react";
import { getAllProjectTasks, getProjectById } from "../../../api/projects";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Link, useParams } from "react-router-dom";
import { getAllMembers } from "../../../api/members";
import { updateTask , deleteTask} from "../../../api/tasks";





const AdminProjectViewTask = () => {
  const [taskData, setTaskData] = useState([]);
  const [title, setTitle] = useState('');
  const [filters, setFilters] = useState({});
  const [editTask, setEditTask] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const {id} = useParams();

  const fetchTaskData = async () => {
    try {
        // console.log(id);
        
      const data = await getAllProjectTasks(id);
      const projectData = await getProjectById(id);
      setTitle(projectData.data.project.title);
      // console.log(projectData);

      const allTasks = data.project.tasks;
      
      setTaskData(allTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
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

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const fetchUsers = async () => {
    const data = await getAllMembers();
    // console.log(data);
    
    setAllUsers(data);
  };

  useEffect(() => {
    fetchTaskData();
    initFilters();
    fetchUsers();
  }, [0]);

  const renderHeader = () => (
    <div className="flex justify-between align-items-center">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search tasks..."
        />
      </span>
    </div>
  );

  const assignedUsersTemplate = (rowData) => {
    if (!rowData.assignedUsers || rowData.assignedUsers.length === 0) {
      return <span className="text-muted">No users</span>;
    }

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


  const handleDelete = async (taskId) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    try {
      await deleteTask(taskId);
      fetchTaskData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const actionTemplate = (rowData) => (
    <div className="d-flex gap-2 justify-content-center">
      <button
        className="btn btn-sm btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#editTaskModal"
        onClick={() => setEditTask(rowData)}
      >
        <i className="pi pi-pencil"></i>
      </button>

      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => handleDelete(rowData._id)}
      >
        <i className="pi pi-trash"></i>
      </button>
    </div>
    );


  return (
    <div className="mt-4">
     <div>
        <Link to={`/admin/project/${id}/create-task`} className="btn btn-primary">
          Create Tasks
        </Link>
      </div>
      <h1 className="mb-4">View Tasks of project {title && <span className="text-primary fw-bold">{title}</span>}</h1>
      <div className="container mt-4">
        <div className="shadow p-0">
          <DataTable
            value={taskData}
            paginator
            rows={5}
            dataKey="_id"
            filters={filters}
            filterDisplay="row"
            globalFilterFields={['title', 'description', 'status']}
            header={renderHeader()}
            emptyMessage="No tasks found."
            className="p-datatable-striped p-datatable-gridlines"
            responsiveLayout="scroll"
          >
            <Column field="title" header="Title" filter filterPlaceholder="Search by title" sortable style={{ minWidth: '12rem' }} />
            <Column field="description" header="Description" filter filterPlaceholder="Search by description" sortable style={{ minWidth: '16rem' }} />
            <Column field="status" header="Status" filter filterPlaceholder="Status" sortable style={{ minWidth: '10rem' }} />
            <Column field="priority" header="Priority" sortable style={{ minWidth: '8rem' }} />
            <Column
              field="dueDate"
              header="Due Date"
              body={(row) => new Date(row.dueDate).toLocaleDateString()}
              sortable
              style={{ minWidth: '10rem' }}
            />
            {/* <Column
              header="Project"
              body={projectTemplate}
              style={{ minWidth: '12rem' }}
            /> */}
            <Column
              header="Assigned Users"
              body={assignedUsersTemplate}
              style={{ minWidth: '14rem' }}
            />
            <Column
              header="Actions"
              body={actionTemplate}
              style={{ minWidth: '10rem', textAlign: 'center' }}
            />
          </DataTable>
        </div>
      </div>
        <div
            className="modal fade"
            id="editTaskModal"
            tabIndex="-1"
            aria-labelledby="editTaskModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <form
                className="modal-content"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await updateTask(editTask._id, editTask);
                  fetchTaskData();
                }}
              >
                <div className="modal-header">
                  <h5 className="modal-title" id="editTaskModalLabel">Edit Task</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>

                <div className="modal-body">
                  {/* Title */}
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editTask?.title || ''}
                      onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      value={editTask?.description || ''}
                      onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                      required
                    />
                  </div>

                  {/* Status */}
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={editTask?.status || ''}
                      onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                    >
                      <option value="">Select</option>
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      value={editTask?.priority || ''}
                      onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                    >
                      <option value="">Select</option>
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  {/* Assigned Users */}
                 <div className="mb-3">
                    <label className="form-label">Assigned Users</label>
                    <select
                      multiple
                      className="form-select"
                      value={editTask?.assignedUsers || []} // assignedUsers is array of IDs
                      onChange={(e) => {
                        const options = [...e.target.selectedOptions];
                        const userIds = options.map(o => o.value);
                        setEditTask({ ...editTask, assignedUsers: userIds });
                      }}
                    >
                      {allUsers.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Update</button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
              </form>
            </div>
          </div>

    </div>
  );
};

export default AdminProjectViewTask;
