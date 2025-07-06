// src/pages/webpages/Login.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('authToken', data.user.token.split(" ")[1]);
      dispatch(loginSuccess({ user: data.user.name, token: data.user.token, role: data.user.role, id: data.user.id  }));
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
       setError(err.message);
    }
  };

  return (
    <>
       <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <div className="position-relative overflow-hidden text-bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <Link to="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                    <img src={"assets/images/logos/favicon.png"} alt="Logo" />
                  </Link>
                  <p className="text-center">Project Management</p>

                  <form onSubmit={handleLogin}>
                    {error && (
                      <div className="alert alert-danger text-center">{error}</div>
                    )}

                    <div className="mb-3">
                      <label htmlFor="emailInput" className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="passwordInput" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input primary"
                          type="checkbox"
                          id="rememberDevice"
                          defaultChecked
                        />
                        <label className="form-check-label text-dark" htmlFor="rememberDevice">
                          Remember this Device
                        </label>
                      </div>
                      <Link className="text-primary fw-bold" to="/forgot-password">
                        Forgot Password?
                      </Link>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2 fs-5 mb-4">
                      Sign In
                    </button>

                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-5 mb-0 fw-bold">New here?</p>
                      <Link className="text-primary fw-bold ms-2" to="/signup">
                        Create an account
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
    </>
  );
};

export default Login;
