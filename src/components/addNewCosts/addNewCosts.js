import React from 'react';
import health from './icons/health.svg';
import DatePicker from 'react-date-picker';
import addCosts from '../../actions/addNewCostsAction';
import {connect} from 'react-redux';
import moment from 'moment';
import './style.css';

const AddNewCosts = (props) => {
  
let sumInput = '',
    // calendarInput = '',
    commentInput = '';
    let date = new Date();
    console.log(date);
    let test;
    console.log(test);



    return (
        <div className='category-container'>
            <input type='number' placeholder='сумма' className='category--sum' ref={(inputTag) => sumInput = inputTag}/>
            <div className='icons-category'ref={(input)=> test = input}>
                <div className='icon-category'>
                <input type="radio" className='radio' id="health" name="contact" value="здоровье"/>
                <label for='health'  className='health' data-category='здоровье'>
                </label>
                <p className='category--text'>здоровье</p>
                </div>
                <div className='icon-category'>
                <input type="radio" className='radio' id="food" name="contact" value="еда"/>
                <label for='food'  className='food' data-category='еда'>
                </label>
                <p className='category--text'>еда</p>
                </div>
                <div className='icon-category'>
                <input type="radio" className='radio' id="hygiene" name="contact" value="гигиена"/>
                <label for='hygiene'  className='hygiene' data-category='гигиена'>
                </label>
                <p className='category--text'>гигиена</p>
                </div>
                <div className='icon-category'>
                <input type="radio" className='radio' id="home" name="contact" value="жилье"/>
                <label for='home'  className='home' data-category='жилье'>
                </label>
                <p className='category--text'>жилье</p>
                </div>
                <div className='icon-category'>
                <input type="radio" className='radio' id="clothes" name="contact" value="одежда"/>
                <label for='clothes'  className='clothes' data-category='одежда'>
                </label>
                <p className='category--text'>одежда</p>
                </div>
                <div className='icon-category'>
                <input type="radio" className='radio' id="sport" name="contact" value="спорт"/>
                <label for='sport'  className='sport' data-category='спорт'>
                </label>
                <p className='category--text'>спорт</p>
                </div>
                <div className='icon-category'>
                <input type="radio" className='radio' id="relax" name="contact" value="отдых"/>
                <label for='relax'  className='relax' data-category='отдых'>
                </label>
                <p className='category--text'>отдых</p>
                </div>
                <div className='icon-category'>
                <input type="radio" className='radio' id="communication" name="contact" value="связь"/>
                <label for='communication'  className='communication' data-category='связь'>
                </label>
                <p className='category--text'>связь</p>
                </div>
                <div className='icon-category'>
                <input type="radio" className='radio' id="transport" name="contact" value="транспорт"/>
                <label for='transport'  className='transport' data-category='транспорт'>
                </label>
                <p className='category--text'>транспорт</p>
                </div>
                <div className='icon-category'>
                <input type="radio" className='radio' id="nursling" name="contact" value="питомцы"/>
                <label for='nursling'  className='nursling' data-category='питомцы'>
                </label>
                <p className='category--text'>питомцы</p>
                </div>
                <div className='icon-category'>
                <input type="radio" className='radio' id="present" name="contact" value="подарки"/>
                <label for='present'  className='present' data-category='подарки'>
                </label>
                <p className='category--text'>подарки</p>
                </div>
                <div className='icon-category'>
                <input type="radio" className='radio' id="other" name="contact" value="другое"/>
                <label for='other'  className='other' data-category='другое'>
                </label>
                <p className='category--text'>другое</p>
                </div>
            </div>
            <div className='category__date'>
                <DatePicker value={date} className='category__calendar' onChange={()=> date = date} locale={'ru'}/>
            </div>
            <input type='text' placeholder='комментарий'  className='category--comment' ref={(inputTag) => commentInput = inputTag} />
            <button className='category--save' onClick={() =>{
            props.addCosts({ cost: +sumInput.value,
            date: moment(date).valueOf(),
            category: Array.from(test.children).find(el => el.children[0].checked === true).children[0].value,
            comments: commentInput.value,})
            // console.log('click',Array.from(test.children).find(el => el.children[0].checked === true).children[0].value)
            }}>coxpанить</button>
        </div> 

    )
}
function MDTP(dispatch){
    return {
        addCosts: function(data){
            dispatch(addCosts(data))
        }
    }
}
export default connect(null, MDTP)(AddNewCosts)