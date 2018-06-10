export function listItems(state = {spends:[
    {
     item: 'bread',
     price: "10",
     id: 1
    },
    {
        item: 'milk',
        price: "5",
        id: 2
    },
    {
        item: 'meat',
        price: "40",
        id: 3
    },{
        item: 'fruits',
        price: "30",
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

