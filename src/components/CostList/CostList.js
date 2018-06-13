import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getItemList} from '../../selectors/CostListSelector';
import getList from '../../actions/CostListAction';
import moment from 'moment';

import './index.css';
import Modale from '../../components/Modale/Modale';
import AddNewCosts from '../addNewCosts/addNewCosts';


class CostList extends Component {4

    constructor (props) {
        super(props);
        this.state = {
            visibleModale: false

        };
    }

    // console.log('must look at props', props);
    // let falseVisible = false

  toggleVisibleModale = () => {
        this.setState((prevState) => ({
            visibleModale: !prevState.visibleModale
        }))
    };
    render(){
        
    return (
        <div className="cost-wrapper">
        <AddNewCosts toggleVisibleModale={this.toggleVisibleModale} visibleModale={this.state.visibleModale}/>
            <div className="cost-list">
                <div className="cost-form">
                    <button className="cost-add" onClick={this.toggleVisibleModale}> </button>
                </div>

                <table className="Table">
                    <tbody>
                    {this.props.itemList.map((el, index) => <tr className="line" key={el.id}>

                        <td className="start">{index + 1}.</td>
                        <td>{el.category} ({el.comments})</td>
                        <td>{moment(el.date).format("DD.MM.YYYY")}</td>
                        <td>{el.cost} грн</td>
                    </tr>)}

                    </tbody>
                </table>

                <div className="result">
                    <p className="spends-result"> Всего
                        <span
                            className="spends-span">{this.props.itemList.reduce((prev, curr) => prev + curr.cost, 0)}</span>
                        грн
                    </p>
                </div>

            </div>
        </div>

    )}
};

function MSTP(state) {
    return {
        itemList: getItemList(state)
    }
}

function MDTP(dispatch) {
    return {
        getList: function (data) {
            dispatch(getList(data))
        },
    }
}

export default connect(MSTP,MDTP)(CostList);
// export default CostList;





