import React from "react";
import NBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";

function Login() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Login">
      <header>
        <NBar />
      </header>
    </div>
  );
}

export default Login;