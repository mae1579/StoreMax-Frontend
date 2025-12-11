import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="w-full">
      {user.email ? (
        <div>
          <h1>Witaj</h1>
          <h2>Twój email {user.email}</h2>
          <h3>Twoje hasło {user.password}</h3>
        </div>
      ) : (<div>brak danych</div>)}
    </div>
  );
};

export default Home;
