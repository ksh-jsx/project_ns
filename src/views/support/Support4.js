import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import TopImage from "../../components/sections/TopImage";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import CircularProgress from "@material-ui/core/CircularProgress";
import View from "./Support4V";
import "../../css/support.css";

const img_data = {
  image: "banner1_1.jpg",
  title: "자료실",
  menu1: "기술문의",
  menu2: "자료실"
};

function sleep(ms) {
  //sleep 함수
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const styles = (theme) => ({
  img: {
    width: 100
  },
  menu: {
    marginTop: 0,
    marginBottom: 15,
    marginRight: "2.5%",
    display: "flex",
    justifyContent: "flex-end"
  },
  paper: {
    width: "100%",
    float: "right",
    overflow: "auto",
    "& > table": {
      minWidth: "100%"
    },
    marginBottom: "50px",
    border:'1px solid rgba(224, 224, 224, 1)'
  },
  table: {
    minWidth: 1080
  },
  tableRow: {
    height: 150,
    cursor: "pointer"
  },
  progress: {
    margin: 20
  },
  tableHead: {
    fontSize: "22px",
    textAlign: "center",
    paddingLeft:"16px !important",
    paddingRight:"16px !important",
    borderTop:"1px solid rgba(224, 224, 224, 1)",
    background:"#E6E6E6"
  },
  tableBody:{
    minHeight:500
  },
  tableBody1: {
    textAlign: "center",
    fontSize: "20px",
    width: "10%",
    padding: 16,
    minWidth: 100,
    paddingLeft:"16px !important",
  },
  tableBody2: {
    textAlign: "center",
    fontSize: "20px",
    paddingRight:"16px !important",
  }
});

class Boards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: "",
      completed: 0
    };
    this.stateRefresh = this.stateRefresh.bind(this);
  }

  stateRefresh() {
    this.setState({
      boards: "",
      completed: 0
    });

    this.callApi()
      .then((res) => this.setState({ boards: res }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => this.setState({ boards: res }))
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  callApi = async () => {
    await sleep(500);
    const response = await fetch("/api/board");
    const body = await response.json();

    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    const cellList2 = ["번호", "제목"];
    const filteredComponents = (data) => {
      
      return data.map((c, i) => {
        return (
          <BoardList
            tableRow={classes.tableRow}
            tableBody1={classes.tableBody1}
            tableBody2={classes.tableBody2}
            key={c.id}
            id={c.id}
            c={c}
            i={i}
          />
        );
      });
      
    };
    return (
      <div>
        <Header/>
        <TopImage data={img_data} />
        <div className="maintenance_container" style={{marginTop:'50px'}}>
          <div className={classes.paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {cellList2.map((c) => {
                    return (
                      <TableCell className={classes.tableHead} key={c}>
                        {c}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {this.state.boards ? (
                  this.state.boards.length ===0 ? (
                    <TableRow>
                    <TableCell colSpan="6" align="center">
                      <div >게시글이 없습니다.</div>
                    </TableCell>
                  </TableRow>
                  ) : 
                  filteredComponents(this.state.boards)
                ) : (
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      <CircularProgress
                        className={classes.progress}
                        variant="determinate"
                        value={this.state.completed}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

class BoardList extends React.Component {
  render() {
    return (
      <TableRow className={this.props.tableRow} id="row">
        <TableCell className={this.props.tableBody1}>{this.props.i}</TableCell>
        <TableCell className={this.props.tableBody2}>
          <View c={this.props.c} />
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(Boards);
