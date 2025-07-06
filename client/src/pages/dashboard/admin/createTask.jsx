import { useEffect, useState } from 'react';
import { createTasks } from '../../../api/tasks';
import { getAllMembers } from '../../../api/members';
import { useParams } from 'react-router-dom';


const CreateTask = ({ projectId }) => {
  const {id} = useParams();
  const finalProjectId = projectId ?? id; 
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: '',
    assignedUsers: [],
  });
  

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getAllMembers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssignedUsersChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setTask((prev) => ({ ...prev, assignedUsers: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!finalProjectId) {
      console.error('Missing project ID');
      return;
    }

    try {
      const payload = { ...task, project: finalProjectId };
      const result = await createTasks(payload);
      console.log('Task created:', result);

      // Reset form
      setTask({
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        status: '',
        assignedUsers: [],
      });
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={task.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            name="dueDate"
            className="form-control"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select
            name="priority"
            className="form-select"
            value={task.priority}
            onChange={handleChange}
            required
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={task.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Assign Users</label>
          <select
            multiple
            className="form-select"
            name="assignedUsers"
            value={task.assignedUsers}
            onChange={handleAssignedUsersChange}
            required
          >
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
