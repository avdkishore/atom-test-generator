'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import transitions from 'material-ui/styles/transitions';
import MarkdownElement from './MarkdownElement';

const styles = {
  root: {
    background: '#f8f8f8',
    borderTop: 'solid 1px #e0e0e0',
  },
  markdown: {
    overflow: 'auto',
    maxHeight: '700px',
    transition: transitions.create('max-height', '800ms', '0ms', 'ease-in-out'),
    marginTop: 0,
    marginBottom: 0,
  }
};

class CodeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleTouchTap() {
    this.setState({
      expand: !this.state.expand,
    });
  }

  render() {
    const text = `\`\`\`js
${this.props.children}
    \`\`\``;
    const codeStyle = styles.markdown;

    return (
      <div style={styles.root}>
        <MarkdownElement style={codeStyle} text={text} />
      </div>
    );
  }
}

CodeBlock.propTypes = {
  children: PropTypes.string
};

export default CodeBlock;
