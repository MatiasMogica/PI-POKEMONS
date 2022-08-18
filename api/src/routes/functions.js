const  axios  = require('axios');
const { Router } = require('express');
const { Pokemon, Type} = require('../db')

const router = Router()

const getApiInfo = async() => {
    try {
    const info = await axios.get('https://pokeapi.co/api/v2/pokemon')
    const info2 = await axios.get(info.data.next)
    const res = info.data.results.concat(info2.data.results)
    const pokes = await Promise.all(res.map(async(obj) => {
        let p = await axios.get(obj.url)
        return {
            id: p.data.id,
            name: p.data.name,
            image: p.data.sprites.other.home.front_default,
            //le puse una s a type y borre del .map(t=> t.type.name)
            types: p.data.types.map(t => t.type.name), 
            life: p.data.stats[0].base_stat,
            attack: p.data.stats[1].base_stat,
            defense: p.data.stats[2].base_stat,
            speed: p.data.stats[5].base_stat,
            height: p.data.height,
            weight: p.data.weight
        }
    }))
    return pokes 
    } catch (error) {
        console.log(error)
    }   
}

const getDbInfo = async() => {
    const data = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
    const pokemons = data.map(p=>{
        return {
          ...p.dataValues,
          types: p.types?.map(t=> t.name)
        }
      })
      return pokemons
   // return data;
}

const getAllPokes = async() => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const allInfo = apiInfo.concat(dbInfo)
    return allInfo
}

module.exports = {
    router,
    getAllPokes
}