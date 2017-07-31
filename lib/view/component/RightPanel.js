'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keys from './Keys';
import Code from './Code';
import { getTestFileData } from '../../utils/testFile';

class RightPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keys: {},
      wrapperString: '',
      propObjString: '',
      propObj: {},
      exportedClass: ''
    };
    this.setDataInState = this.setDataInState.bind(this);
    this.handleCheckAction = this.handleCheckAction.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.saveFunction === 'function') {
      this.props.saveFunction(this.setDataInState);
    }
  }

  handleCheckAction(processedKeys) {
    const { propObj, keys, exportedClass } = this.state;
    const newPropObj = {};
    const newState = {};

    Object.keys(keys).forEach((key) => {
      const isRequired = propObj[key].isRequired || processedKeys[key];
      if (isRequired) newPropObj[key] = propObj[key];
    });

    const { wrapperString, propObjString } = getTestFileData(exportedClass, newPropObj);

    newState.wrapperString = wrapperString;
    newState.propObjString = propObjString;
    this.setState(newState);
  }

  setDataInState(data) {
    const newState = {};
    if (data.keys && Array.isArray(data.keys)) {
      // create newState;
      const newPropObj = {};
      const keys = {};
      newState.propObj = data.propObj;
      data.keys.forEach((key) => {
        const isRequired = data.propObj[key].isRequired;
        if (isRequired) newPropObj[key] = data.propObj[key];
        keys[key] = isRequired;
      });
      const { wrapperString, propObjString } = getTestFileData(data.exportedClass, newPropObj);
      newState.wrapperString = wrapperString;
      newState.propObjString = propObjString;
      newState.exportedClass = data.exportedClass;
      newState.keys = keys;
    }
    this.setState(newState);
  }

  render() {
    const { keys, wrapperString, propObjString } = this.state;

    return (
      <form>
        <Keys keys={keys} checkAction={this.handleCheckAction} />
        {
          this.state.wrapperString &&
          <Code code={wrapperString} />
        }
        {
          this.state.propObjString &&
          <Code code={propObjString} />
        }
      </form>
    );
  }
}

RightPanel.propTypes = {
  saveFunction: PropTypes.func.isRequired
};

export default RightPanel;
