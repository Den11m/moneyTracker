import React, {Component, Fragment} from 'react';
// import AddNewCosts from '../addNewCosts/addNewCosts';
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
                        {/* <button className='modale__btn-save'
                                onClick={this.toggleVisibleModale}
                        >СОХРАНИТЬ
                        </button> */}
                    </div>
                </div>)}
            </Fragment>

        );

}

export default Modale;
