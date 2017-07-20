import React, { Component } from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/function/debounce';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';

import * as urls from '../../config/urls';

import SquareButton from '../SquareButton';
import classes from './index.css';
import commonStyles from './commonStyles';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import lang from '../../config/intl';
import SelectLanguage from '../SelectLanguage';

export default class Signup extends Component {
  static propTypes = {
    fields: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string
    }).isRequired,

    validationErrors: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string
    }).isRequired,

    auth: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
      message: PropTypes.string
    }).isRequired,

    signup: PropTypes.func.isRequired,
    checkUsernameStatus: PropTypes.func.isRequired,
    setStateVariable: PropTypes.func.isRequired,
    setCredentials: PropTypes.func.isRequired,
    handleNavigateLinkClick: PropTypes.func,
    handleSocialLogin: PropTypes.func
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired
  };

  constructor() {
    super(...arguments);

    this.checkUsernameStatus = debounce(this.checkUsernameStatus, 250);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateCredentials = this.updateCredentials.bind(this);
    this.onNavigateLinkClick = this.onNavigateLinkClick.bind(this);
    this.onSocialLogin = this.onSocialLogin.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUp);
  }

  onSubmit(event) {
    const { signup } = this.props;
    const { router } = this.context;

    event.preventDefault();
    signup(router);
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.onSubmit(event);
    }
  }

  onNavigateLinkClick(event) {
    const { handleNavigateLinkClick } = this.props;
    if (handleNavigateLinkClick) handleNavigateLinkClick(event);
  }

  onSocialLogin(event) {
    const { handleSocialLogin } = this.props;
    if (handleSocialLogin) handleSocialLogin(event);
    return true;
  }

  getStyles() {
    return {
      fontSize12: {
        fontSize: '13px'
      },
      selectField: {
        fontSize: '13px',
        top: '28px',
        maxWidth: '150px'
      }
    };
  }

  updateCredentials({ target }) {
    const { setCredentials, setStateVariable } = this.props;
    setCredentials({ [target.name]: target.value });
    setStateVariable();
    if (target.name === 'username') {
      this.checkUsernameStatus(target.value);
    }
  }

  checkUsernameStatus(username) {
    // Check username only if length is greater or than 3
    if (username && username.length >= 3) this.props.checkUsernameStatus(username);
  }

  render() {
    const { fields, auth, validationErrors } = this.props;
    let isValidationError;

    for (const field in validationErrors) {
      if (validationErrors.hasOwnProperty(field)
        && validationErrors[field].length > 0) {
        isValidationError = true;
        break;
      }
    }
    for (const field in fields) {
      if (fields[field].length === 0) {
        validationErrors[field] = '';
      }
    }

    const form = (
      <div className={classes.form}>
        <TextField
          name="email"
          style={commonStyles.textField}
          inputStyle={commonStyles.textFieldInput}
          floatingLabelText={
            <FormattedMessage
              id="common.inputEmailLabel"
              defaultMessage="Email"
            />
          }
          floatingLabelStyle={commonStyles.floatingLabelStyle}
          value={fields.email}
          errorText={validationErrors.email}
          onChange={this.updateCredentials}
        />

        <TextField
          name="username"
          style={commonStyles.textField}
          inputStyle={commonStyles.textFieldInput}
          floatingLabelText={
            <FormattedMessage
              id="signin.inputUsernameLabel"
              defaultMessage="Username"
            />
          }
          floatingLabelStyle={commonStyles.floatingLabelStyle}
          hintText="Choose a Username"
          value={fields.username}
          errorText={validationErrors.username}
          onChange={this.updateCredentials}
        />

        <TextField
          name="password"
          type="password"
          style={commonStyles.textField}
          inputStyle={commonStyles.textFieldInput}
          floatingLabelText={
            <FormattedMessage
              id="signin.inputPasswordLabel"
              defaultMessage="Password"
            />
          }
          floatingLabelStyle={commonStyles.floatingLabelStyle}
          hintText="Choose a Password"
          value={fields.password}
          errorText={validationErrors.password}
          onChange={this.updateCredentials}
        />

        <span className={classes.agreement}>
          <FormattedHTMLMessage
            id="signup.termsAndCond"
            defaultMessage="I agree to the <a href='/page/terms.html' target='_blank'>
            &nbsp;Terms and Conditions&nbsp;</a>  by signing up."
          />
        </span>

        <SquareButton
          style={commonStyles.submitButton}
          label={
            <FormattedMessage
              id="signup.createMyAcc"
              defaultMessage="Create an Account"
            />
          }
          labelStyle={commonStyles.buttonLabelSubmit}
          disabled={isValidationError || auth.loading}
          primary
          onTouchTap={this.onSubmit}
        />
        <span className={classes.socialLoginOption}>or</span>
        <a href={`${urls.api}/auth/v1/social?provider=facebook`} onClick={this.onSocialLogin}>
          <SquareButton
            id="facebook-login"
            customTheme="facebookButton"
            label={
              <FormattedMessage
                id="signup.facebookLabel"
                defaultMessage="Sign up with Facebook"
              />
            }
            labelStyle={commonStyles.buttonLabel}
            style={commonStyles.socialButton}
          >
            <span
              className={classes.facebookIcon}
              style={commonStyles.facebookIcon}
            >
              </span>
          </SquareButton>
        </a>
        <a href={`${urls.api}/auth/v1/social?provider=google`} onClick={this.onSocialLogin}>
          <SquareButton
            id="google-login"
            customTheme="googleButton"
            label={
              <FormattedMessage
                id="signup.googleLabel"
                defaultMessage="Sign up with Google"
              />
            }
            labelStyle={commonStyles.buttonLabel}
            style={commonStyles.socialButtonGoogle}
          >
            <span
              className={classes.googleIcon}
              style={commonStyles.googleIcon}
            >
            </span>
          </SquareButton>
        </a>
      </div>
    );

    return (
      <div className={classes.componentWrapper}>
        <h1 className={classes.header}>
          <span>
            <FormattedMessage
              id="signup.createAnAcc"
              defaultMessage="Create an account now!"
            />
          </span>
        </h1>
        {
          auth.message &&
          <div className={classes.message}>
            <span>{auth.message}</span>
          </div>
        }
        <div className={classes.formWrapper}>
          {form}
        </div>

        <div className={classes.navigate}>
          <FormattedMessage
            id="signup.alreadyAcc"
            defaultMessage="Already have an account?"
          />
          <Link
            onClick={this.onNavigateLinkClick}
            className={classes.navigateLink}
            to="/account/signin"
          >
            <FormattedMessage
              id="signin.loginLabel"
              defaultMessage="log in"
            />
          </Link>
        </div>
        <div className={classes.intl}>
          <SelectLanguage
            lang ={lang}
            style= {this.getStyles()}
          />
        </div>
      </div>
    );
  }
}
