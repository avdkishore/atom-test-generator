'use babel';

import JgripView from './view';
import { CompositeDisposable } from 'atom'; // eslint-disable-line
import createTestFile, { getTestFileData, getRawFileData } from './utils/testFile';

export default {

  jgripView: null,
  modalPanel: null,
  rightPanel: null,
  subscriptions: null,

  activate(state) {
    this.jgripView = new JgripView(state.jgripViewState);

    // modal panel
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jgripView.getModalElement(),
      visible: false,
    });

    // right panel
    this.rightPanel = atom.workspace.addRightPanel({
      item: this.jgripView.getRightElement(),
      visible: false,
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jgrip:generate': () => this.generate(),
      'jgrip:right': () => this.toggle('right')
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.jgripView.destroy();
    this.modalPanel.destroy();
    this.rightPanel.destroy();
  },

  serialize() {
    return {
      jgripViewState: null,
    };
  },

  generate() {
    const editor = atom.workspace.getActiveTextEditor();
    const src = editor.getBuffer().getPath();

    if (editor) {
      createTestFile(src, () => {});
    }
  },

  toggle(panel) {
    if (panel === 'right') {
      const data = atom.workspace.getActiveTextEditor().getText();

      if (this.rightPanel.isVisible()) {
        this.rightPanel.hide();
      } else {
        this.jgripView.newView(panel, getTestFileData(getRawFileData(data)));
        this.rightPanel.show();
      }
    }
  }

};
