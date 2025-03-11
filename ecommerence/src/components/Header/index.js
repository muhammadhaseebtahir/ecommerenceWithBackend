import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { Dropdown } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { useAuthContext } from "../../context/AuthContext";


// const onClick = ({ key }) => {
//   message.info(`Clicked on item ${key}`);
// };

const items = [
  { label: <span className="dropItems">Womens</span>, key: "1" },
  { label: <span className="dropItems">Mens</span>, key: "2" },
  { label: <span className="dropItems">Others</span>, key: "3" },
];



export default function Header() {
  const {isAuthenticated,handleLogout,isAdmin,user}=useAuthContext()
  const [isOpen, setIsOpen] = useState(false);
  const [triggerType, setTriggerType] = useState(["hover"]);
  const nameUser = user?.userName ? user.userName.slice(0, 2).toUpperCase() : "";



  const profileItems = [
    { label: <span className="dropItems">Profile</span>, key: "1" },
    { label: <span className="dropItems">Settings</span>, key: "2" },
    { label: <span className="dropItems" onClick={handleLogout} >Logout</span>, key: "3" },
    { label: <span className="dropItems" >{isAdmin? "Admin" :""}</span>, key: "4" },
  ];

  // Check screen size and update trigger type
  useEffect(() => {
    const updateTriggerType = () => {
      if (window.innerWidth < 992) {
        setTriggerType(["click"]);
      } else {
        setTriggerType(["hover"]);
      }
    };

    updateTriggerType();
    window.addEventListener("resize", updateTriggerType);
    return () => window.removeEventListener("resize", updateTriggerType);
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        position: "sticky",
        top: "0",
        zIndex: "1000",
        background: "#fff",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold fs-4" >
          Shopping<span style={{ color: "#fb8500" }}>.com</span>
        </Link>

        {/* Navbar Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            boxShadow: "none",
            padding: "5px",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              display: "inline-block",
            }}
          >
            {isOpen ? <CloseOutlined /> : <span className="navbar-toggler-icon"></span>}
          </span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link active" aria-current="page" >
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Dropdown menu={{ items }} placement="bottom" trigger={triggerType}>
                <div className="nav-link dropdown-toggle" style={{ cursor: "pointer" }}>
                  Collection
                </div>
              </Dropdown>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link active" aria-current="page" >
                Contact
              </Link>
            </li>
          </ul>
          <div className="right-side d-flex align-items-center">
           {
              isAuthenticated ? (
                <Dropdown menu={{ items: profileItems }} placement="bottomLeft" trigger={triggerType}>
                  <div className="nav-link dropdown-toggle" style={{ cursor: "pointer" }}>
                  
                    <span style={{backgroundColor:"#fb8500",color:"white",borderRadius:"50%",padding:"8px",fontSize:'18px'}} >

                    {nameUser}
                    </span>
                  
                  </div>
                </Dropdown>
              ) : (
                <Link to="/auth/login" className="btn btn-dark px-4 shadow" >
                  Login
                </Link>)
           }
          </div>
        </div>
      </div>
    </nav>
  );
}
