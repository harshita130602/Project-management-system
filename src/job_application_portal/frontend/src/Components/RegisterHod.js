import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";

const RegisterHod = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    Role: "Hod",
    Name: "",
    Deparment: "",
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
      Deparment: "",
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
      <h1>Hod</h1>
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
          <label htmlFor="dept">Deparment: </label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            id="dept"
            name="Department"
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

export default RegisterHod;
