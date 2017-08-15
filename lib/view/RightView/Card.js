'use babel';

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card from 'material-ui/Card';

const styles = () => ({
  card: {
    width: 330,
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10,
    padding: '0 10px',
    paddingTop: '4px',
    paddingBottom: '5px',
    position: 'relative'
  },
  pTag: {
    marginBottom: 4
  }
});

function Code(props) {
  const { classes, title, children } = props;
  return (
    <Card className={classes.card}>
      <p className={classes.pTag}>{title}</p>
      {children}
    </Card>
  );
}

Code.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default withStyles(styles)(Code);
