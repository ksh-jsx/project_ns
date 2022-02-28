import React from 'react';
import {Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Button from '@mui/material/Button';
import { makeStyles, useTheme } from '@mui/material/styles';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BusinessIcon from '@mui/icons-material/Business';
import MessageIcon from '@mui/icons-material/Message';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
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
				<ListItem button key='직원 관리' className={props.current_link === '/' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <PeopleIcon />
					</ListItemIcon>
				  <ListItemText primary='직원 관리' />
				</ListItem>
			  </Link>
			  <Link to="/admin/customer" className={classes.txt_deco_none}>
				<ListItem button key='고객사 관리' className={props.current_link === '/customer' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <BusinessIcon />
					</ListItemIcon>
				  <ListItemText primary='고객사 관리' />
				</ListItem>
			  </Link>
			  <Link to="/admin/manager" className={classes.txt_deco_none}>
				<ListItem button key='담당자 관리' className={props.current_link === '/manager' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <AssignmentIndIcon />
					</ListItemIcon>
				  <ListItemText primary='담당자 관리' />
				</ListItem>
			  </Link>
			  <Link to="/admin/popUp" className={classes.txt_deco_none}>
				<ListItem button key='팝업창 관리' className={props.current_link === '/popUp' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <AssignmentIcon />
					</ListItemIcon>
				  <ListItemText primary='팝업창 관리' />
				</ListItem>
			  </Link>
			  <Link to="/admin/board" className={classes.txt_deco_none}>
				<ListItem button key='게시판 관리' className={props.current_link === '/board' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <CreateIcon />
					</ListItemIcon>
				  <ListItemText primary='게시판 관리' />
				</ListItem>
			  </Link>
			  <Link to="/admin/survey" className={classes.txt_deco_none}>
				<ListItem button key='설문 관리' className={props.current_link === '/survey' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <MessageIcon />
					</ListItemIcon>
				  <ListItemText primary='설문 관리' />
				</ListItem>
			  </Link>
			  <Link to="/admin/question" className={classes.txt_deco_none}>
				<ListItem button key='문의 관리' className={props.current_link === '/question' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <LiveHelpIcon />
					</ListItemIcon>
				  <ListItemText primary='문의 관리' />
				</ListItem>
			  </Link>
        <Link to="/admin/contract" className={classes.txt_deco_none}>
				<ListItem button key='계약서 관리' className={props.current_link === '/contract' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <InsertDriveFileIcon />
					</ListItemIcon>
				  <ListItemText primary='계약서 관리' />
				</ListItem>
			  </Link>
        <Link to="/admin/contract2" className={classes.txt_deco_none}>
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
			<Link to="/admin/journal" className={classes.txt_deco_none}>
			  <ListItem button key='업무일지 관리' className={props.current_link === '/journal' ? classes.clicked_item : classes.unclicked_item }>
				<ListItemIcon>
					<LibraryBooksOutlinedIcon />
				  </ListItemIcon>
				<ListItemText primary='업무일지 관리' />
			  </ListItem>
			</Link>
			<Link to="/admin/attendance" className={classes.txt_deco_none}>
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
				<ListItem button key='직원 관리' className={props.current_link === '/' ? classes.clicked_item : classes.unclicked_item }>
				  <ListItemIcon>
					  <PeopleIcon />
					</ListItemIcon>
				  <ListItemText primary='직원 관리' />
				</ListItem>
			  </Link>
			</List>
		  <Divider />
		  <List>
			<Link to="/admin/journal" className={classes.txt_deco_none}>
			  <ListItem button key='업무일지 관리' className={props.current_link === '/journal' ? classes.clicked_item : classes.unclicked_item }>
				<ListItemIcon>
					<LibraryBooksOutlinedIcon />
				  </ListItemIcon>
				<ListItemText primary='업무일지 관리' />
			  </ListItem>
			</Link>
			<Link to="/admin/attendance" className={classes.txt_deco_none}>
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
            (<Link to='/admin' className={classes.txt_deco_none2}>Nsworks</Link>) :
            (<Link to='/admin/profile' className={classes.txt_deco_none2}>Nsworks</Link>)
          }
        </Typography>
        
        <Link to="/admin/login" className={classes.icon_wrap2}>
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
          {props.session_id*1 === 1 || props.session_id*1 === -1 || props.session_id*1 === 2 ? drawer : drawer2}
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
          {props.session_id*1 === 1 || props.session_id*1 === -1 || props.session_id*1 === 2 ? drawer : drawer2}
        </Drawer>
      </Hidden>
    </nav>
    </div>
    );
}
export default NavigationBar;
