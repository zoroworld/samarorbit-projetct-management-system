import { useEffect, useState } from "react";
import { getAllMembers } from "../../../api/members";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

const ViewMembers = () => {
  const [userData, setUserData] = useState([]);
  const [filters, setFilters] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const fetchProjectData = async () => {
    try {
      const data = await getAllMembers();
      // console.log(data);
      
      setUserData(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
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
    fetchProjectData();
    initFilters();
  }, []);

  const renderHeader = () => (
    <div className="flex justify-between items-center">
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

  const handleEdit = (project) => {
    console.log("Edit project:", project);
  };

  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      // await deleteProject(projectId); // Uncomment when deleteProject API is ready
      console.log("Deleted project:", projectId);
      fetchProjectData();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const actionTemplate = (rowData) => { 
    return (
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
    )
};

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "-";

  return (
    <div className="mt-4">
      <h1 className="mb-4">View Members</h1>
      <div className="container mt-4">
        <div className="shadow p-3">
          <DataTable
            value={userData}
            paginator
            rows={5}
            dataKey="_id"
            filters={filters}
            filterDisplay="row"
            globalFilterFields={['username', 'email']}
            header={renderHeader()}
            emptyMessage="No projects found."
            className="p-datatable-striped p-datatable-gridlines"
            responsiveLayout="scroll"
          >
            <Column
              field="username"
              header="Name"
              filter
              filterPlaceholder="Search by title"
              sortable
              style={{ minWidth: '12rem' }}
            />
             <Column
              field="email"
              header="Email"
              filter
              filterPlaceholder="Search by title"
              sortable
              style={{ minWidth: '12rem' }}
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

export default ViewMembers;
