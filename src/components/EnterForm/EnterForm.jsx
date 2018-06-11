import React from 'react';
import './EnterForm.css';

const EnterForm = () => {
    return (
        <form action="" className='enter-form'>
            <h3 className='enter-form__text'>Вход</h3>
            <div className='enter-form__valid'>
                <label className='enter-form__name'
                       htmlFor="email">
                    Email
                </label>
                <input type="email" required
                       className='enter-form__control'
                       name='email'
                       placeholder="mail@mail"
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
                       placeholder="from 4 to 16 symbols"
                       minLength='4'
                />
            </div>
            <input type='submit'
                   className='enter-form__btn'
                   defaultValue="ВОЙТИ"
            />
        </form>
    );

};

export default EnterForm;
