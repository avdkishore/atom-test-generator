'use babel';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card from 'material-ui/Card';
import prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';

const styleSheet = createStyleSheet(theme => ({
  card: {
    width: 330,
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10,
    padding: '0 10px',
  },
  pTag: {
    marginTop: 4,
    marginBottom: 4,
  },
  code: {
    fontFamily: theme.typography.fontFamily,
    marginTop: 4,
    marginBottom: theme.spacing.unit * 2,
  }
}));

function Code(props) {
  const { classes, title, text, ...other } = props;

  const html = `<pre class="language-jsx">${prism.highlight(text, prism.languages.jsx)}</pre>`;
  /* eslint-disable react/no-danger */
  return (
    <Card className={classes.card}>
      <p className={classes.pTag}>{title}</p>
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
