import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/es/Typography/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

/**
 * Users table
 * @param {Object} props - table properties
 * @return {*} - users table
 * @constructor
 */
function UsersTable(props) {
  const { classes, users } = props;
  const items = users.items || [];

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.username}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
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

export default withStyles(styles)(connect(mapStateToProps)(UsersTable));
