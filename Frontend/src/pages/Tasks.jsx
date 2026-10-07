import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";

import taskService from "../services/taskService";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);

      const data = await taskService.getTasks();

      setTasks(data.tasks || []);
      setError("");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await taskService.deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id)
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const data = await taskService.updateTaskStatus(
        id,
        status
      );

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === id ? data.task : task
        )
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update task status"
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Tasks
              </h1>

              <p className="mt-1 text-gray-600">
                Manage all your tasks
              </p>
            </div>

            <Link
              to="/tasks/create"
              className="rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white hover:bg-blue-700"
            >
              + Create Task
            </Link>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* No tasks */}
          {tasks.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow">
              <h2 className="text-xl font-semibold text-gray-800">
                No Tasks Found
              </h2>

              <p className="mt-2 text-gray-500">
                Create your first task to get started.
              </p>

              <Link
                to="/tasks/create"
                className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white"
              >
                Create Task
              </Link>
            </div>
          ) : (
            /* Tasks */
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="rounded-xl bg-white p-6 shadow"
                >
                  {/* Title */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {task.title}
                      </h2>

                      <p className="mt-2 text-gray-600">
                        {task.description}
                      </p>
                    </div>

                    {/* Priority */}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="mt-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Status
                    </label>

                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(
                          task._id,
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="in-progress">
                        In Progress
                      </option>

                      <option value="completed">
                        Completed
                      </option>
                    </select>
                  </div>

                  {/* Due Date */}
                  {task.dueDate && (
                    <p className="mt-4 text-sm text-gray-500">
                      Due Date:{" "}
                      {new Date(
                        task.dueDate
                      ).toLocaleDateString()}
                    </p>
                  )}

                  {/* Buttons */}
                  <div className="mt-6 flex gap-3">
                    <Link
                      to={`/tasks/edit/${task._id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(task._id)
                      }
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Tasks;