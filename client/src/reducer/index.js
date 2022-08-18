const initialState = {
    pokemons: [],
    types: [],
    allPokemons: [],
    details: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'GET_POKE_NAME':
            return {
                ...state,
                pokemons: action.payload
            }
        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload
            }
        case 'POST_POKEMON':
            return {
                ...state
            }
        case 'FILTER_BY_CREATE':
            const pokes = state.allPokemons
            const filteredPokes = action.payload === 'created' ? pokes.filter(p => p.createdInDb) : pokes.filter(p => !p.createdInDb)
            return {
                ...state,
                pokemons: action.payload === 'all' ? pokes : filteredPokes
            }
        case 'FILTER_BY_TYPES':
            const allPokes = state.allPokemons
             //const pokesNoDb = allPokes.filter(p => !p.createdInDb)
             //const pokesDb = allPokes.filter(p => p.createdInDb)
            //  const typesDb = pokesDb
            //  const pokesFiltered = pokesNoDb ? 
            //  pokesNoDb.filter(e => e.types.includes(action.payload)) :
            //  pokesDb.types.filter(p => p.name.includes(action.payload))
            //  console.log('newpokesbd:::', pokesDb)
            const pokesFiltered = action.payload === 'all'? allPokes : 
            allPokes.filter(e => e.types.includes(action.payload)) 
            
            return {
                ...state,
                pokemons: pokesFiltered
            }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc'?
            state.pokemons.sort(function(a, b){
                if(a.name > b.name){
                    return 1
                }
                if(b.name > a.name){
                    return -1
                }
                return 0
            }):
            state.pokemons.sort(function(a, b){
                if(a.name > b.name){
                    return -1
                }
                if(b.name > a.name){
                    return 1
                }
                return 0
            })
            return{
                ...state,
                pokemons: sortedArr
            }
        case 'ORDER_BY_ATTACK':
            let sortedArr2 = action.payload === 'asc'?
            state.pokemons.sort(function(a, b){
                if(a.attack > b.attack){
                    return -1
                }
                if(b.attack > a.attack){
                    return 1
                }
                return 0
            }):
            state.pokemons.sort(function(a, b){
                if(a.attack > b.attack){
                    return 1
                }
                if(b.attack > a.attack){
                    return -1
                }
                return 0
            })
            return{
                ...state,
                pokemons: sortedArr2
            }

        default: 
            return {
                ...state
            }
    }

}

export default rootReducer;