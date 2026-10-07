// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import Loading from "../components/Loading";

// import taskService from "../services/taskService";
// import { useAuth } from "../context/AuthContext";

// const Dashboard = () => {
//   const { user } = useAuth();

//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const loadTasks = async () => {
//     try {
//       setLoading(true);

//       const data = await taskService.getTasks();

//       setTasks(data.tasks || []);
//       setError("");
//     } catch (error) {
//       console.error(error);

//       setError(
//         error.response?.data?.message ||
//           "Failed to load tasks"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const totalTasks = tasks.length;

//   const completedTasks = tasks.filter(
//     (task) => task.status === "completed"
//   ).length;

//   const pendingTasks = tasks.filter(
//     (task) => task.status === "pending"
//   ).length;

//   const inProgressTasks = tasks.filter(
//     (task) => task.status === "in-progress"
//   ).length;

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />

//       <div className="flex">
//         <Sidebar />

//         <main className="flex-1 p-6">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-800">
//               Dashboard
//             </h1>

//             <p className="mt-1 text-gray-600">
//               Welcome back, {user?.name}
//             </p>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
//               {error}
//             </div>
//           )}

//           {/* Statistics */}
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//             {/* Total */}
//             <div className="rounded-xl bg-white p-6 shadow">
//               <p className="text-sm text-gray-500">
//                 Total Tasks
//               </p>

//               <h2 className="mt-2 text-3xl font-bold text-gray-800">
//                 {totalTasks}
//               </h2>
//             </div>

//             {/* Pending */}
//             <div className="rounded-xl bg-white p-6 shadow">
//               <p className="text-sm text-gray-500">
//                 Pending
//               </p>

//               <h2 className="mt-2 text-3xl font-bold text-yellow-600">
//                 {pendingTasks}
//               </h2>
//             </div>

//             {/* In Progress */}
//             <div className="rounded-xl bg-white p-6 shadow">
//               <p className="text-sm text-gray-500">
//                 In Progress
//               </p>

//               <h2 className="mt-2 text-3xl font-bold text-blue-600">
//                 {inProgressTasks}
//               </h2>
//             </div>

//             {/* Completed */}
//             <div className="rounded-xl bg-white p-6 shadow">
//               <p className="text-sm text-gray-500">
//                 Completed
//               </p>

//               <h2 className="mt-2 text-3xl font-bold text-green-600">
//                 {completedTasks}
//               </h2>
//             </div>
//           </div>

//           {/* Recent Tasks */}
//           <div className="mt-8 rounded-xl bg-white p-6 shadow">
//             <div className="mb-5 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-800">
//                 Recent Tasks
//               </h2>

//               <Link
//                 to="/tasks"
//                 className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//               >
//                 View All
//               </Link>
//             </div>

//             {tasks.length === 0 ? (
//               <div className="py-10 text-center">
//                 <p className="text-gray-500">
//                   No tasks available.
//                 </p>

//                 <Link
//                   to="/tasks/create"
//                   className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white"
//                 >
//                   Create Your First Task
//                 </Link>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {tasks.slice(0, 5).map((task) => (
//                   <div
//                     key={task._id}
//                     className="flex flex-col justify-between gap-3 rounded-lg border p-4 md:flex-row md:items-center"
//                   >
//                     <div>
//                       <h3 className="font-semibold text-gray-800">
//                         {task.title}
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         {task.description}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-medium ${
//                           task.status === "completed"
//                             ? "bg-green-100 text-green-700"
//                             : task.status === "in-progress"
//                             ? "bg-blue-100 text-blue-700"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                       >
//                         {task.status}
//                       </span>

//                       <Link
//                         to={`/tasks/edit/${task._id}`}
//                         className="text-sm font-medium text-blue-600 hover:underline"
//                       >
//                         Edit
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";

import taskService from "../services/taskService";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

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

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  if (loading) {
    return <Loading />;
  }

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: "▦",
      bg: "bg-blue-50",
      text: "text-blue-600"
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: "◷",
      bg: "bg-amber-50",
      text: "text-amber-600"
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: "↻",
      bg: "bg-violet-50",
      text: "text-violet-600"
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: "✓",
      bg: "bg-emerald-50",
      text: "text-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="min-w-0 flex-1 p-4 md:p-8">

          {/* Welcome */}
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

            <div>
              <p className="mb-2 text-sm font-medium text-blue-600">
                Welcome back 👋
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Hello, {user?.name}
              </h1>

              <p className="mt-2 text-slate-500">
                Here's what's happening with your tasks today.
              </p>
            </div>

            <Link
              to="/tasks/create"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              + Create Task
            </Link>

          </div>


          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}


          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold ${stat.bg} ${stat.text}`}
                  >
                    {stat.icon}
                  </div>

                </div>
              </div>
            ))}

          </div>


          {/* Recent Tasks */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 p-5 md:p-6">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Tasks
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest activity
                </p>
              </div>

              <Link
                to="/tasks"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all →
              </Link>

            </div>


            {tasks.length === 0 ? (

              <div className="p-12 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                  ✓
                </div>

                <h3 className="mt-4 font-semibold text-slate-800">
                  No tasks yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Create your first task and start being productive.
                </p>

                <Link
                  to="/tasks/create"
                  className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Create Task
                </Link>

              </div>

            ) : (

              <div className="divide-y divide-slate-100">

                {tasks.slice(0, 5).map((task) => (

                  <div
                    key={task._id}
                    className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
                  >

                    <div className="flex min-w-0 items-start gap-4">

                      <div
                        className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          task.status === "completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : task.status === "in-progress"
                            ? "bg-violet-50 text-violet-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {task.status === "completed"
                          ? "✓"
                          : task.status === "in-progress"
                          ? "↻"
                          : "◷"}
                      </div>

                      <div className="min-w-0">

                        <h3 className="truncate font-semibold text-slate-800">
                          {task.title}
                        </h3>

                        <p className="mt-1 truncate text-sm text-slate-500">
                          {task.description}
                        </p>

                      </div>

                    </div>


                    <div className="flex items-center gap-3">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          task.priority === "high"
                            ? "bg-red-50 text-red-600"
                            : task.priority === "medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {task.priority}
                      </span>

                      <Link
                        to={`/tasks/edit/${task._id}`}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      >
                        Edit
                      </Link>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </main>

      </div>

    </div>
  );
};

export default Dashboard;

