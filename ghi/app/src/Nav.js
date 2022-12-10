import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">VroomVroom</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/manufacturers/">List of Manufacturers</NavLink>
                <NavLink className="dropdown-item" to="/manufacturers/new/">Create a Manufacturer</NavLink>
                <NavLink className="dropdown-item" to="/models/">List of Vehicle Models</NavLink>
                <NavLink className="dropdown-item" to="/models/new/">Create a Vehicle Model</NavLink>
                <NavLink className="dropdown-item" to="/automobiles/">List of Automobiles</NavLink>
                <NavLink className="dropdown-item" to="/automobiles/new/">Create an Automobile</NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/technicians/new/">Enter a Technician</NavLink>
                <NavLink className="dropdown-item" to="/appointments/new/">Create a Service Appointment</NavLink>
                <NavLink className="dropdown-item" to="/appointments/">List of Appointments</NavLink>
                <NavLink className="dropdown-item" to="/history">Service History</NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/salespersons/">Sales History</NavLink>
                <NavLink className="dropdown-item" to="/salespersons/new/">Add a Salesperson</NavLink>
                <NavLink className="dropdown-item" to="/customers/new/">Add a Customer</NavLink>
                <NavLink className="dropdown-item" to="/saleshistory/">All Sales</NavLink>
                <NavLink className="dropdown-item" to="/saleshistory/new/">Record a New Sale</NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
