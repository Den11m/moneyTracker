import React from "react";
import {connect} from "react-redux";
import toggleShowLogin from "../../actions/toggleLoginAction";
import toggleShowRegistration from "../../actions/toggleRegistrationAction";
import "./HomePage.css";
import Coverflow from "react-coverflow";
import {StyleRoot} from "radium";

class HomePage extends React.Component {
    //      constructor(props) {
    //           super(props);

    //           this.state = {
    //             active: 0
    //           };
    //         }
    //   const fn = function () {
    //        let num = Math.floor((Math.random() * 10) + 1);
    //     this.setState({
    //      active: num
    //    });
    //  }

    render() {
        console.log("homepage", this.props);

        return (
            <div className="homepage">
                <div className="homepage__main">
                    <h2 className="homepage__title">MoneyTracker</h2>
                    <div className="homepage__btn">
                        <button
                            className="homepage__btn-reg"
                            onClick={this.props.toggleShowRegistration}
                        >
                            Sign Up
                        </button>
                        <button
                            className="homepage__btn-log"
                            onClick={this.props.toggleShowLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
                <StyleRoot>
                    <Coverflow
                        // width="50vw"
                        // height="100vh"
                        media={{
                            "@media (min-width: 320px)": {
                                width: "100vw",
                                height: "100vh"
                            }
                        }}
                        displayQuantityOfSide={2}
                        navigation={false}
                        enableHeading={false}
                    >
                        <div
                            // onClick={() => fn()}
                            // onKeyDown={() => fn()}
                            role="menuitem"
                            tabIndex="0"
                        >
                            <img
                                src="/costs.png"
                                alt="title or description"
                                style={{display: "block", width: "100%"}}
                            />
                        </div>
                        <img src="/statistics.png" alt="title or description"/>
                        <img src="/costs.png" alt="title or description"/>
                    </Coverflow>
                </StyleRoot>
            </div>
        );
    }
}

const MDTP = dispatch => {
    return {
        toggleShowLogin: function () {
            dispatch(toggleShowLogin());
        },

        toggleShowRegistration: function () {
            dispatch(toggleShowRegistration());
        }
    };
};

export default connect(
    null,
    MDTP
)(HomePage);
