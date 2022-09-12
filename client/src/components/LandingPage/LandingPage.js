import React from "react";
import { useNavigate } from "react-router-dom";
import { landingPage, goHomeBtn } from "./LandingPage.module.css";

function LandingPage() {
  const navigate = useNavigate();
  const goHome = () => navigate("/home");

  return (
    <div className={landingPage}>
      <button className={goHomeBtn} onClick={goHome}>home</button>
    </div>
  );
}

export default LandingPage;
