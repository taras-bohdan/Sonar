import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';

import { userActions } from '../actions';
import UsersTable from '../components/UsersTable';
import Typography from '@material-ui/core/es/Typography';

const styles = theme => ({
  administration: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

/**
 * Administration page component
 * @return {Component} - administration page component
 */
class Administration extends Component {
  /**
   * Get all users on component mount
   * @returns {void}
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getAll());
  }

  /**
   * Render administration page
   * @returns {*} - component HTML
   */
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.administration}>
        <Typography variant="h6">Users</Typography>
        <UsersTable/>
      </div>
    );
  }
}

Administration.propTypes = {
  classes: object.isRequired,
  dispatch: func,
};

/**
 * Map users state to component properties
 * @param {object} state - component state
 * @return {object} - component props
 */
function mapStateToProps(state) {
  const { users } = state;
  return { users };
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Administration));
