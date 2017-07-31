'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClearFix from 'material-ui/internal/ClearFix';
import CodeBlock from './CodeBlock';

class Code extends Component {
  render() {
    const {
      code,
      layoutSideBySide,
    } = this.props;

    const palette = this.context.muiTheme.rawTheme.palette;
    const canvasColor = palette.canvasColor;

    const styles = {
      root: {
        backgroundColor: canvasColor,
        marginBottom: 32,
      },
      exampleBlock: {
        borderRadius: '0 0 2px 0',
        padding: '14px 24px 24px',
        margin: 0,
        width: layoutSideBySide ? '45%' : null,
        float: layoutSideBySide ? 'right' : null,
      },
    };

    return (
      <div style={styles.root}>
        <CodeBlock>{code}</CodeBlock>
        <ClearFix />
      </div>
    );
  }
}

Code.propTypes = {
  code: PropTypes.string.isRequired,
  layoutSideBySide: PropTypes.bool,
};

Code.contextTypes = {
  muiTheme: PropTypes.object,
};


export default Code;
