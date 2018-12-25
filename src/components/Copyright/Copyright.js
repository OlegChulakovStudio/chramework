import React from "react";
import Link from "../Link/Link";
import "./Copyright.styl";

const Copyright = props => (
  <div className="Copyright">
    <div className="Copyright__wrapper">
      <span className="Copyright__symbol">&copy;</span>&nbsp;
      {props.text || "Студия Олега Чулакова"}
    </div>
    {props.docs && (
      <div className="Copyright__docs">
        <Link
          className="Copyright__docs-link"
          href={props.docs.link}
          disableBlank
        >
          {props.docs.text}
        </Link>
      </div>
    )}
  </div>
);

export default Copyright;
