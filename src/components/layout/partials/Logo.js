import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

const Logo = ({ className, ...props }) => {
  const classes = classNames("brand", className);

  return (
    <div {...props} className={classes}>
      <h1 className="m-0">
        <Link to="/">
          <img
            src={require("../../../img/logo.png")}
            alt="Open"
            style={{
              width: 150 + "px",
              height: 25 + "px"
            }}
          />
        </Link>
      </h1>
    </div>
  );
};

export default Logo;
