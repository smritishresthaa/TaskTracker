import Header from './components/Header';
import Footer from './components/Footer';
import Button from './components/Button';
import Tasklist from './components/Tasklist';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState('');

  const navigate = useNavigate();

  // 🚫 Redirect to /login if no token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  // 🔄 Fetch tasks from backend
  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
  };

  // ➕ Create task
  const createTask = async (text) => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: text }),
    });
    if (!res.ok) throw new Error('Failed to add task');
    return res.json();
  };

  // ❌ Delete task
  const removeTask = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete task');
  };

  // ✏️ Update task
  const updateTask = async (id, title) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return res.json();
  };

  // ✅ Init
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
        setWelcomeMessage('Welcome to the Task Tracker App!');
        const timer = setTimeout(() => setWelcomeMessage(''), 3000);
        return () => clearTimeout(timer);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  // ➕ Add task
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
      setNewTask('');
    } catch (err) {
      alert('Error creating task: ' + err.message);
    }
  };

  // ❌ Delete
  const deleteTask = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task?.completed) return alert('Complete the task before deleting.');
    try {
      await removeTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      alert('Error deleting task: ' + err.message);
    }
  };

  // ✅ Toggle
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // ✏️ Start editing
  const startEditing = (id, currentTitle) => {
    setEditingTaskId(id);
    setEditText(currentTitle);
  };

  // 💾 Submit edited task
  const handleEditSubmit = async () => {
    if (!editText.trim()) return;
    try {
      const updated = await updateTask(editingTaskId, editText);
      setTasks(tasks.map((t) => (t._id === editingTaskId ? updated : t)));
      setEditingTaskId(null);
      setEditText('');
    } catch (err) {
      alert('Error updating task: ' + err.message);
    }
  };

  if (loading) return <div className="p-4">Loading tasks...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto my-8 flex-grow p-4">
        {welcomeMessage && (
          <div className="bg-blue-100 border-2 border-blue-500 text-blue-700 p-4 mb-4 rounded">
            <p>{welcomeMessage}</p>
          </div>
        )}

        <h2 className="text-2xl mb-4">Dashboard</h2>

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="add" onClick={handleAddTask} />
        </div>

        {editingTaskId && (
          <div className="mb-6 flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Edit your task"
              className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <Button type="edit" onClick={handleEditSubmit} />
          </div>
        )}

        <Tasklist
          tasks={tasks}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
          onEdit={(id) => {
            const task = tasks.find((t) => t._id === id);
            startEditing(id, task?.title || '');
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
