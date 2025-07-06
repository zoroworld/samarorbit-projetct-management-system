import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../pages/webpages/login';
import Signup from '../pages/webpages/signup'; 
import Home from '../pages/webpages/home';

import Main from '../layout/webpageLayout/main'; 

import AdminOverview from '../pages/dashboard/admin/overview';
import UserOverview from '../pages/dashboard/user/overview';

import AdminLayout from '../layout/dashboardLayout/adminLayout/layout';
import UserLayout from '../layout/dashboardLayout/userLayout/layout';
import ViewProjects from '../pages/dashboard/admin/viewProjects';
import CreateProject from '../pages/dashboard/admin/createProject';
import EditProject from '../pages/dashboard/admin/editProject';
import AssignWork from '../pages/dashboard/admin/assignWork';
import CreateTask from '../pages/dashboard/admin/createTask';
import EditTask from '../pages/dashboard/admin/editTask';
import AssignTask from '../pages/dashboard/admin/assignTask';
import UserViewProjects from '../pages/dashboard/user/userViewProjects';
import UserTasks from '../pages/dashboard/user/userTasks';
import ViewMembers from '../pages/dashboard/admin/viewMembers';
import AdminProjectViewTask from '../pages/dashboard/admin/adminProjectViewTask';
import ProtectedRoute from '../component/ProtectedRoute';
import { useSelector } from 'react-redux';




const AppRouter = () => {
  const { user } = useSelector((state) => state.auth);

  
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Main />}>
          <Route index element={<Home />} /> 
          <Route path="login" element={<Login />} /> 
          <Route path="signup" element={<Signup />} />
        </Route>

       
           <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole={user ? user.role : 'admin'}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
            <Route index  element={<AdminOverview />} />
            <Route path="project" element={<ViewProjects />} />
            <Route path="project/create" element={<CreateProject />} />
            <Route path="project/edit/:projectId" element={<EditProject />} />
            <Route path="project/assign" element={<AssignWork />} />
            <Route path="project/delete/:projectId" element={<ViewProjects />} />
            <Route path="project/:id/tasks" element={<AdminProjectViewTask />} />
            <Route path="project/:id/create-task" element={<CreateTask />} />
            <Route path="project/:id/edit-task" element={<EditTask />} />
            <Route path="project/:id/delete-task" element={<AdminProjectViewTask />} />
            <Route path="project/:projectId/tasks/assign" element={<AssignTask />} />
            <Route path="project/:projectId/tasks/assign/add" element={<AssignTask />} />
            <Route path="project/:projectId/tasks/assign/delete" element={<AssignTask />} />


            <Route path="members" element={<ViewMembers />} />
            <Route path="members/edit" element={<membersEdit />}/>
            <Route path="members/delete/:memberId" element={<ViewMembers />}/>

          </Route>
        

         
             <Route
                path="/user"
                element={
                  <ProtectedRoute requiredRole={user ? user.role : 'user'}>
                    <UserLayout />
                  </ProtectedRoute>
                }
              >
            {/* <Route index element={<UserOverview />} /> */}
            <Route index element={<UserViewProjects />} />
            <Route  path="projects" element={<UserViewProjects />} />
            <Route path="tasks" element={<UserTasks />} />
          </Route>
        

      </Routes>
    </Router>
  );
};

export default AppRouter;
