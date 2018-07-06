import React, {Component} from 'react';
import DatePicker from 'react-date-picker';
import {addCosts, getFact} from '../../actions/addNewCostsAction';
import {connect} from 'react-redux';
import moment from 'moment';
import Modale from '../Modale/Modale';
import {click} from '../../selectors/CostListSelector';
import toggleShowWindow from '../../actions/clickAction';
import v4 from 'uuid/v4';
import './style.css';
import {serverConfig} from '../../config/index';

const {protocol, host, port}=serverConfig;


let category = [
    {
        id: 'health',
        value: 'здоровье'
    },
    {
        id: 'food',
        value: 'еда'
    },
    {
        id: 'hygiene',
        value: 'гигиена'
    },
    {
        id: 'home',
        value: 'жилье'
    },
    {
        id: 'clothes',
        value: 'одежда'
    },
    {
        id: 'sport',
        value: 'спорт'
    },
    {
        id: 'relax',
        value: 'отдых'
    },
    {
        id: 'communication',
        value: 'связь'
    },
    {
        id: 'transport',
        value: 'транспорт'
    },
    {
        id: 'nursling',
        value: 'питомцы'
    },
    {
        id: 'present',
        value: 'подарки'
    },
    {
        id: 'other',
        value: 'другое'
    },
];

class AddNewCosts extends Component {
    sumInput = '';
    commentInput = '';
    categories = null;
    id = v4();

    state = {
        date: new Date(),

    };

    handleChange = date => this.setState({date});

    componentDidMount() {
        this.setState({
            date: new Date(),
        })
    }

    render() {
        return (
            <Modale toggleShowWindow={this.props.toggleShowWindow} click={this.props.click}>

                <form onSubmit={(event) => {
                    event.preventDefault();
                    let category = Array.from(this.categories.children);
                    category.some(el => el.children[0].checked === true)
                        ? this.props.addCosts(
                        {
                            cost: +this.sumInput.value,
                            date: moment(this.state.date).valueOf(),
                            category: category.find(el => el.children[0].checked === true).children[0].value,
                            comments: this.commentInput.value,

                        })
                        : alert('fill in the category and price');
                    this.props.toggleShowWindow()
                }} className='category-container'>
                    <input type='number' placeholder='сумма' className='category--sum' required
                           ref={(inputTag) => this.sumInput = inputTag}/>
                    <div className='icons-category' ref={(input) => this.categories = input}>
                        {category.map((el, index) => <div key={index} className='icon-category'>
                            <input type="radio" className='radio' id={el.id} name="contact" value={el.value}/>
                            <label htmlFor={el.id} className={el.id}> </label>
                            <p className='category--text'>{el.value}</p>
                        </div>)}
                    </div>
                    <div className='category__date'>
                        <DatePicker value={this.state.date} className='category__calendar' onChange={this.handleChange}
                                    locale={'ru'}/>
                    </div>
                    <input type='text' placeholder='комментарий' className='category--comment'
                           ref={(inputTag) => this.commentInput = inputTag}/>
                    <button className='category--save' onClick={(event) => {
                        event.preventDefault();
                        this.handleChange();
                        let category = Array.from(this.categories.children);
                        category.some(el => el.children[0].checked === true) && this.state.date !== null && +this.sumInput.value > 0
                               ? fetch(`${protocol}://${host}:${port}/costs`, {
                                   method: 'POST',
                                   headers: new Headers({
                                    "Content-Type":"application/json",
                                    "Authorization": localStorage.getItem('token')
                                }),
                                   body:JSON.stringify({
                                    cost: +this.sumInput.value,
                                    date: moment(this.state.date).valueOf(),
                                    category: category.find(el => el.children[0].checked === true).children[0].value,
                                    comments: this.commentInput.value,
                                })                                 
                               })
                               .then(response => {
                                if(response.ok || response.status === 401){
                                    return response.json();
                                } 
                            })
                               .then(data => {
                                this.props.addCosts(data.cost)
                                console.log('MESSAGE: DATA was post', data.cost);
                            })
                            .catch(err => {
                                console.log(err)
                            })

                            // ? this.props.addCosts(
                            // {
                            //     cost: +this.sumInput.value,
                            //     date: moment(this.state.date).valueOf(),
                            //     category: category.find(el => el.children[0].checked === true).children[0].value,
                            //     comments: this.commentInput.value,
                            // })
                            : alert('fill in the category or date');
                        this.props.toggleShowWindow();
                        this.props.getFact(+this.sumInput.value);
                    }}>coxpанить
                    </button>
                </form>
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
        },
        getFact: function (data) {
            dispatch(getFact(data))
        }
    }
}

export default connect(MSTP, MDTP)(AddNewCosts)
