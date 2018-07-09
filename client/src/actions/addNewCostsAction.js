export function addCosts(data){
    return {
        type: 'ADD-COSTS',
        data,
    }
}

export function loadCosts(data){
    return {
        type: 'COSTS_LOADED',
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

export function deleteFact(data){
    return {
        type: 'FACT_DELETE',
        data,
    }
}