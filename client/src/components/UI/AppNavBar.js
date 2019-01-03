import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import { toggleDrawer } from '../../actions/app.actions';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

/**
 * Navigation bar
 * @param {Object} props - properties
 * @return {*} - component
 * @constructor
 */
function AppNavBar(props) {
  const { classes, authentication } = props;

  return (
    <div className={classes.root}>
      {authentication.loggedIn && (
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar variant="dense">
            <IconButton
              onClick={props.toggleSidebar}
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon/>
            </IconButton>
            <Typography className={classes.grow} variant="h6" color="inherit">
              Sonar
            </Typography>
            <div>
              <IconButton
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle/>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}

AppNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

/**
 * Map component's state to props to inject authentication state
 * @param {object} state - auth state
 * @return {{authentication: *}} - component's properties
 */
function mapStateToProps(state) {
  const { authentication } = state;
  return {
    authentication,
  };
}

/**
 * Map dispatch actions
 * @param {function} dispatch - dispatch function
 * @return {{toggleDrawer: *}} - actions
 */
function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: () => dispatch(toggleDrawer()),
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AppNavBar));
