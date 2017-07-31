'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import higlightjs from 'highlightjs';

const styles = {
  root: {
    marginTop: 20,
    marginBottom: 20,
    padding: '0 10px',
  },
};

class MarkdownElement extends Component {

  componentWillMount() { //eslint-disable-line
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight(code, lang) {
        return higlightjs.highlight(lang, code).value;
      },
    });
  }

  render() {
    const {
      style,
      text,
    } = this.props;

    /* eslint-disable react/no-danger */
    return (
      <div
        style={Object.assign({}, styles.root, style)}
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: marked(text) }}
      />
    );
    /* eslint-enable */
  }
}

MarkdownElement.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
};
MarkdownElement.defaultProps = {
  text: '',
};

export default MarkdownElement;
