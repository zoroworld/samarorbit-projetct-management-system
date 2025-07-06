import { useEffect, useState } from 'react';
import { getAllMembers } from '../../../api/members';
import { createProject } from '../../../api/projects';

const CreateProject = () => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    status: '',
    startDate: '',
    endDate: '',
    assignedUsers: []
  });

  const [userData, setUserData] = useState([]);
  const [projectCreated, setProjectCreated] = useState(false);

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProject(project);
      console.log('Project Created:', response);
      setProjectCreated(true);
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  const fetchMembers = async () => {
    try {
      const data = await getAllMembers();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Create Project</h2>

      <form onSubmit={handleProjectSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Project Title</label>
          <input type="text" name="title" className="form-control" value={project.title} onChange={handleProjectChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" value={project.description} onChange={handleProjectChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input type="date" name="startDate" className="form-control" value={project.startDate} onChange={handleProjectChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input type="date" name="endDate" className="form-control" value={project.endDate} onChange={handleProjectChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Assign Users</label>
          <select
            multiple
            className="form-select"
            name="assignedUsers"
            value={project.assignedUsers}
            onChange={(e) => {
              const options = Array.from(e.target.selectedOptions).map((o) => o.value);
              setProject({ ...project, assignedUsers: options });
            }}
          >
            {userData.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select name="status" className="form-select" value={project.status} onChange={handleProjectChange} required>
            <option value="">Select Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button className="btn btn-primary" type="submit">Create Project</button>
      </form>

      {projectCreated && (
        <div className="alert alert-success">Project created successfully!</div>
      )}
    </div>
  );
};

export default CreateProject;
