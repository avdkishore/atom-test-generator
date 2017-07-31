'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Keys extends Component {

  constructor(props) {
    super(props);
    this.state = { keys: props.keys, processedKeys: { } };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.keys !== nextProps.keys) {
      this.setState({ keys: nextProps.keys });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    const processedKeys = this.state.processedKeys;
    processedKeys[name] = value;
    this.setState({ processedKeys });
    this.props.checkAction(processedKeys);
  }

  render() {
    const { keys, processedKeys } = this.state;
    return (
      <div>
        {
          Object.keys(this.state.keys).map(
            (key, index) => {
              const isRequired = keys[key];
              return (
                <span className="key">
                  {key}:
                  <input
                    style={{ marginLeft: '5px' }}
                    type="checkbox"
                    key={index}
                    name={key}
                    checked={isRequired || !!processedKeys[key]}
                    onChange={ isRequired ? null : this.handleInputChange}
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
  keys: PropTypes.object,
  checkAction: PropTypes.func.isRequired
};

Keys.defaultProps = {
  keys: {}
};

export default Keys;
