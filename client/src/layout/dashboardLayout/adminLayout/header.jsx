import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();
  const notificationRef = useRef();
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Example: Clear token and navigate
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate("/login");
  };

  return (
    <header className="app-header bg-light border-bottom shadow">
      <nav className="navbar navbar-expand-lg navbar-light container-fluid px-3">
        {/* Right: Profile & Button */}
        <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
          <ul className="navbar-nav flex-row align-items-center gap-3">
             <li className="nav-item d-block d-xl-none">
            <button className="nav-link border-0 bg-transparent" id="headerCollapse">
              <i className="ti ti-menu-2 fs-4"></i>
            </button>
          </li>

          {/* Notifications */}
          <li className="nav-item dropdown" ref={notificationRef}>
            <button
              className="nav-link border-0 bg-transparent position-relative"
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <iconify-icon icon="solar:bell-linear" className="fs-3"></iconify-icon>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-primary border border-light rounded-circle">
                <span className="visually-hidden">New alerts</span>
              </span>
            </button>

            {notificationOpen && (
              <div className="dropdown-menu show dropdown-menu-animate-up mt-2 end-0 shadow">
                <div className="message-body px-3 py-2">
                  <div className="dropdown-item">Notification 1</div>
                  <div className="dropdown-item">Notification 2</div>
                </div>
              </div>
            )}
          </li>
            {/* Profile Dropdown */}
            <li className="nav-item dropdown" ref={profileRef}>
              <button
                className="nav-link border-0 bg-transparent p-0"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Profile"
                  className="rounded-circle"
                  width="40"
                  height="40"
                />
              </button>

              {profileOpen && (
                <div className="dropdown-menu dropdown-menu-end show dropdown-menu-animate-up end-0  mt-2 shadow">
                  <div className="message-body px-3 py-2">
                    <Link to="/profile" className="dropdown-item d-flex align-items-center gap-2">
                      <i className="ti ti-user fs-6"></i>
                      <span>My Profile</span>
                    </Link>
                    <Link to="/account" className="dropdown-item d-flex align-items-center gap-2">
                      <i className="ti ti-mail fs-6"></i>
                      <span>My Account</span>
                    </Link>
                    <Link to="/tasks" className="dropdown-item d-flex align-items-center gap-2">
                      <i className="ti ti-list-check fs-6"></i>
                      <span>My Tasks</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline-primary w-100 mt-2"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
