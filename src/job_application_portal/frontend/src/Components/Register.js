import React, { useState } from "react";
import RegisterEmployee from "./RegisterEmployee";
import RegisterManager from "./RegisterManager";
import RegisterHod from "./RegisterHod";

const Register = (props) => {
  const [role, setRole] = useState(null);

  const onClickEmployee = () => {
    setRole("Employee");
  };

  const onClickManager = () => {
    setRole("Manager");
  };

  const onClickHod = () => {
    setRole("Hod");
  };

  const display = () => {
    if (role) {
      if (role === "Employee")
        return <RegisterEmployee history={props.history} />;
      else if (role === "Manager")
        return <RegisterManager history={props.history} />;
      else if (role === "Hod") return <RegisterHod history={props.history} />;
    }
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Select Role
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" onClick={onClickEmployee}>
          Employee
        </a>
        <a className="dropdown-item" onClick={onClickManager}>
          Manager
        </a>
        <a className="dropdown-item" onClick={onClickHod}>
          Hod
        </a>
      </div>
      {display()}
    </div>
  );
};

export default Register;
