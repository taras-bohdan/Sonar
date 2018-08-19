import React, { Component } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { func, object, string } from 'prop-types';

import { alertActions } from '../../actions/alert.actions';


const styles = theme => {
  return {
    close: {},
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    success: {
      backgroundColor: theme.palette.primary.dark,
    },
  };
};

/**
 * Alert component
 * @return {*} - alert component
 */
class Alert extends Component {
  handleClose = () => {
    const { dispatch } = this.props;
    dispatch(alertActions.clear());
  };

  /**
   * Render alert component
   * @return {*} - component's HTML
   */
  render() {
    const { classes, type, message } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!message}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          className={classes[type]}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon/>
            </IconButton>,
          ]}>
        </SnackbarContent>
      </Snackbar>
    );
  }
}

/**
 * Map state to component's properties
 * @param {object} state - components state
 * @returns {{type: string, message: string}} - alert type and message
 */
function mapStateToProps(state) {
  const { type = 'success', message = '' } = state.alert;
  return {
    type,
    message,
  };
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Alert));

Alert.propTypes = {
  dispatch: func.isRequired,
  classes: object.isRequired,
  type: string.isRequired,
  message: string.isRequired,
};
