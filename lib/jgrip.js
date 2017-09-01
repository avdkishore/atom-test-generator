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
      generate(src, (err, data) => {

        if (err) {
          if (err.jgripErr) atom.notifications.addInfo(err.message);
          else atom.notifications.addError(err.message);
        }

        if (data && data.testFilePath) {
          const activePane = atom.workspace.getActivePane();
          const parent = activePane.parent;

          const uriContainer = atom.workspace.paneForURI(data.testFilePath);

          // check if item for uri already exists then activate.
          if (uriContainer) return uriContainer.activateItemForURI(data.testFilePath);

          if (parent.orientation === 'horizontal' && parent.children && parent.children.length) {
            // get the index of active pane
            let indexOfActivePane;

            parent.children.find((child, index) => {
              indexOfActivePane = index + 1;
              return child.id === activePane.id;
            });

            if (indexOfActivePane) {
              return atom.workspace.createItemForURI(data.testFilePath)
              .then((itemForTestFile) => {
                const indexOfPaneForItem = indexOfActivePane < parent.children.length
                ? indexOfActivePane
                : indexOfActivePane - 2;
                parent.children[indexOfPaneForItem].activateItem(itemForTestFile);
              }, (e) => {
                atom.notifications.addError(e.message);
              });
            }

            return null;
          }
          // split if there is no parenet for current pane and orientation is not horizontal
          return atom.workspace.open(data.testFilePath, { split: 'right' });
        }
        return null;
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
