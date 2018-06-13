import React, {Component} from 'react';
import EnterFormErrors from './EnterFormErrors';
import './EnterForm.css';

class EnterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formErrors: {}
        }
    }

    validateField = (e) => {
        e.preventDefault();
        const emailInput = this.emailInput.value;
        const passwordInput = this.passwordInput.value;
        const getDataUsers = localStorage.getItem("users") ? JSON.parse(localStorage.getItem('users')) : [];
        const findUsers = getDataUsers.find(user => user.email === emailInput);
        if (findUsers) {
            if (findUsers.password === passwordInput) {
                window.location.pathname = '/login'//здесь будет ре-директион
            } else {
                this.setState({
                    formErrors: {
                        Password: ` : Doesn't match`
                },
                })
            }
        }
        else {
            this.setState({
                formErrors:{
                    Email: ` : This user doesn't exist. Please register.`
                }
            })
        }
    };

    render() {
        return (
            <form action="" className='enter-form' onSubmit={this.validateField}>
                <h3 className='enter-form__text'>Вход</h3>
                <EnterFormErrors formErrors={this.state.formErrors}/>
                <div className='enter-form__valid'>
                    <label className='enter-form__name'>
                        Email
                    </label>
                    <input type="email" required
                           className='enter-form__control'
                           name='email'
                           placeholder="mail@mail"
                           ref={(input) => this.emailInput = input}
                    />
                </div>
                <div className='enter-form__valid'>
                    <label className='enter-form__name'
                           htmlFor="password">
                        Password
                    </label>
                    <input type="password" required
                           className='enter-form__control'
                           name='password'
                           placeholder="......"
                           ref={(input) => this.passwordInput = input}
                    />
                </div>
                <input type='submit'
                       className='enter-form__btn'
                       defaultValue="ВОЙТИ"
                />
            </form>
        );
    }
}

export default EnterForm;
