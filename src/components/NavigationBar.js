import React from 'react';
import {Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import CreateIcon from '@material-ui/icons/Create';
import MenuIcon from '@material-ui/icons/Menu';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BusinessIcon from '@material-ui/icons/Business';
import MessageIcon from '@material-ui/icons/Message';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import $ from 'jquery';
window.$ = $;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex:9999
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `100%`,
      marginLeft: drawerWidth,
      zIndex:9999
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon_wrap1: {
    position:"absolute",
    right:30,
    top:5,
    width:50
  },
  icon_wrap2: {
    position:"absolute",
    right:20,
    width:90,
    color:'#ffffff',
    textDecoration:'none',
	top:10
  },
  txt_deco_none:{
    color:'#000000',
    textDecoration:'none'
  },
  txt_deco_none2:{
    color:'#ffffff',
    textDecoration:'none'
  },
  clicked_item:{    
    textDecoration:'none',
    backgroundColor:'#D8D8D8',
    color:'#000000'
  },
  unclicked_item:{    
    textDecoration:'none',
    backgroundColor:'#ffffff',
    color:'#000000'
  }
}));

function NavigationBar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  //console.log(props.current_link)
  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    fetch('/api/logout'); 
  };
  const drawer = (
		<div id="admin_container">
		  <div className={classes.toolbar} />
		  <Divider />
			<List>
			  <Link to="/admin" className={classes.txt_deco_none}>
				<ListItem button key='직원 관리' className={props.current_link === '/admin' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <PeopleIcon />
					</ListItemIcon>
				  <ListItemText primary='직원 관리' />
				</ListItem>
			  </Link>
			  <Link to="/admin/customer" className={classes.txt_deco_none}>
				<ListItem button key='고객사 관리' className={props.current_link === '/admin/customer' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <BusinessIcon />
					</ListItemIcon>
				  <ListItemText primary='고객사 관리' />
				</ListItem>
			  </Link>
			  <Link to="/manager" className={classes.txt_deco_none}>
				<ListItem button key='담당자 관리' className={props.current_link === '/manager' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <AssignmentIndIcon />
					</ListItemIcon>
				  <ListItemText primary='담당자 관리' />
				</ListItem>
			  </Link>
			  <Link to="/popUp" className={classes.txt_deco_none}>
				<ListItem button key='팝업창 관리' className={props.current_link === '/popUp' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <AssignmentIcon />
					</ListItemIcon>
				  <ListItemText primary='팝업창 관리' />
				</ListItem>
			  </Link>
			  <Link to="/board" className={classes.txt_deco_none}>
				<ListItem button key='게시판 관리' className={props.current_link === '/board' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <CreateIcon />
					</ListItemIcon>
				  <ListItemText primary='게시판 관리' />
				</ListItem>
			  </Link>
			  <Link to="/survey" className={classes.txt_deco_none}>
				<ListItem button key='설문 관리' className={props.current_link === '/survey' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <MessageIcon />
					</ListItemIcon>
				  <ListItemText primary='설문 관리' />
				</ListItem>
			  </Link>
			  <Link to="/question" className={classes.txt_deco_none}>
				<ListItem button key='문의 관리' className={props.current_link === '/question' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <LiveHelpIcon />
					</ListItemIcon>
				  <ListItemText primary='문의 관리' />
				</ListItem>
			  </Link>
        <Link to="/contract" className={classes.txt_deco_none}>
				<ListItem button key='계약서 관리' className={props.current_link === '/contract' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <InsertDriveFileIcon />
					</ListItemIcon>
				  <ListItemText primary='계약서 관리' />
				</ListItem>
			  </Link>
        <Link to="/contract2" className={classes.txt_deco_none}>
				<ListItem button key='완료 계약서 관리' className={props.current_link === '/contract2' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <InsertDriveFileIcon />
					</ListItemIcon>
				  <ListItemText primary='완료 계약서 관리' />
				</ListItem>
			  </Link>
			</List>
		  <Divider />
		  <List>
			<Link to="/journal" className={classes.txt_deco_none}>
			  <ListItem button key='업무일지 관리' className={props.current_link === '/journal' ? classes.clicked_item : classes.unclicked_item }>
				<ListItemIcon>
					<LibraryBooksOutlinedIcon />
				  </ListItemIcon>
				<ListItemText primary='업무일지 관리' />
			  </ListItem>
			</Link>
			<Link to="/attendance" className={classes.txt_deco_none}>
			  <ListItem button key='출퇴근 관리' className={props.current_link === '/attendance' ? classes.clicked_item : classes.unclicked_item }>
				<ListItemIcon>
					<LocationOnOutlinedIcon />
				  </ListItemIcon>
				<ListItemText primary='출퇴근 관리' />
			  </ListItem>
			</Link>
		  </List>
		</div>
	  );

 const drawer2 = (
		<div id="admin_container">
		  <div className={classes.toolbar} />
		  <Divider />
			<List>
			  <Link to="/admin" className={classes.txt_deco_none}>
				<ListItem button key='직원 관리' className={props.current_link === '/admin' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <PeopleIcon />
					</ListItemIcon>
				  <ListItemText primary='직원 관리' />
				</ListItem>
			  </Link>
			</List>
		  <Divider />
		  <List>
			<Link to="/journal" className={classes.txt_deco_none}>
			  <ListItem button key='업무일지 관리' className={props.current_link === '/journal' ? classes.clicked_item : classes.unclicked_item }>
				<ListItemIcon>
					<LibraryBooksOutlinedIcon />
				  </ListItemIcon>
				<ListItemText primary='업무일지 관리' />
			  </ListItem>
			</Link>
			<Link to="/attendance" className={classes.txt_deco_none}>
			  <ListItem button key='출퇴근 관리' className={props.current_link === '/attendance' ? classes.clicked_item : classes.unclicked_item }>
				<ListItemIcon>
					<LocationOnOutlinedIcon />
				  </ListItemIcon>
				<ListItemText primary='출퇴근 관리' />
			  </ListItem>
			</Link>
		  </List>
		</div>
	  );

  

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
    <CssBaseline />
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {$(window).width() > 600 ?
            (<Link to='/' className={classes.txt_deco_none2}>Nsworks</Link>) :
            (<Link to='/profile' className={classes.txt_deco_none2}>Nsworks</Link>)
          }
        </Typography>
        
        <Link to="/login" className={classes.icon_wrap2}>
          <Button color="inherit"  onClick={handleLogout}>로그아웃</Button>
        </Link>
      </Toolbar>
    </AppBar>
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {props.session_id*1 === 1 || props.session_id*1 === -1 || props.session_id*1 === 2 ? drawer2 : drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {props.session_id*1 === 1 || props.session_id*1 === -1 || props.session_id*1 === 2 ? drawer2 : drawer}
        </Drawer>
      </Hidden>
    </nav>
    </div>
    );
}
export default NavigationBar;
