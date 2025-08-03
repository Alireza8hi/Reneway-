import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import http from "../services/httpService";
import config from "../config.json";
import { toast } from "react-toastify";

const NavBar = () => {
  // const {user} = this.props;

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = async () => {
    try {
      const response = await http.post(`${config.apiUrl}/api/logout`);
      if (response.status === 200) {
        toast.success("با موفقیت خارج شدید");
      }
    } catch (error) {
      console.log(error);
      toast.error("خطا در خروج");
    }
  };

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand"></span>
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/login">
              ورود
            </NavLink>
            <NavLink className="nav-link" to="/register">
              ثبت نام
            </NavLink>
            <NavLink className="nav-link" to="/me">
              پروفایل
            </NavLink>
          </div>
        </div>
      </div>
      <button className="btn btn-danger ms-2" onClick={handleLogout}>
        خروج
      </button>
    </nav>
  );
};

export default NavBar;
