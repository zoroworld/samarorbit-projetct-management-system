
import { useEffect, useState } from "react";
import { getAllProjectTasks } from "../../../api/projects";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Link } from "react-router-dom";

const AdminViewTask = () => {
  const [taskData, setTaskData] = useState([]);
  const [filters, setFilters] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const fetchTaskData = async () => {
    try {
      const data = await getAllProjectTasks();
      console.log(data);
      
      setTaskData(data.tasks);
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

  useEffect(() => {
    fetchTaskData();
    initFilters();
  }, []);

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

  const projectTemplate = (rowData) => {
    return rowData.project?.title || "Unassigned";
  };

  const handleEdit = (task) => {
    console.log("Edit task:", task);
  };

  const handleDelete = async (taskId) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    try {
      // await deleteTask(taskId);
      console.log("Deleted task:", taskId);
      fetchTaskData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const actionTemplate = (rowData) => (
    <div className="d-flex gap-2 justify-content-center">
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => handleEdit(rowData)}
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
      <h1 className="mb-4">View Tasks</h1>
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
            <Column
              header="Project"
              body={projectTemplate}
              style={{ minWidth: '12rem' }}
            />
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
    </div>
  );
};

export default AdminViewTask;
