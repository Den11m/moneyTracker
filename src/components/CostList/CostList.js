import React from 'react';
import {connect} from 'react-redux';
import {getItemList} from '../../selectors/CostListSelector';
//import getList from '../../actions/CostListAction';
import './index.css';


const CostList = (props) => {
    console.log('must look at props', props.itemList);


    return (
        <div className="cost-list">
            <table className="Table">
                <tbody>
                {props.itemList.map((el,index) => <tr className="line" key={el.id}>

                    <td className="start">{index +1}.</td>
                    <td>{el.item}</td>
                    <td>({el.comment})</td>
                    <td>{el.date}</td>
                    <td>{el.price}</td>
                </tr>)}

                </tbody>
            </table>

            <div className="result">

             <p className="spends-result"> Всего
                 <span className="spends-span">{props.itemList.reduce((prev, curr) =>  prev + curr.price, 0)}</span>
грн
             </p>
            </div>

        </div>
    )
};

function MSTP(state) {
    return {
        itemList: getItemList(state)
    }
}

export default connect(MSTP)(CostList);





