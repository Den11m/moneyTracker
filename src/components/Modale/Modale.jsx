import React, {Component, Fragment} from 'react';
import './Modale.css';

class Modale extends Component {

    state = {
        visibleModale: true
    };

    toggleVisibleModale = () => {
        this.setState((prevState) => ({
            visibleModale: !prevState.visibleModale
        }))
    };

    render() {
        const visibleModale = this.state.visibleModale;
        return (
            <Fragment>
                {visibleModale && (<div className='modale-overlay'>
                    <div className='modale'>
                        <img src="/modale.svg"
                             alt="close"
                             className='modale__btn-close'
                             onClick={this.toggleVisibleModale}/>
                        {this.props.children}
                        <button className='modale__btn-save'
                                onClick={this.toggleVisibleModale}
                        >СОХРАНИТЬ
                        </button>
                    </div>
                </div>)}
            </Fragment>


        );
    }
}

export default Modale;
