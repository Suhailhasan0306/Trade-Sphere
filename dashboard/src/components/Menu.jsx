import { useState } from "react";
import { Link } from "react-router-dom";

// initials function
function getInitials(name) {
  if (!name) return "U";

  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();

  return (words[0][0] + words[1][0]).toUpperCase();
}

function Menu() {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropDown, setIsProfileDropDown] = useState(false);

  // dynamic user
  const userName = localStorage.getItem("user") || "Guest User";

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handelProfileClick = () => {
    setIsProfileDropDown(!isProfileDropDown);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid d-flex align-items-center justify-content-between position-relative">
        <img
          src="/logo.png"
          alt="Logo"
          className="img-fluid"
          style={{ width: "50px" }}
        />
        <button
          className="navbar-toggler hamburger"
          type="button"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className={`nav-link ${selectedMenu === 0 ? "active-menu" : ""}`}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${selectedMenu === 1 ? "active-menu" : ""}`}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              Orders
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${selectedMenu === 2 ? "active-menu" : ""}`}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              Holdings
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${selectedMenu === 3 ? "active-menu" : ""}`}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              Positions
            </Link>
          </li>       <li className="nav-item">
            <Link
              className={`nav-link ${selectedMenu === 4 ? "active-menu" : ""}`}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              Funds
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${selectedMenu === 5 ? "active-menu" : ""}`}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              Apps
            </Link>
          </li>    
        </ul>
        <div
  className="border-start pe-3 ps-3 d-flex align-items-center mt-1 ms-4"
  style={{ color: "#424242", cursor: "pointer" }}
>
  <div
    style={{
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      background: "#eee",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      marginRight: "8px"
    }}
  >
    UI
  </div>

  <p className="mb-0 fw-bold">USERID</p>
</div>
      </div>
    </nav>
  );
}

export default Menu;