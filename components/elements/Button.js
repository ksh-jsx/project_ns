import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";

const propTypes = {
  tag: PropTypes.elementType,
  color: PropTypes.string,
  size: PropTypes.string,
  loading: PropTypes.bool,
  wide: PropTypes.bool,
  wideMobile: PropTypes.bool,
  disabled: PropTypes.bool
};

const defaultProps = {
  tag: "button",
  color: "",
  size: "",
  loading: false,
  wide: false,
  wideMobile: false,
  disabled: false
};

const Button = ({
  className,
  tag,
  color,
  size,
  loading,
  wide,
  wideMobile,
  disabled,
  ...props
}) => {
  const classes = classNames(
    "button",
    size && `button-${size}`,
    loading && "is-loading",
    wide && "button-block",
    wideMobile && "button-wide-mobile",
    className
  );

  const Component = tag;
  return (
    <Component
      {...props}
      className={classes}
      disabled={disabled}
      style={{
        background: "none",
        border: "2px solid #ffffff",
        color: "#ffffff"
      }}
    />
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
