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
                Manufacturers
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/manufacturers/">List of Manufacturers</NavLink>
                <NavLink className="dropdown-item" to="/manufacturers/new/">Create a Manufacturer</NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Automobiles
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/automobiles/">List of Automobiles</NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Salespersons
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/salespersons/">Sales History</NavLink>
                <NavLink className="dropdown-item" to="/salespersons/new/">Add a Salesperson</NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Customers
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/customers/new/">Add a Customer</NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales Records
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/saleshistory/">All Sales</NavLink>
                <NavLink className="dropdown-item" to="/saleshistory/new/">Record a New Sale</NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
