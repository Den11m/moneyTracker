import React from 'react';
import './RegistrationFormErrors.css';
const RegistrationFormErrors = ({formErrors}) => {
    return (
        <div className='registration__errors'>
            {Object.keys(formErrors).map((fieldName, i) => {
                if (formErrors[fieldName].length > 0) {
                    return (
                        <p className='registration__errors-text'
                           key={i}>{fieldName}: {formErrors[fieldName]}</p>
                    )
                }
                else {
                    return '';
                }
            })
            }
        </div>
    )
};
export default RegistrationFormErrors;
