import React, {Fragment} from 'react';
import './Modale.css';


const Modale = (props) => {
    return (
        <Fragment>
            {props.click && (<div className='modale-overlay'>
                <div className='modale'>
                    <img src="/modale.svg"
                         alt="close"
                         className='modale__btn-close'
                         onClick={props.toggleShowWindow}/>
                    {props.children}

                </div>
            </div>)}

        </Fragment>
    );
};

export default Modale;
