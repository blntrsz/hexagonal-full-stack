import { Outlet, Link } from "react-router-dom";

export function Layout() {
  const container = "px-4 py-8 max-w-3xl m-auto w-full"
  return <div className="min-h-screen flex flex-col">
    <Link to="/">
      <header className="bg-blue-400 min-h-12 font-bold text-white flex justify-center items-center">ToDo Application</header>
    </Link>
    <main className={container + " flex-1"}>
      <Outlet />
    </main>
    <footer className={container}>
      <Link to="/users">Manage Users</Link>
    </footer>
  </div>
}
