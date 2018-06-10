import React from 'react';
import {connect} from 'react-redux';
import {getItemList} from '../../selectors/CostListSelector';
//import getList from '../../actions/CostListAction';
import './index.css';


const CostList = (props) => {
    console.log('must look at props',props.itemList);
    return (
        <div className="cost-list">
            <button> </button>
         <ul className="table-container">
             <ul className="table-container">
             {props.itemList.map((el)=> <li className="table-item" key={el.id}>{el.item}</li>)}
             </ul>
         </ul>
        </div>
    )
};

function MSTP(state) {
    return {
        itemList: getItemList(state)
    }
}


//export default connect(MSTP,MDTP)(Random);

export default connect (MSTP)(CostList);





