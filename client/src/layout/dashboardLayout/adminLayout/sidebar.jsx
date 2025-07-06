import { Link } from "react-router-dom";
import { useState } from "react";
import "iconify-icon";


const Sidebar = () => {


  return (
      <aside className="left-sidebar">
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-between">
            <Link to="/" className="text-nowrap logo-img">
               <h1>Admin</h1>
            </Link>
            <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
              <i className="ti ti-x fs-8"></i>
            </div>
          </div>
          {/* <!-- Sidebar navigation--> */}
          <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
              <li className="sidebar-item">
                <Link className="sidebar-link primary-hover-bg" to="/admin" aria-expanded="false">
                  <iconify-icon icon="solar:atom-line-duotone"></iconify-icon>
                  <span className="hide-menu">Overview</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link primary-hover-bg justify-content-between"
                  to="/admin/members" aria-expanded="false">
                  <div className="d-flex align-items-center gap-6">
                    <span className="d-flex">
                      <iconify-icon icon="solar:screencast-2-line-duotone" className=""></iconify-icon>
                    </span>
                    <span className="hide-menu">View members</span>
                  </div>
                 
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link primary-hover-bg justify-content-between"
                  to="/admin/project" aria-expanded="false">
                  <div className="d-flex align-items-center gap-6">
                    <span className="d-flex">
                      <iconify-icon icon="solar:chart-line-duotone" className=""></iconify-icon>
                    </span>
                    <span className="hide-menu">View Projects</span>
                  </div>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link primary-hover-bg justify-content-between"
                  to="/admin/project/create" aria-expanded="false">
                  <div className="d-flex align-items-center gap-6">
                    <span className="d-flex">
                      <iconify-icon icon="solar:chart-line-duotone" className=""></iconify-icon>
                    </span>
                    <span className="hide-menu">Create Projects</span>
                  </div>
                 
                </Link>
              </li>

{/* 
              <li className="sidebar-item">
                <Link className="sidebar-link primary-hover-bg justify-content-between"
                  to="/admin/project/assign" aria-expanded="false">
                  <div className="d-flex align-items-center gap-6">
                    <span className="d-flex">
                      <iconify-icon icon="solar:chart-line-duotone" className=""></iconify-icon>
                    </span>
                    <span className="hide-menu">Assign work</span>
                  </div>
                 
                </Link>
              </li> */}

              

             
            </ul>
          </nav>
        
        </div>
    
      </aside>
 
  
  );
};

export default Sidebar;
