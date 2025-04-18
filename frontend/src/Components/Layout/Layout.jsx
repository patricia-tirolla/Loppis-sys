import { NavLink, Outlet } from "react-router-dom";
import './Layout.css';

const Layout = () => {

  return (
    <div className="layout">
      <header className="app-header">
        <h1 className="app-logo">Loppis-sys</h1>
      </header>
      <aside className="sidebar">
        <nav>
          <NavLink
            to="/sellers"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >Sellers</NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >Products
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >Orders
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Reports
          </NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;