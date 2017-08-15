'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SvgIcon from 'material-ui/SvgIcon';

import Code from './Code';
import Keys from './Keys';
import { getTestFileData } from '../../utils/generate';

function getStyles() {
  return {
    close: {
      position: 'absolute',
      left: -20,
      top: '50%',
      background: 'white',
      cursor: 'pointer'
    }
  };
}

class RightView extends Component {

  constructor(props) {
    super(props);

    // initial state
    this.state = { props: [], wrapperString: '', propObjString: '', moduleName: '' };

    // bind this with every class function
    this.setView = this.setView.bind(this);
    this.onKeyCheck = this.onKeyCheck.bind(this);
    this.changeCodes = this.changeCodes.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.setRightViewHandler === 'function') {
      this.props.setRightViewHandler('right', this.setView);
    }
  }

  changeCodes(moduleName, props = []) {
    const { wrapperString, propObjString } = getTestFileData({ moduleName, props });

    // set data in state
    this.setState({ wrapperString, propObjString, moduleName });
  }

  onClose() {
    if (this.props.onClose) this.props.onClose('right');
  }

  onKeyCheck(checkedProps) {
    const { props, moduleName } = this.state;
    const newEntries = [];

    // create new prop object
    props.forEach((entry) => {
      if (entry[1].isRequired || checkedProps[entry[0]]) newEntries.push([entry[0], entry[1]]);
    });

    // changeCodes
    this.changeCodes(moduleName, newEntries);
  }

  setView({ props, moduleName } = { props: [], moduleName: '' }) {
    const newEntries = [];

    // create new prop object
    props.forEach((entry) => {
      if (entry[1].isRequired) newEntries.push([entry[0], entry[1]]);
    });

    // set props
    this.setState({ props, moduleName });

   // change codes
    this.changeCodes(moduleName, newEntries);
  }

  render() {
    const { props, wrapperString, propObjString } = this.state;
    const { close } = getStyles();
    /* eslint-disable max-len */
    const NavigationClose = args => (
      <SvgIcon {...args}>
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </SvgIcon>
    );
    /* eslint-enable max-len */

    return (
      <MuiThemeProvider>
        <div>
          <NavigationClose style={close} onClick={this.onClose} />
          <Keys props={props} onKeyCheck={this.onKeyCheck} />
          {this.state.wrapperString && <Code title={'Wrapper'} text={wrapperString} />}
          {this.state.propObjString && <Code title={'PropObj'} text={propObjString} />}
        </div>
      </MuiThemeProvider>
    );
  }
}

RightView.propTypes = {
  setRightViewHandler: PropTypes.func.isRequired,
  onClose: PropTypes.func
};

export default RightView;
