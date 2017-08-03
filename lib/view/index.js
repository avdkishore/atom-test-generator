'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RightView from './RightView';

injectTapEventPlugin();

export default class JgripView {

  constructor() {
    // Create modal pan element
    this.modalElement = document.createElement('div');
    this.modalElement.classList.add('jgrip-modal');
    // this.addModalView();

    // Create right pan element
    this.rightElement = document.createElement('div');
    this.rightElement.classList.add('jgrip-right');
    this.addRightView();
  }

  // Returns an object that can be retrieved when package is activated
  // serialize() { }

  // Tear down any state and detach
  destroy() {
    this.modalElement.remove();
    this.rightElement.remove();
  }

  getModalElement() {
    return this.modalElement;
  }

  getRightElement() {
    return this.rightElement;
  }

  newView(type, data = { }) {
    if (type && typeof this[type] === 'function') this[type](data);
  }

  setViewHandler(type, viewSetter) {
    if (type && viewSetter && typeof viewSetter === 'function') {
      this[type] = viewSetter;
    } else console.log('given type of view setter is already there.'); // eslint-disable-line
  }

  addRightView() {
    ReactDOM.render(
      <RightView
        setRightViewHandler={this.setViewHandler.bind(this)}
      />,
      this.rightElement
    );
  }

}
