import React, {Component} from 'react';
import RegistrationFormErrors from './RegistrationFormErrors';
import './RegistrationForm.css';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false,
        }
    }

    hahdleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
    };

    validateField(fieldName, value) {
        // let {fieldValidationErrors, emailValid, passwordValid} = this.state;
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch (fieldName) {
            case 'email':
                // emailValid = value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);//минимум от 4х символов в логин  проверка на  /@/ проверка на наличие точки /.+@.+\..+/i
                emailValid = value.match(/^([-\w.]{4,})+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/);//минимум от 4х символов в логин  проверка на  /@/ проверка на наличие точки /.+@.+\..+/i
                fieldValidationErrors.email = emailValid ? '' : 'is to short , from 4 symbol for login';
                break;
            case 'password':
                passwordValid = value.match(/^(?=^.{4,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);//Паттерн: /^[a-z0-9_-]{4,16}$/
                fieldValidationErrors.password = passwordValid ? '' : 'is not valid, from 4 to 16 symbols for password';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    // errorClass(error) {
    //     return(error.length === 0 ? '' : 'has-error');
    // }

    render() {
        return (
            <form action="" className='registration'>
                <h3 className='registration__text'>Регистрация</h3>
                <div className='enter-form__panel'>
                    <RegistrationFormErrors formErrors={this.state.formErrors}/>
                </div>
                <div className='registration__valid'>
                    <label className='registration__name'
                           htmlFor="name">
                        Name
                    </label>
                    <input type="text" required
                           className='registration__control'
                           name='name'
                        // pattern='^([-\w.]{4,})+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$'
                           placeholder="name"
                           value={this.state.name}
                           onChange={this.hahdleUserInput}
                    />

                </div>
                <div className='registration__valid'>
                    <label className='registration__name'
                           htmlFor="email">
                        Email
                    </label>
                    <input type="email" required
                           className='registration__control'
                           name='email'
                        // pattern='^([-\w.]{4,})+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$'
                           placeholder="mail@mail"
                           value={this.state.email}
                           onChange={this.hahdleUserInput}
                    />

                </div>
                <div className='registration__valid'>
                    <label className='registration__name'
                           htmlFor="password">
                        Password
                    </label>
                    <input type="password" required
                           className='registration__control'
                           name='password'
                        // pattern='^(?=^.{4,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                           placeholder="....."
                           value={this.state.password}
                           onChange={this.hahdleUserInput}
                    />
                </div>
                <input type='submit'
                       className='registration__btn'
                    // disabled={!this.state.formValid}
                       defaultValue="СОХРАНИТЬ"
                />
            </form>
        );
    }
}

export default RegistrationForm;
