'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Card from './Card';

const styles = () => ({
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
});

class Keys extends Component {

  constructor(props) {
    super(props);

    this.state = { props: props.props, checkedKeys: { } };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    /**
     * don't forget to reset checkedKeys as empty object if props are diferent from state
     * because code will leak memory
     */
    if (this.state.props !== nextProps.props) {
      this.setState({ props: nextProps.props, checkedKeys: { } });
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
    const { props, checkedKeys } = this.state;

    const required = [];
    const optional = [];

    props.forEach(
      (entry, index) => {
        const isRequired = entry[1].required;
        const key = (
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
        if (isRequired) required.push(key);
        else optional.push(key);
      }
    );

    return (
      <Card title={'Keys'}>
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
  props: PropTypes.array,
  onKeyCheck: PropTypes.func.isRequired,
  classes: PropTypes.string
};

Keys.defaultProps = {
  props: []
};

export default withStyles(styles)(Keys);
