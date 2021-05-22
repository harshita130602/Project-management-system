import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";

const RegisterManager = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    Role: "Manager",
    Name: "",
    WorkExperience: "",
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      email: "",
      password: "",
      Role: "",
      Name: "",
      WorkExperience: "",
    });
  };

  const onSubmit = (e) => {
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
      <h1>Manager</h1>
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
          <label htmlFor="WE">WorkExperience:</label>
          <input
            type="number"
            className="form-control"
            onChange={onChange}
            id="WE"
            name="WorkExperience"
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

export default RegisterManager;
