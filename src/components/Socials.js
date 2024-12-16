import React from "react";

export default function Socials() {
  return (
    <div>
      <a
        className="github-link"
        href="https://github.com/itsaflamingo"
        target="_blank"
        rel="noreferrer"
      >
        <img className="github" src={githubIcon} alt="github-link" />
        <p className="github-name">itsaflamingo</p>
      </a>
    </div>
  );
}
