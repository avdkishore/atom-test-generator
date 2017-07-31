'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RightPanel from './component/RightPanel';

injectTapEventPlugin();

export default class JgripView {

  constructor() {
    // Create root element

    this.rightPanel = null;
    this.element = document.createElement('div');
    this.element.classList.add('jgrip');

    // Create right pan element
    this.rightElement = document.createElement('div');
    this.rightElement.classList.add('jgrip-left');
    this.addAppInRightPanel();

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'processing please wait...';
    message.classList.add('message');
    this.element.appendChild(message);
  }

  // Returns an object that can be retrieved when package is activated
  // serialize() { }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getRightElement() {
    return this.rightElement;
  }

  getDataSetter() {
    return this.setDataInState;
  }

  saveFunction(setDataInState) {
    this.setDataInState = setDataInState;
  }

  addAppInRightPanel() {
    ReactDOM.render(
      <MuiThemeProvider>
        <RightPanel saveFunction={this.saveFunction.bind(this)} />
      </MuiThemeProvider>,
      this.rightElement
    );
  }

}
