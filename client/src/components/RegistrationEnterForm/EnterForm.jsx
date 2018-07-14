import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import EnterFormErrors from "./EnterFormErrors";
import "./EnterForm.css";
import Modale from "../Modale/Modale";
import toggleShowLogin from "../../actions/toggleLoginAction";
import { loginHeader } from "../../actions/headerActions";


class EnterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: {},
      isEntered: false
    };
  }

  validateField = e => {
    e.preventDefault();
    const emailInput = this.emailInput.value;
    const passwordInput = this.passwordInput.value;

    fetch(`/login`, {
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
        console.log('ststus', response.status);
        if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 400 ||
          response.status === 401
        ) {
          return response.json();
        }
        throw new Error();
      })
      .then(data => {
        console.log(data);
        if (data.userToken) {
          localStorage.setItem("token", data.userToken);
          this.setState({ isEntered: true });
          // setTimeout(() => {
            this.props.toggleShowLogin();
            this.props.login();
            this.setState({ isEntered: false });
          // }, 3000);
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
          {
          //   this.state.isEntered ? (
          //   <h3 className="registration__welcome">
          //     Congratulations. You are entered.
          //   </h3>
          // ) : (
            (<Fragment>
              <h3 className="enter-form__text">Вход</h3>
              <EnterFormErrors formErrors={this.state.formErrors} />
              <div className="enter-form__valid">
                  <img className="png-bg" src="/email.png" alt="png"/>
                <label className="enter-form__name" for="enter"></label>
                <input
                  type="email"
                  required
                  className="enter-form__control"
                  name="email"
                  placeholder="Email"
                  ref={input => (this.emailInput = input)}
                />
              </div>
              <div className="enter-form__valid">
                  <img className="png-bg" src="/lock.png" alt="png"/>
                <label className="enter-form__name" htmlFor="password" for="password">
                </label>
                <input
                  type="password"
                  required
                  className="enter-form__control"
                  name="password"
                  placeholder="Password"
                  ref={input => (this.passwordInput = input)}
                />
              </div>
              <input
                type="submit"
                className="enter-form__btn"
                defaultValue="ВОЙТИ"
              />
            </Fragment>
          )}
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
