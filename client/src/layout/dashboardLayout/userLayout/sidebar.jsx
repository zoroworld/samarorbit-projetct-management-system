import { Link } from "react-router-dom";
import { useState } from "react";
import "iconify-icon";


const Sidebar = () => {

  const [isFrontOpen, setIsFrontOpen] = useState(false);

  return (
      <aside className="left-sidebar">
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-center">
            <Link to="/admin" className="text-indigo-600 hover:text-indigo-800 transition duration-300">
              <h1 className="d-flex align-items-center fw-bold text-primary">
                <i className="bi bi-speedometer2 me-2"></i> User Dashboard
              </h1>

            </Link>
            <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
              <i className="ti ti-x fs-8"></i>
            </div>
          </div>
          {/* <!-- Sidebar navigation--> */}
          <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
              {/* <li className="sidebar-item">
                <Link className="sidebar-link primary-hover-bg" to="/user" aria-expanded="false">
                  <iconify-icon icon="solar:atom-line-duotone"></iconify-icon>
                  <span className="hide-menu">Overview</span>
                </Link>
              </li> */}
              <li className="sidebar-item">
                <Link className="sidebar-link primary-hover-bg justify-content-between"
                  to="/user/projects" aria-expanded="false">
                  <div className="d-flex align-items-center gap-6">
                    <span className="d-flex">
                      <iconify-icon icon="solar:screencast-2-line-duotone" className=""></iconify-icon>
                    </span>
                    <span className="hide-menu">Projects</span>
                  </div>
                 
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link primary-hover-bg justify-content-between"
                  to="/user/tasks" aria-expanded="false">
                  <div className="d-flex align-items-center gap-6">
                    <span className="d-flex">
                      <iconify-icon icon="solar:chart-line-duotone" className=""></iconify-icon>
                    </span>
                    <span className="hide-menu">Tasks</span>
                  </div>
                 
                </Link>
              </li>
            </ul>
          </nav>
        
        </div>
    
      </aside>
 
  
  );
};

export default Sidebar;
