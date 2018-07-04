import React, { Component } from "react";
import { connect } from "react-redux";
import EnterFormErrors from "./EnterFormErrors";
import "./EnterForm.css";
import Modale from "../Modale/Modale";
import toggleShowLogin from "../../actions/toggleLoginAction";
import { loginHeader } from "../../actions/headerActions";
import { serverConfig } from "../../config/index.js";

const { protocol, host, port } = serverConfig;

class EnterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: {}
    };
  }

  validateField = e => {
    e.preventDefault();
    const emailInput = this.emailInput.value;
    const passwordInput = this.passwordInput.value;
    // const getDataUsers = localStorage.getItem("users") ? JSON.parse(localStorage.getItem('users')) : [];

    fetch(`${protocol}://${host}:${port}/login`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput
      })
    })
      .then(response => {
        if (response.status == 200 || response.status == 201 || response.status == 401) {
          return response.json();
        }
        throw new Error();
      })
      .then(data => {
        console.log(data);
        if (data.userToken) {
          localStorage.setItem("token", data.userToken);
          setTimeout(this.props.toggleShowLogin, 3000);
          setTimeout(this.props.login, 3000);
          

        } else {
          this.setState({
            formErrors: {
              ...this.state.formErrors,
              Message: data.message
            }
          });
        }
      })
      .catch(err => {
        console.log("err", err);
      });

    // const findUsers = getDataUsers.find(user => user.email === emailInput);
    // if (findUsers) {
    //   if (findUsers.password === passwordInput) {
    //     this.props.login();
    //     this.props.toggleShowLogin();
    //     window.location.pathname = "/home";
    //   } else {
    //     this.setState({
    //       formErrors: {
    //         Password: ` : Doesn't match`
    //       }
    //     });
    //   }
    // } else {
    //   this.setState({
    //     formErrors: {
    //       Email: ` : This user doesn't exist. Please register.`
    //     }
    //   });
    // }
  };

  render() {
    return (
      <Modale
        click={this.props.visibleLogin}
        toggleShowWindow={this.props.toggleShowLogin}
      >
        <form action="" className="enter-form" onSubmit={this.validateField}>
          <h3 className="enter-form__text">Вход</h3>
          <EnterFormErrors formErrors={this.state.formErrors} />
          <div className="enter-form__valid">
            <label className="enter-form__name">Email</label>
            <input
              type="email"
              required
              className="enter-form__control"
              name="email"
              placeholder="mail@mail"
              ref={input => (this.emailInput = input)}
            />
          </div>
          <div className="enter-form__valid">
            <label className="enter-form__name" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              required
              className="enter-form__control"
              name="password"
              placeholder="......"
              ref={input => (this.passwordInput = input)}
            />
          </div>
          <input
            type="submit"
            className="enter-form__btn"
            defaultValue="ВОЙТИ"
          />
        </form>
      </Modale>
    );
  }
}

const MSTP = state => ({
  visibleLogin: state.visibleLogin
});

const MDTP = dispatch => {
  return {
    toggleShowLogin: function() {
      dispatch(toggleShowLogin());
    },

    login: function() {
      dispatch(loginHeader());
    }
  };
};

export default connect(
  MSTP,
  MDTP
)(EnterForm);
