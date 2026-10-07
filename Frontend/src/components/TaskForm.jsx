import { useEffect, useState } from "react";

const TaskForm = ({
  initialData,
  onSubmit,
  buttonText = "Create Task"
}) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    dueDate: ""
  });

  useEffect(() => {

    if (initialData) {

      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "medium",
        status: initialData.status || "pending",
        dueDate: initialData.dueDate
          ? initialData.dueDate.substring(0, 10)
          : ""
      });

    }

  }, [initialData]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(formData);

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl bg-white p-6 shadow"
    >

      <div>

        <label className="mb-2 block font-semibold">
          Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded border px-4 py-2"
          placeholder="Enter task title"
        />

      </div>

      <div>

        <label className="mb-2 block font-semibold">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="5"
          className="w-full rounded border px-4 py-2"
          placeholder="Enter task description"
        />

      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <div>

          <label className="mb-2 block font-semibold">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded border px-4 py-2"
          >
            <option value="low">
              Low
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="high">
              High
            </option>

          </select>

        </div>

        <div>

          <label className="mb-2 block font-semibold">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded border px-4 py-2"
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

        <div>

          <label className="mb-2 block font-semibold">
            Due Date
          </label>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full rounded border px-4 py-2"
          />

        </div>

      </div>

      <button
        type="submit"
        className="rounded bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
      >
        {buttonText}
      </button>

    </form>
  );
};

export default TaskForm;