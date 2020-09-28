import React from "react";
import Login from "../modules/Author/Login";

const LoginPage = () => {
  return (
    <div
    className="page"
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        background: "linear-gradient(-135deg, #c850c0, #4158d0)",
      }}
    >
      <Login />
    </div>
  );
};

export default LoginPage;
