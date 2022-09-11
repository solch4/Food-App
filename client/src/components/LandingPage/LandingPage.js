import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage() {
  const navigate = useNavigate();
  const goHome = () => navigate("/home");

  return (
    <div>
      landing page
      <button onClick={goHome}>go home</button>
    </div>
  );
}

export default LandingPage;
