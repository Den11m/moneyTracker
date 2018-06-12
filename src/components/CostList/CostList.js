import React from 'react';
import {connect} from 'react-redux';
import {getItemList} from '../../selectors/CostListSelector';
import getList from '../../actions/CostListAction';
import './index.css';
import AddNewCosts from '../../components/addNewCosts/addNewCosts';

const CostList = (props) => {
    console.log('must look at props', props.itemList);


    return (
        <div className="cost-wrapper">
            <div className="cost-list">
                <div className="cost-form">
                    <button className="cost-add" onClick={}> </button>
                </div>
                 < AddNewCosts/>
                <table className="Table">
                    <tbody>
                    {props.itemList.map((el, index) => <tr className="line" key={el.id}>

                        <td className="start">{index + 1}.</td>
                        <td>{el.category} ({el.comments})</td>
                        <td>{el.date}</td>
                        <td>{el.cost} грн</td>
                    </tr>)}

                    </tbody>
                </table>

                <div className="result">
                    <p className="spends-result"> Всего
                        <span
                            className="spends-span">{props.itemList.reduce((prev, curr) => prev + curr.cost, 0)}</span>
                        грн
                    </p>
                </div>

            </div>
        </div>

    )
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
        }
    }
}


export default connect(MSTP)(CostList);





