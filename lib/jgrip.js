'use babel';

import JgripView from './view';
import { CompositeDisposable } from 'atom'; // eslint-disable-line
import generate, { getTestFileData } from './utils/generate';
import parse from './utils/parse';

export default {

  jgripView: null,
  modalPanel: null,
  rightPanel: null,
  subscriptions: null,

  activate(state) {
    this.jgripView = new JgripView(state.jgripViewState, this.close.bind(this));

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
      generate(src, (err) => {
        if (err) {
          if (err.jgripErr) atom.notifications.addInfo(err.message);
          else atom.notifications.addError(err.message);
        }
      });
    }
  },

  toggle(panel) {
    if (panel === 'right') {
      const TextEditor = atom.workspace.getActiveTextEditor();
      const codeInFile = TextEditor.getText();
      const src = TextEditor.getPath();

      parse(src, (err, parsedData) => {
        if (err) {
          if (err.jgripErr) return atom.notifications.addInfo(err.message);
          return atom.notifications.addError(err.message);
        }
        this.jgripView.newView(panel, getTestFileData(parsedData));
        if (!this.rightPanel.isVisible()) return this.rightPanel.show();
        return null;
      }, codeInFile);
    }
  },

  close(panel) {
    if (panel === 'right' && this.rightPanel) this.rightPanel.hide();
  }

};
