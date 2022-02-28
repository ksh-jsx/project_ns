import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MuiListItem from "@material-ui/core/ListItem";
import MuiListItemText from "@material-ui/core/ListItemText";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import InfoContext from "./../../InfoContext";
import MuiTypography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { green } from "@material-ui/core/colors";
import SvgIcon from "@material-ui/core/SvgIcon";
import $ from "jquery";
window.$ = $;

const data = [
  {
    text: "회사소개",
    href: "/",
    sub: [
      {
        text: "",
        href: "/"
      }
    ]
  },
  {
    text: "가상화인프라",
    href: "/vm/server",
    sub: [
      {
        text: "서버가상화",
        href: "/vm/server"
      },
      {
        text: "데스크톱가상화",
        href: "/vm/desktop"
      },
      {
        text: "스토리지가상화",
        href: "/vm/storage"
      },
      {
        text: "재해복구시스템",
        href: "/vm/dr"
      }
    ]
  },
  {
    text: "하드웨어인프라",
    href: "/hw/server",
    sub: [
      {
        text: "서버",
        href: "/hw/server"
      },
      {
        text: "스토리지",
        href: "/hw/storage"
      },
      {
        text: "네트워크",
        href: "/hw/network"
      },
      {
        text: "보안",
        href: "/hw/security"
      }
    ]
  },
  {
    text: "기술문의",
    href: "/mt/maintenance",
    sub: [
      {
        text: "엔지니어현황",
        href: "/mt/engineer"
      },
      {
        text: "유지보수",
        href: "/mt/maintenance"
      },
      {
        text: "기술지원문의",
        href: "/mt/question"
      },
      {
        text: "자료실",
        href: "/mt/reference"
      },
      {
        text: "원격지원",
        href: "/remote"
      }
    ]
  },
  {
    text: "원격지원",
    href: "/remote",
    sub: [
      {
        text: "원격지원",
        href: "/remote"
      }
    ]
  }
];

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "10px 0px 30px",
    padding: "0px 0px 0px 30px",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  btn: {
    background: "#ffffff",
    border: "none",
    borderBottom: "1px solid rgba(0, 0, 0, .075)",
    width: "61px",
    height: "61px",
    cursor: "pointer"
  }
}));

const Accordion = withStyles({
  root: {
    // border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: "none",
    "&:before": {
      display: "none"
    }
  },
  expanded: {
    marginTop: "0px !important"
  }
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    width: "230px",
    // marginBottom: -14,
    minHeight: 36,
    borderBottom: "1px solid rgba(0, 0, 0, .075)",
    "&$expanded": {
      minHeight: 36
    }
  },
  content: {
    margin: "15px 0 0",
    "&$expanded": {
      margin: "15px 0 0"
    }
  },
  expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    border: "1px solid rgba(0, 0, 0, .075)",
    zIndex: "9999",
    padding: "0 8px"
  }
}))(MuiAccordionDetails);

const Typography = withStyles((theme) => ({
  root: {
    width: "95%",
    paddingBottom: 15,
    fontFamily: "NanumSquare",
    fontSize: "17px"
  }
}))(MuiTypography);

const BigTypography = withStyles((theme) => ({
  root: {
    width: "95%",
    paddingBottom: 15,
    fontFamily: "NanumSquare"
  }
}))(MuiTypography);

const ListItem = withStyles((theme) => ({
  root: {
    zIndex: "9999",
    padding: "0"
  }
}))(MuiListItem);

const ListItemText = withStyles((theme) => ({
  root: {
    color: "#000000",
    fontFamily: "NanumSquare",
    borderBottom: "1px solid rgba(0, 0, 0, .075)",
    margin: "15px 0 0",
    fontSize: "17px !important"
  }
}))(MuiListItemText);

const NavBar = ({ menu1, menu2 }) => {
  const [expanded, setExpanded] = React.useState("");

  const onChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const classes = useStyles();

  const scrollPosition = useContext(InfoContext);

  const onClickInfo = (pos) => () => {
    scrollPosition.setPosition(pos);
  };

  return (
    <>
      <div className={classes.container}>
        <Link to="/" onClick={onClickInfo("header0")}>
          <Button className={classes.btn}>
            <HomeIcon style={{ color: green[500] }} />
          </Button>
        </Link>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={onChange("panel1")}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <BigTypography>{menu1}</BigTypography>
          </AccordionSummary>
          <AccordionDetails id="details">
            {data.map((first) => (
              <div key={first.text}>
                <Link to={first.href}>
                  <ListItem button key={first.text} onClick={undefined}>
                    <ListItemText
                      primary={
                        <Typography>&nbsp;&nbsp;{first.text}</Typography>
                      }
                    />
                  </ListItem>
                </Link>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel2"}
          onChange={onChange("panel2")}
        >
          <AccordionSummary
            aria-controls="panel2a-content"
            id="panel2a-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <BigTypography>{menu2}</BigTypography>
          </AccordionSummary>
          <AccordionDetails id="details">
            {data
              .filter((first) => first.text === menu1)[0]
              .sub.map((second) => (
                <div key={second.text}>
                  <Link to={second.href}>
                    <ListItem button key={second.text} onClick={undefined}>
                      <ListItemText
                        primary={
                          <Typography>&nbsp;&nbsp;{second.text}</Typography>
                        }
                      />
                    </ListItem>
                  </Link>
                </div>
              ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default NavBar;
