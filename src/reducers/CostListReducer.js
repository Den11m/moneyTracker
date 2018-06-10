
export function listItems(state = {spends:[
    {
     item: 'Хліб',
     price: 10,
     comment: 'Свіжий',
     date: "05.06,2018",
     id: 1
    },
    {
        item: 'Молоко',
        price: 5,
        comment: 'Подорожчало',
        date: '05.06,2018',
        id: 2
    },
    {
        item: 'М\'ясо',
        price: 40,
        comment: 'Забагато купив',
        date: '06.06,2018',
        id: 3
    },{
        item: 'Яблука',
        price: 30,
        comment: 'Вчорашні',
        date: '07.06,2018',
        id: 4
    },

]}, action) {
  switch (action.type) {
      case 'GET_LIST':
          return state;
      default:
          return state
  }



}

