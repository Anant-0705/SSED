import { Link } from "react-router-dom";

const TaskCard = ({
  task,
  onDelete,
  onStatusChange
}) => {

  const priorityClass = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700"
  };

  const statusClass = {
    pending: "bg-gray-100 text-gray-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700"
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <div className="mb-3 flex items-start justify-between">

        <h3 className="text-lg font-bold">
          {task.title}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            priorityClass[task.priority]
          }`}
        >
          {task.priority}
        </span>

      </div>

      <p className="mb-4 text-gray-600">
        {task.description}
      </p>

      <div className="mb-4">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusClass[task.status]
          }`}
        >
          {task.status}
        </span>

      </div>

      {task.dueDate && (
        <p className="mb-4 text-sm text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className="flex flex-wrap gap-2">

        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task._id, e.target.value)
          }
          className="rounded border px-2 py-1 text-sm"
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

        <Link
          to={`/tasks/edit/${task._id}`}
          className="rounded bg-blue-600 px-3 py-2 text-sm text-white"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(task._id)}
          className="rounded bg-red-600 px-3 py-2 text-sm text-white"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default TaskCard;