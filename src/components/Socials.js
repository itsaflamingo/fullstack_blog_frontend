import React from "react";

const socials = [
  {
    src: "https://www.linkedin.com/in/elizabeth-pinero-984471177/",
    alt: "linkedin",
    i: "devicon-linkedin-plain icon",
  },
  {
    src: "https://github.com/itsaflamingo",
    alt: "github",
    i: "devicon-github-original icon",
  },
  {
    src: "https://twitter.com/lizpinero_",
    alt: "twitter",
    i: "devicon-twitter-original icon",
  },
  {
    src: "https://codepen.io/Elizabeth-Pinero",
    alt: "codepen",
    i: "devicon-codepen-original icon",
  },
];

export default function Socials() {
  const numSocials = socials.length;
  const has_mid = 0;
  const m = numSocials - has_mid;
  return (
    <div className="socials-container" style={{ "--m": m }}>
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.src}
          target="_blank"
          rel="noreferrer"
          className="socials"
          alt={social.alt}
          style={index - has_mid >= 0 ? { "--i": index } : null}
        >
          <i className={social.i}></i>
        </a>
      ))}
    </div>
  );
}
