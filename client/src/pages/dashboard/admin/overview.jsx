
import { Link } from "react-router-dom";
import { Chart } from 'primereact/chart';
import { useEffect, useState } from "react";
import { getAllStats } from "../../../api/view";



const AdminOverview = ({user}) => {

const [stats, setStats] = useState({
    projects: {
      complete: 0,
      inProgress: 0,
      notStarted: 0,
    },
    tasks: {
      complete: 0,
      inProgress: 0,
      notStarted: 0,
    },
    users: 0
});

const projectTaskStats = {
  labels: ['Completed', 'In Progress', 'Not Started'],
  projects: [8, 5, 2],
  tasks: [25, 12, 6]
};

const userStats = {
  labels: ['User A', 'User B', 'User C', 'User D'],
  data: [10, 5, 8, 3], // e.g., tasks or projects per user
};

  // Bar Chart Data
  const barChartData = {
    labels: projectTaskStats.labels,
    datasets: [
      {
        label: 'Projects',
        backgroundColor: '#42A5F5',
        data: projectTaskStats.projects,
      },
      {
        label: 'Tasks',
        backgroundColor: '#FFA726',
        data: projectTaskStats.tasks,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Pie Chart Data
  const pieChartData = {
    labels: userStats.labels,
    datasets: [
      {
        data: userStats.data,
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF6384'],
        hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#FF6384'],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

const fetchStats = async () => {
    try {
      const response = await getAllStats();
      console.log(response);
      
      setStats(response);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);




  return (
    <div className="overview">
       <div className="body-wrapper">
        <div className="body-wrapper-inner">
          <div className="container-fluid">
         

            {/* <!--  Row 1 --> */ }
            {stats && (<div className="row stats-row">
              {/* Projects Status */}
              <div className="col-sm-6 col-xl-3">
                <div className="card overflow-hidden">
                  <div className="position-relative">
                    <a href="javascript:void(0)"
                      className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Projects Overview">
                      <i className="ti ti-layout-dashboard fs-4"></i>
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-2">Projects</h6>
                    <div className="d-flex align-items-center justify-content-center">
                      <h6 className="fs-6 mb-0">
                        Completed: {stats.projects.complete}<br />
                        In Progress: {stats.projects.inProgress}<br />
                        Not Started: {stats.projects.notStarted}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks Status */}
              <div className="col-sm-6 col-xl-3">
                <div className="card overflow-hidden">
                  <div className="position-relative">
                    <a href="javascript:void(0)"
                      className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tasks Overview">
                      <i className="ti ti-checklist fs-4"></i>
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-2">Tasks</h6>
                    <div className="d-flex align-items-center justify-content-center">
                      <h6 className="fs-6 mb-0">
                        Completed: {stats.tasks.complete}<br />
                        In Progress: {stats.tasks.inProgress}<br />
                        Not Started: {stats.tasks.notStarted}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              {/* Users Count */}
              <div className="col-sm-6 col-xl-3">
                <div className="card overflow-hidden">
                  <div className="position-relative">
                    <a href="javascript:void(0)"
                      className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Users">
                      <i className="ti ti-users fs-4"></i>
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-2">Total Users</h6>
                    <div className="d-flex align-items-center justify-content-center">
                      <h6 className="fs-1 mb-0">{stats.users}</h6>
                    </div>
                  </div>
                </div>
              </div>

              {/* (Optional) Empty or extra card if needed */}
              <div className="col-sm-6 col-xl-3">
                <div className="card overflow-hidden">
                  <div className="position-relative">
                    <a href="javascript:void(0)"
                      className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Reserved">
                      <i className="ti ti-dots fs-4"></i>
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-2">Coming Soon</h6>
                    <div className="d-flex align-items-center justify-content-center">
                      <h6 className="fw-semibold fs-4 mb-0">...</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}

            <div className="row">
              {/* Bar Graph */}
              <div className="col-lg-8 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <h5 className="card-title fw-semibold">Projects & Tasks Status</h5>
                    </div>
                    <Chart type="bar" data={barChartData} options={barChartOptions} />
                  </div>
                </div>
              </div>

              {/* Pie Graph */}
              <div className="col-lg-4 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold mb-3">User Contribution</h5>
                    <Chart type="pie" data={pieChartData} options={pieChartOptions} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body p-4">
                    <div className="mb-4">
                      <h5 className="card-title fw-semibold">Daily Project Status Updates</h5>
                    </div>
                    <ul className="timeline-widget mb-0 position-relative mb-n5">
                      <li className="timeline-item d-flex position-relative overflow-hidden">
                        <div className="timeline-time text-dark flex-shrink-0 text-end">10:00 AM</div>
                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                          <span className="timeline-badge border-2 border border-success flex-shrink-0 my-2"></span>
                          <span className="timeline-badge-border d-block flex-shrink-0"></span>
                        </div>
                        <div className="timeline-desc text-dark mt-n1 fw-semibold">
                          Project <span className="text-primary">#SchoolMgmt</span> marked as <span className="text-success">Completed</span>
                        </div>
                      </li>
                      <li className="timeline-item d-flex position-relative overflow-hidden">
                        <div className="timeline-time text-dark flex-shrink-0 text-end">11:30 AM</div>
                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                          <span className="timeline-badge border-2 border border-warning flex-shrink-0 my-2"></span>
                          <span className="timeline-badge-border d-block flex-shrink-0"></span>
                        </div>
                        <div className="timeline-desc text-dark mt-n1 fw-semibold">
                          Project <span className="text-primary">#PharmacyApp</span> moved to <span className="text-warning">In Progress</span>
                        </div>
                      </li>
                      <li className="timeline-item d-flex position-relative overflow-hidden">
                        <div className="timeline-time text-dark flex-shrink-0 text-end">01:00 PM</div>
                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                          <span className="timeline-badge border-2 border border-info flex-shrink-0 my-2"></span>
                        </div>
                        <div className="timeline-desc text-dark mt-n1 fw-semibold">
                          Task added to <span className="text-primary">#InventorySys</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

             <div className="col-lg-8 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body p-4">
                    <div className="d-flex mb-4 justify-content-between align-items-center">
                      <h5 className="mb-0 fw-bold">User Login Activity</h5>
                      <div className="dropdown">
                        <button id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                          className="rounded-circle btn-transparent rounded-circle btn-sm px-1 btn shadow-none">
                          <i className="ti ti-dots-vertical fs-7 d-block"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                          <li><a className="dropdown-item" href="#">Export</a></li>
                          <li><a className="dropdown-item" href="#">Download CSV</a></li>
                        </ul>
                      </div>
                    </div>

                    <div className="table-responsive" data-simplebar>
                      <table className="table table-borderless align-middle text-nowrap">
                        <thead>
                          <tr>
                            <th>Profile</th>
                            <th>Last Login</th>
                            <th>Active Today</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="me-4">
                                  <img src="../assets/images/profile/user1.jpg" width="50" className="rounded-circle" alt="" />
                                </div>
                                <div>
                                  <h6 className="mb-1 fw-bolder">Manish Panda</h6>
                                  <p className="mb-0">Backend Developer</p>
                                </div>
                              </div>
                            </td>
                            <td>Today 9:12 AM</td>
                            <td><span className="badge bg-light-success text-success px-3 py-2 rounded-pill">Yes</span></td>
                            <td><span className="badge bg-light-success rounded-pill text-success px-3 py-2">Active</span></td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="me-4">
                                  <img src="../assets/images/profile/user2.jpg" width="50" className="rounded-circle" alt="" />
                                </div>
                                <div>
                                  <h6 className="mb-1 fw-bolder">Arya H. Shah</h6>
                                  <p className="mb-0">Full Stack Dev</p>
                                </div>
                              </div>
                            </td>
                            <td>Yesterday 6:45 PM</td>
                            <td><span className="badge bg-light-danger text-danger px-3 py-2 rounded-pill">No</span></td>
                            <td><span className="badge bg-light-warning rounded-pill text-warning px-3 py-2">On Leave</span></td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="me-4">
                                  <img src="../assets/images/profile/user3.jpg" width="50" className="rounded-circle" alt="" />
                                </div>
                                <div>
                                  <h6 className="mb-1 fw-bolder">June R. Smith</h6>
                                  <p className="mb-0">Frontend Dev</p>
                                </div>
                              </div>
                            </td>
                            <td>2 Days Ago</td>
                            <td><span className="badge bg-light-danger text-danger px-3 py-2 rounded-pill">No</span></td>
                            <td><span className="badge bg-light-danger rounded-pill text-danger px-3 py-2">Inactive</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>


            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOverview;