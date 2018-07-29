import React, {Component} from 'react';
import DatePicker from 'react-date-picker';
import {addCosts, getFact} from '../../actions/addNewCostsAction';
import {connect} from 'react-redux';
import moment from 'moment';
import Modale from '../Modale/Modale';
import {click} from '../../selectors/CostListSelector';
import toggleShowWindow from '../../actions/clickAction';
import {addCostForBudget} from '../../actions/budgetAction';
import v4 from 'uuid/v4';
import './style.css';


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
        categoryIndex: null
    };

    selectCategory = (index) => {
        this.setState({
            categoryIndex: index
        });
    };

    fetchPostCost = (event) => {
        event.preventDefault();
        const categoriesArr = Array.from(this.categories.children);
        const condition = categoriesArr.some(el => el.children[0].checked === true);
        if (!condition) {
            alert('fill in the category and price');
            return
        }
        fetch(`/costs`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            }),
            body: JSON.stringify({
                cost: +this.sumInput.value,
                date: moment(this.state.date).valueOf(),
                category: category[this.state.categoryIndex].id,
                comments: this.commentInput.value,
            })
        })
            .then(response => {
                if (response.ok || response.status === 401) {
                    return response.json();
                }
            })
            .then(data => {
                console.log(data)
                // console.log('THIS!!',this)
                this.props.addCosts(data.cost);
                this.props.getFact(data.cost.cost);
                this.props.addCostForBudget(data.cost);
                // console.log('MESSAGE: DATA was post', data.cost);
            })
            .catch(err => {
                console.log(err)
            })
        this.props.toggleShowWindow();
    };

    // submitHandler = (event) => {
    //     event.preventDefault();
    //     let category = Array.from(this.categories.children);
    //     category.some(el => el.children[0].checked === true)
    //         ? this.props.addCosts(
    //         {
    //             cost: +this.sumInput.value,
    //             date: moment(this.state.date).valueOf(),
    //             category: category.find(el => el.children[0].checked === true).children[0].value,
    //             comments: this.commentInput.value,
    //         })
    //         : alert('fill in the category and price');
    //     this.props.toggleShowWindow()
    // }

    handleChange = date => this.setState({date});

    componentDidMount() {
        this.setState({
            date: new Date(),
        })
    }

    render() {
        return (
            <Modale toggleShowWindow={this.props.toggleShowWindow} click={this.props.click}>

                <form className='category-container'
                      onSubmit={this.fetchPostCost}>
                    <h3 className="enter-cost">Новые расходы</h3>
                    <div className="input-cost">
                        {/*<img className="icon_cost" src="/plus.png" alt=""/>*/}
                        <input type='number' placeholder='сумма' className='category--sum' required
                           ref={inputTag => this.sumInput = inputTag}/>
                    </div>
                    <div className='icons-category'
                         ref={el=> this.categories = el}>
                        {category.map((el, index) => <div key={index}
                                                          className='icon-category'
                                                          onClick={this.selectCategory.bind(this, index)}>
                            <input type="radio"
                                   className='radio'
                                   id={el.id}
                                   name="contact"
                                   value={el.value}
                                   checked={this.state.categoryIndex === index}/>
                            <label htmlFor={el.id}
                                   className={el.id}> </label>
                            <p className='category--text'>{el.value}</p>
                        </div>)}
                    </div>
                    <div className='category__date'>
                        <DatePicker value={this.state.date}
                                    className='category__calendar'
                                    onChange={this.handleChange}
                                    locale={'ru'}/>
                    </div>
                    <input type='text'
                           placeholder='комментарий'
                           className='category--comment'
                           ref={(inputTag) => this.commentInput = inputTag}/>
                    <button className='category--save'>
                        сoxpанить
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
        },
        addCostForBudget: function (data) {
            dispatch(addCostForBudget(data))
        }
    }
}

export default connect(MSTP, MDTP)(AddNewCosts)
