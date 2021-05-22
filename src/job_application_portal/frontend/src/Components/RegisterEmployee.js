import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";

const RegisterEmployee = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    Role: "Employee",
    Name: "",
    HighestDegree: "",
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    console.log("i am called");
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      email: "",
      password: "",
      Role: "Employee",
      Name: "",
      HighestDegree: "",
    });
  };

  const onSubmit = (e) => {
    console.log("i am clicked");
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };
  return (
    <div>
      <h1>Employee</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            onChange={onChange}
            id="email"
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            id="password"
            name="password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            id="name"
            name="Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="HighestDegree">HighestDegree:</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            id="HighestDegree"
            name="HighestDegree"
          />
        </div>

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Submit
        </button>
      </form>

      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default RegisterEmployee;
