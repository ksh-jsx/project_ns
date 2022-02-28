import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Logo from "./partials/Logo";
import Divider from "@material-ui/core/Divider";

const propTypes = {
  topOuterDivider: PropTypes.bool,
  topDivider: PropTypes.bool
};

const defaultProps = {
  topOuterDivider: false,
  topDivider: false
};

const Footer = ({ className, topOuterDivider, topDivider, ...props }) => {
  const classes = classNames(
    "site-footer",
    topOuterDivider && "has-top-divider",
    className
  );

  return (
    <footer {...props} className={classes}>
      <Divider />
      <div className="container">
        <div
          className={classNames(
            "site-footer-inner",
            topDivider && "has-top-divider"
          )}
        >
          <div className="footer-top space-between text-xxs">
            <Logo />
          </div>
          <div className="footer-bottom space-between text-xxs invert-order-desktop">
            <div className="footer-copyright">
              엔에스웍스(주)
              <br />
              주소 : (30127) 세종특별시 한누리대로 249, 609호
              <br />
              대표전화 : 070-4232-2240
              <br />
              개인정보책임자 | contact@nsworks.co.kr
              <br />
              [개인정보처리방침]
              <br />
              Copyright © NSworks. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
