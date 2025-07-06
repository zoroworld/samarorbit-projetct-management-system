import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getProjectsByUser } from "../../../api/projects";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

const UserViewProjects = () => {
  const [userProjects, setUserProjects] = useState([]);
  const [filters, setFilters] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const userData = useOutletContext();

  const fetchUserProjects = async (userId) => {
    try {
      const res = await getProjectsByUser(userId);
      setUserProjects(res.projects); // Adjust if response structure is different
    } catch (err) {
      console.error("Error fetching user projects:", err);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      fetchUserProjects(userData.id);
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
          placeholder="Search projects..."
        />
      </span>
    </div>
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Projects Assigned to You</h1>
      <div className="shadow p-0">
        <DataTable
          value={userProjects}
          paginator
          rows={5}
          dataKey="_id"
          filters={filters}
          filterDisplay="row"
          globalFilterFields={['title', 'description', 'status']}
          header={renderHeader()}
          emptyMessage="No projects found."
          className="p-datatable-striped p-datatable-gridlines"
          responsiveLayout="scroll"
        >
          <Column field="title" header="Title" filter filterPlaceholder="Search by title" sortable style={{ minWidth: '12rem' }} />
          <Column field="description" header="Description" filter filterPlaceholder="Search by description" sortable style={{ minWidth: '16rem' }} />
          <Column field="status" header="Status" filter filterPlaceholder="Status" sortable style={{ minWidth: '10rem' }} />
          <Column
            field="startDate"
            header="Start Date"
            body={(row) => new Date(row.startDate).toLocaleDateString()}
            sortable
            style={{ minWidth: '10rem' }}
          />
          <Column
            field="endDate"
            header="End Date"
            body={(row) => new Date(row.endDate).toLocaleDateString()}
            sortable
            style={{ minWidth: '10rem' }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default UserViewProjects;
