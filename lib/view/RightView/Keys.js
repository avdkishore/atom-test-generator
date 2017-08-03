'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Keys extends Component {

  constructor(props) {
    super(props);

    this.state = { entries: props.entries, checkedKeys: { } };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.entries !== nextProps.entries) {
      this.setState({ entries: nextProps.entries });
    }
  }

  onChange({ target: { checked, name } }) {
    const checkedKeys = this.state.checkedKeys;

    checkedKeys[name] = checked;
    this.setState({ checkedKeys });
    this.props.onKeyCheck(checkedKeys);
  }

  render() {
    const { entries, checkedKeys } = this.state;

    return (
      <div>
        {
          entries.map(
            (entry, index) => {
              const isRequired = entry[1].isRequired;
              return (
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
          )
        }
      </div>
    );
  }
}

Keys.propTypes = {
  entries: PropTypes.array,
  onKeyCheck: PropTypes.func.isRequired
};

Keys.defaultProps = {
  entries: []
};

export default Keys;
