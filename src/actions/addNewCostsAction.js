export function addCosts(data){
    return {
        type: 'ADD-COSTS',
        data,
    }
}

export function getFact(data) {
    return {
        type: 'FACT-ADD',
        data,

    }
}

export function deleteCost(id) {
 return {
     type: 'DELETE-COST',
     id,

 }
}

