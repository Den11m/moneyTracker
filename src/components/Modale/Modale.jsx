import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Modale.css';

class Modale extends Component {
    state = {
        visibleModale: false,
    };
    toggleVisibleModale = () => {
        this.setState((prevState) => ({
            visibleModale: !prevState.visibleModale
        }))
    };

    render() {
        return (
            <div className={`modale ${ this.state.visibleModale ? 'active' : ''}`}>
                <img src="/public/modale.png"
                     alt="#"
                     className='modale__btn-close'
                     onClick={() => this.toggleVisibleModale()}
                />
                {this.props.children}
                <button className='modale__btn-save'
                        onClick={() => this.toggleVisibleModale()}
                >СОХРАНИТЬ
                </button>
            </div>
        );
    }
}

Modale.propTypes = {};

export default Modale;
