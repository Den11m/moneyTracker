import React from 'react';
import './EnterFormErrors.css';
const EnterFormErrors = ({formErrors}) => {
    return (
        <div className='enter__errors'>
            {Object.keys(formErrors).map((fieldName, i) => {
                if (formErrors[fieldName].length > 0) {
                    return (
                        <p className='enter__errors-text' key={i}>{fieldName}: {formErrors[fieldName]}</p>
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
export default EnterFormErrors;
