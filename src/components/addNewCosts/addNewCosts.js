import React, {Component} from 'react';
import health from './icons/health.svg';
import DatePicker from 'react-date-picker';
import addCosts from '../../actions/addNewCostsAction';
import {connect} from 'react-redux';
import moment from 'moment';
import Modale from '../Modale/Modale';
import {click} from '../../selectors/CostListSelector';
import toggleShowWindow from '../../actions/clickAction';
import {v4} from 'uuid';
import './style.css';




class AddNewCosts extends Component {
    // test =  null;
    sumInput = '';
    commentInput = '';
    test = null;

    state = {
        date: new Date(),
        category: [],
    };

    let category =[
        { id: 'health',
            value: 'здоровье' },
        { id: 'food',
            value: 'еда' },
        { id: 'hygiene',
            value: 'гигиена' },
        { id: 'home',
            value: 'жилье' },
        { id: 'clothes',
            value: 'одежда' },
        { id: 'sport',
            value: 'спорт' },
        { id: 'relax',
            value: 'отдых' },
        { id: 'communication',
            value: 'связь' },
        { id: 'transport',
            value: 'транспорт' },
        { id: 'nursling',
            value: 'питомцы' },
        { id: 'present',
            value: 'подарки' },
        { id: 'other',
            value: 'другое' },
    ];


    handleChange = date => this.setState({date});

    render() {
        return (
            <Modale toggleShowWindow={props.toggleShowWindow} click={props.click}>

                <div className='category-container'>
                    <input type='number' placeholder='сумма' className='category--sum' required ref={(inputTag) => sumInput = inputTag}/>
                    <div className='icons-category'ref={(input)=> categories = input}>
                        {category.map(el => <div className='icon-category'>
                            <input type="radio" className='radio' id={el.id} name="contact" value={el.value}/>
                            <label htmlFor={el.id}  className={el.id}></label>
                            <p className='category--text'>{el.value}</p>
                        </div>)}
                    </div>
                    <div className='category__date'>
                        <DatePicker value={date} className='category__calendar' onChange={()=> date = date} locale={'ru'}/>
                    </div>
                    <input type='text' placeholder='комментарий'  className='category--comment' ref={(inputTag) => commentInput = inputTag} />
                    <button className='category--save' onClick={() =>{
                        let category = Array.from(categories.children)
                        category.some(el => el.children[0].checked === true)
                            ?   props.addCosts(
                            { cost: +sumInput.value,
                                date: moment(date).valueOf(),
                                category: category.find(el => el.children[0].checked === true).children[0].value,
                                comments: commentInput.value,
                            })
                            : alert('fill in the category and price');
                        props.toggleShowWindow()}}>coxpанить</button>
                </div>
            </Modale>
        )
    }
}













function MSTP(state) {
    return {
        click: click(state)
    }
}

function MDTP(dispatch) {
    return {
        addCosts: function (data) {
            dispatch(addCosts(data))
        },
        toggleShowWindow: function () {
            dispatch(toggleShowWindow())
        }
    }
}

export default connect(MSTP, MDTP)(AddNewCosts)
