import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});

/**
 * Application drawer
 */
class AppDrawer extends React.Component {
  /**
   * Render drawer
   * @return {*} - drawer html
   */
  render() {
    const { classes, showDrawer, location } = this.props;

    const items = [
      {
        text: 'Users',
        pathname: '/users',
        icon: <AccountCircleIcon/>,
      },
    ];

    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={showDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}/>
        <List>
          {items.map(({ text, icon, pathname }) => (
            <ListItem
              button
              component={Link}
              to={pathname}
              key={text}
              selected={location.pathname === pathname}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text}/>
            </ListItem>
          ))}
        </List>
        <Divider/>
      </Drawer>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  showDrawer: PropTypes.bool.isRequired,
};

/**
 * Map state to properties
 * @param {Object} state - app state
 * @return {{showDrawer: (*|boolean)}} - drawer state
 */
function mapStateToProps(state) {
  return {
    showDrawer: state.app.showDrawer,
  };
}

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps),
)(AppDrawer);
