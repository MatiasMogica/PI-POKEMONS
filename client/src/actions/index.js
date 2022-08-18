import axios from "axios";

export function getPokemons(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/pokemons')
        
        return dispatch({
        type: 'GET_POKEMONS',
        payload: json.data    
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        })
    }
}

export function postPokemon(payload){
    return async function(){
        const resp = await axios.post('http://localhost:3001/pokemons', payload)
        console.log(resp)
        return resp
    }
}

export function getPokeName(name){
    return async function(dispatch){
        let json = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        return dispatch({
            type: 'GET_POKE_NAME',
            payload: json.data
        })
    }
}

export function getDetail(id){
    return async function(dispatch){
        let json = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({
            type: 'GET_DETAILS',
            payload: json.data
        })
    }
}

export function filterPokesByCreate(payload){
    return({
        type: 'FILTER_BY_CREATE',
        payload
    })
}

export function filterPokesByTypes(payload){
    return({
        type: 'FILTER_BY_TYPES',
        payload
    })
}

export function orderByName(payload){
    return({
        type: 'ORDER_BY_NAME',
        payload
    })
}

export function orderByAttack(payload){
    return({
        type: 'ORDER_BY_ATTACK',
        payload
    })
}