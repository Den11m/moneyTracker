import React, { Component, Fragment } from "react";
import RegistrationFormErrors from "./RegistrationFormErrors";
import { connect } from "react-redux";
import "./RegistrationForm.css";
import Modale from "../Modale/Modale";
import toggleShowRegistration from "../../actions/toggleRegistrationAction";
import { loginHeader } from "../../actions/headerActions";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      email: "",
      password: "",
      formErrors: { Email: "", Password: "", ExistUser: "", Message: "" },
      loginValid: false,
      emailValid: false,
      passwordValid: false,
      isRegistered: false
    };
  }

  hahdleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let loginValid = this.state.loginValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case "login":
        loginValid = value.match(/^[a-zA-Z]{4,}$/);
        fieldValidationErrors.Login = loginValid
          ? ""
          : "Enter from 4 symbol for login";
        break;
      case "email":
        emailValid = value.match(
          /^([-\w.]{4,})+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,}$/
        );
        fieldValidationErrors.Email = emailValid
          ? ""
          : "Enter from 4 symbol for email_login";
        break;
      case "password":
        passwordValid = value.match(
          /^(?=^.{4,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        );
        fieldValidationErrors.Password = passwordValid
          ? ""
          : "must include one of the big letter, small letter, number, and password length must be from 4 to 16 letters";
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      loginValid: loginValid,
      emailValid: emailValid,
      passwordValid: passwordValid
    });
  }

  localStorageSetData = e => {
    e.preventDefault();
    if (
      this.state.loginValid &&
      this.state.emailValid &&
      this.state.passwordValid
    ) {
      const newUser = {
        login: this.state.login,
        email: this.state.email,
        password: this.state.password
      };

      fetch(`/signup`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newUser) // превращает js объект в формат json
      })
        .then(response => {
          console.log("response", response);
          if (response.status === 201) {
            // this.props.history.push("/login");
            this.setState({ isRegistered: true , login: '', email: '', password: ''});
            setTimeout(() => {
              this.props.toggleShowRegistration();
              this.props.login();
              this.setState({ isRegistered: false });
            }, 3000);

            return response.json();
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          if (data.userToken) {
            localStorage.setItem("token", data.userToken);
          } else {
            this.setState({
              formErrors: {
                ...this.state.formErrors,
                Message: data.message
              }
            });
          }
        })
        // .then(data => {
        //   console.log("data", data);
        //   this.setState({
        //     formErrors: { ...this.state.formErrors, Message: data.message }
        //   });
        // })
        .catch(err => {
          console.log("err:", err);
        });

      // const getDataUsers = localStorage.getItem("users") ? JSON.parse(localStorage.getItem('users')) : [];
      // if (getDataUsers.some(obj => obj.email === newUser.email)) {
      //     this.setState({
      //         formErrors: {
      //             ...this.state.formErrors,
      //             ExistUser: ' : User already exists.'
      //         }
      //     });
      //     return;
      // }
      // getDataUsers.push(newUser);
      // localStorage.setItem('users', JSON.stringify(getDataUsers));
      //
      // this.props.toggleShowRegistration();
      // this.props.login();
    }
  };

  render() {
    return (
      <Modale
        click={this.props.visibleRegistration}
        toggleShowWindow={this.props.toggleShowRegistration}
      >
        <form
          action=""
          className="registration"
          onSubmit={this.localStorageSetData}
        >
          {this.state.isRegistered ? (
            <h3 className="registration__welcome">
              Congratulations. You are registered.
            </h3>
          ) : (
            <Fragment>
              <h3 className="registration__text">Регистрация</h3>

              <RegistrationFormErrors formErrors={this.state.formErrors} />

              <div className="registration__valid">
                  <img className="png-bg" src="/user.png" alt="png"/>
                <label className="registration__name" htmlFor="name">

                </label>
                <input
                  type="text"
                  required
                  className="registration__control"
                  name="login"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.hahdleUserInput}
                />
              </div>
              <div className="registration__valid">
                  <img className="png-bg" src="/email.png" alt="png"/>
                <label className="registration__name" htmlFor="email">
                </label>
                <input
                  type="email"
                  required
                  className="registration__control"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.hahdleUserInput}
                />
              </div>
              <div className="registration__valid">
                  <img className="png-bg" src="/lock.png" alt="png"/>
                <label className="registration__name" htmlFor="password">

                </label>
                <input
                  type="password"
                  required
                  className="registration__control"
                  name="password"
                  placeholder="Password "
                  value={this.state.password}
                  onChange={this.hahdleUserInput}
                />
              </div>
              <input
                type="submit"
                className="registration__btn"
                defaultValue="СОХРАНИТЬ"
              />
            </Fragment>
          )}
        </form>
      </Modale>
    );
  }
}

const MSTP = state => ({
  visibleRegistration: state.visibleRegistration
});

const MDTP = dispatch => {
  return {
    toggleShowRegistration: function() {
      dispatch(toggleShowRegistration());
    },

    login: function() {
      dispatch(loginHeader());
    }
  };
};

export default connect(
  MSTP,
  MDTP
)(RegistrationForm);
