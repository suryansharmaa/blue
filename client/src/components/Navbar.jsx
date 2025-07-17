import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>
        Home
      </Link>
      <Link to="/login" style={{ marginRight: "1rem" }}>
        Login
      </Link>
      <Link to="/register" style={{ marginRight: "1rem" }}>
        Register
      </Link>
    </nav>
  );
}
