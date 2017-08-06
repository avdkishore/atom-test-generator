'use babel';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import SvgIcon from 'material-ui/SvgIcon';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';
import purple from 'material-ui/colors/purple';

import prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';

import Card from './Card';

const styleSheet = createStyleSheet(theme => ({
  code: {
    fontFamily: theme.typography.fontFamily,
    marginTop: 4,
    marginBottom: theme.spacing.unit * 2,
  },
  copy: {
    position: 'absolute',
    width: 14,
    height: 14,
    right: 10,
    top: 8,
    cursor: 'hand',
    color: purple[500],
    '&:hover': {
      fill: green[500],
    },
    '&:active': {
      fill: blue[500]
    }
  }
}));
/* eslint-disable */
const CopyContent = (props) => (
  <SvgIcon {...props}>
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
  </SvgIcon>
);
/* eslint-enable */

function Code(props) {
  const { classes, title, text, ...other } = props;

  const html = `<pre class="language-jsx">${prism.highlight(text, prism.languages.jsx)}</pre>`;

  const copy = () => {
    console.log(this); // eslint-disable-line
  };

  /* eslint-disable react/no-danger */
  return (
    <Card title={title} >
      <CopyContent className={classes.copy} onClick={copy} />
      <div
        className={classNames(classes.code, 'markdown-body')}
        dangerouslySetInnerHTML={{ __html: html }}
        {...other}
      />
    </Card>
  );
  /* eslint-enable */
}

Code.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default withStyles(styleSheet)(Code);
