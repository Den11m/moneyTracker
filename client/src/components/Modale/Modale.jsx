import React, {Fragment} from 'react';
import './Modale.css';


const Modale = (props) => {
    return (
        <Fragment>
            {props.click && (<div className='modale-overlay'>
                <div className='modale'>
                    {/*<img className="menu-png menu-png1" src="/menu.svg" alt="png"/>*/}
                    <img src="/cancel.svg"
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
