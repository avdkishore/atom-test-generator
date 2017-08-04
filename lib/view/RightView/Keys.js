'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card from 'material-ui/Card';
import Divider from 'material-ui/Divider';

const styleSheet = createStyleSheet(() => ({
  card: {
    width: 330,
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10,
    padding: '0 10px',
  },
  pTag: {
    marginTop: 4,
    marginBottom: 4,
  },
  keys: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f5f2f0',
    marginBottom: 16,
    borderRadius: 3
  },
  divider: {
    marginTop: 5,
    marginBottom: 5
  }
}));

class Keys extends Component {

  constructor(props) {
    super(props);

    this.state = { entries: props.entries, checkedKeys: { } };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    /**
     * don't forget to set checkedKeys as empty object if entries are diferent from state
     * because code will leak memory
     */
    if (this.state.entries !== nextProps.entries) {
      this.setState({ entries: nextProps.entries, chekedKeys: { } });
    }
  }

  onChange({ target: { checked, name } }) {
    const checkedKeys = this.state.checkedKeys;

    checkedKeys[name] = checked;
    this.setState({ checkedKeys });
    this.props.onKeyCheck(checkedKeys);
  }

  render() {
    const { classes } = this.props;
    const { entries, checkedKeys } = this.state;

    const required = [];
    const optional = [];

    entries.forEach(
      (entry, index) => {
        const isRequired = entry[1].isRequired;

        if (isRequired) {
          required.push(
            <span className="key">
              {entry[0]}:
              <input
                key={index}
                name={entry[0]}
                style={{ marginLeft: '5px' }}
                type="checkbox"
                checked={isRequired}
                onChange={ isRequired ? null : this.onChange}
              />
            </span>
          );
        } else {
          optional.push(
            <span className="key">
              {entry[0]}:
              <input
                key={index}
                name={entry[0]}
                style={{ marginLeft: '5px' }}
                type="checkbox"
                checked={isRequired || Boolean(checkedKeys[entry[0]])}
                onChange={ isRequired ? null : this.onChange}
              />
            </span>
          );
        }
      }
    );

    return (
      <Card className={classes.card}>
        <p className={classes.pTag}>Keys</p>
        <div className={classes.keys}>
          {required}
          <Divider className={classes.divider}/>
          {optional}
        </div>
      </Card>
    );
  }
}

Keys.propTypes = {
  entries: PropTypes.array,
  onKeyCheck: PropTypes.func.isRequired,
  classes: PropTypes.string
};

Keys.defaultProps = {
  entries: []
};

export default withStyles(styleSheet)(Keys);
