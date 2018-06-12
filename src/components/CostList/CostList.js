import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getItemList} from '../../selectors/CostListSelector';
import getList from '../../actions/CostListAction';
import {click} from  '../../selectors/CostListSelector';
import toggleShowWindow from '../../actions/clickAction';

import './index.css';
import Modale from '../../components/Modale/Modale';
import AddNewCosts from '../addNewCosts/addNewCosts';


const CostList = (props) => {
    // constructor (props) {
    //     super(props);
    //     this.state = {
    //         visibleModale: true,
    //     };
    // }


    // console.log('must look at props', props);
    // let falseVisible = false

//   toggleVisibleModale = () => {
//     //   console.log('test')
//         this.setState((prevState) => ({
//             visibleModale: !prevState.visibleModale
//         }))
//     };

        // debugger
    return (
        <div className="cost-wrapper">
        <AddNewCosts/>
            <div className="cost-list">
                <div className="cost-form">
                    <button className="cost-add" onClick={props.toggleShowWindow}> </button>
                </div>

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
        itemList: getItemList(state),
        click: click(state),
    }
}

function MDTP(dispatch) {
    return {
        getList: function (data) {
            dispatch(getList(data))
        },
        toggleShowWindow: function (){
            dispatch(toggleShowWindow())
        }
    }
}

export default connect(MSTP,MDTP)(CostList);
// export default CostList;





