

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getTasksByUser } from "../../../api/tasks";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { updateTask } from "../../../api/tasks";


const UserTasks = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const userData = useOutletContext();
  const [updatedStatus, setUpdatedStatus] = useState("");


  const fetchUserTasks = async (userId) => {
    try {
      const res = await getTasksByUser(userId);
    //   console.log(res);
      
      setUserTasks(res.tasks); 
    } catch (err) {
      console.error("Error fetching user tasks:", err);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      fetchUserTasks(userData.id);
      initFilters();
    }
  }, [userData]);

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
    setGlobalFilterValue(value);
    setFilters({ ...filters, global: { ...filters.global, value } });
  };

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

  const handleStatusUpdate = async (taskId, newStatus) => {
    console.log(taskId, newStatus);
    
  try {
    if (!newStatus) return alert("Please select a status first.");
    await updateTask(taskId, { status: newStatus });
    await fetchUserTasks(userData.id);
  } catch (err) {
    console.error("Failed to update task status:", err);
  }
};


  const projectTemplate = (rowData) => rowData.project?.title || "N/A";

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Tasks Assigned to You</h1>
      <div className="shadow p-0">
        <DataTable
          value={userTasks}
          paginator
          rows={5}
          dataKey="_id"
          filters={filters}
          filterDisplay="row"
          globalFilterFields={["title", "description", "status"]}
          header={renderHeader()}
          emptyMessage="No tasks found."
          className="p-datatable-striped p-datatable-gridlines"
          responsiveLayout="scroll"
        >
          <Column field="title" header="Title" filter filterPlaceholder="Search by title" sortable style={{ minWidth: "12rem" }} />
          <Column field="description" header="Description" filter filterPlaceholder="Search by description" sortable style={{ minWidth: "16rem" }} />
          <Column field="priority" header="Priority" sortable style={{ minWidth: "8rem" }} />
          <Column
            field="dueDate"
            header="Due Date"
            body={(row) => new Date(row.dueDate).toLocaleDateString()}
            sortable
            style={{ minWidth: "10rem" }}
          />
          <Column
            header="Project"
            body={projectTemplate}
            style={{ minWidth: "14rem" }}
          />
            <Column
            header="Actions"
            body={(rowData) => {
                return (
                <form
                    className="d-flex flex-column gap-1"
                    onSubmit={(e) => {
                    e.preventDefault();
                    const status = e.target.elements[`status-${rowData._id}`].value;
                    handleStatusUpdate(rowData._id, status);
                    }}
                >
                    <select
                    name={`status-${rowData._id}`}
                    className="form-select form-select-sm"
                    defaultValue={rowData.status}
                    >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    </select>

                    <button
                    type="submit"
                    className="btn btn-sm btn-primary mt-1"
                    >
                    Update
                    </button>
                </form>
                );
            }}
            style={{ minWidth: "12rem" }}
            />

        </DataTable>
      </div>
    </div>
  );
};

export default UserTasks;
