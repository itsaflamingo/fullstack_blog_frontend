import React from "react";
import { useState } from "react";
import Socials from "../Socials";

export default function Portal() {
  const [showSocials, setShowSocials] = useState(false);

  return (
    <div className="portal-socials-sticky">
      <div
        className="portal-wrapper"
        onClick={() => setShowSocials(!showSocials)}
      >
        <div className="portal"></div>
        <div className="portal"></div>
        <div className="portal"></div>
        <div className="portal"></div>
        <div className="portal"></div>
      </div>
      {showSocials && <Socials />}
    </div>
  );
}
