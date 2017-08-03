'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Code from './Code';

import { getTestFileData } from '../../utils/testFile';

import Keys from './Keys';

class RightView extends Component {

  constructor(props) {
    super(props);

    // initial state
    this.state = { entries: [], wrapperString: '', propObjString: '', exportedClass: '' };

    // bind this with every class function
    this.setView = this.setView.bind(this);
    this.onKeyCheck = this.onKeyCheck.bind(this);
    this.changeCodes = this.changeCodes.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.setRightViewHandler === 'function') {
      this.props.setRightViewHandler('right', this.setView);
    }
  }

  changeCodes(exportedClass, entries = []) {
    const { wrapperString, propObjString } = getTestFileData(exportedClass, entries);

    // set data in state
    this.setState({ wrapperString, propObjString, exportedClass });
  }

  onKeyCheck(checkedProps) {
    const { entries, exportedClass } = this.state;
    const newEntries = [];

    // create new prop object
    entries.forEach((entry) => {
      if (entry[1].isRequired || checkedProps[entry[0]]) newEntries.push([entry[0], entry[1]]);
    });

    // changeCodes
    this.changeCodes(exportedClass, newEntries);
  }

  setView({ entries, exportedClass } = { entries: [], exportedClass: '' }) {
    const newEntries = [];

    // create new prop object
    entries.forEach((entry) => {
      if (entry[1].isRequired) newEntries.push([entry[0], entry[1]]);
    });

    // set entries
    this.setState({ entries, exportedClass });

   // change codes
    this.changeCodes(exportedClass, newEntries);
  }

  render() {
    const { entries, wrapperString, propObjString } = this.state;

    return (
      <MuiThemeProvider>
        <form>
          <Keys entries={entries} onKeyCheck={this.onKeyCheck} />
          {this.state.wrapperString && <Code text={wrapperString} />}
          {this.state.propObjString && <Code text={propObjString} />}
        </form>
      </MuiThemeProvider>
    );
  }
}

RightView.propTypes = {
  setRightViewHandler: PropTypes.func.isRequired
};

export default RightView;
