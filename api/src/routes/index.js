const { default: axios } = require('axios');
const { Router } = require('express');
const { getAllPokes } = require('./functions')
const { Pokemon, Type } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async(req, res, next) => {
    try {
    const name = req.query.name
    let pokesTotal = await getAllPokes()
    if(name){
        let pokesName = await pokesTotal.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
        pokesName.length ? 
        res.status(200).send(pokesName) :
        res.status(404).send('The pokemon does not exist')
    }else{
        res.status(200).send(pokesTotal)
    }
    } catch (error) {
        next(error)
    }
    // const name = req.query.name
    // const info = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    // console.log(info.data)
    // if(name){
    //     let pokeName = info.data.forms[0].name === name
    // }
})

router.get('/types', async(req, res, next) => {
    try {
        const typesApi = await axios.get('https://pokeapi.co/api/v2/type')
        const type = typesApi.data.results.map(t => t.name)
        type.forEach(t => {
            Type.findOrCreate({
                where : { name : t}
            })
        });
        const allTypes = await Type.findAll()
        res.status(200).send(allTypes)
    } catch (error) {
        next(error)
    }
})
// REVISAR POST CUANDO HAGA EL FOMRULARIO!!!!!
router.post('/pokemons', async(req, res, next) => {
        const { name,
              life,
              attack,
              defense,
              speed,
              height,
              weight,
              image,
              createdInDb,
            //   CAMBIE TYPE POR TYPES
              types } = req.body
        let newPoke = await Pokemon.create ({
            name,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            image,
            createdInDb
        })
        
        let typeDb = await Type.findAll({
            where:{
                name: types
            }
            //   CAMBIE TYPE POR TYPES
            })
     
        
        
        await newPoke.addType(typeDb)

        let pokeCreated = await Pokemon.findOne({
            where: {name},
            include: {
                model: Type,
                attributes:["name"],
                through: {
                    attributes: [],
                }
            }
        })

        let pokemonCreatedToReturn = [];
    pokemonCreatedToReturn.push(pokeCreated);

    let pokemonToReturn = pokemonCreatedToReturn.map((p) => {
      return {
        name: p.name,
        life: p.life,
        attack: p.attack,
        defense: p.defense,
        speed: p.speed,
        height: p.height,
        weight: p.weight,
        types: p.types?.map((t) => t.name),
        image: p.image,
        createdInDb: p.createdInDb,
      };
    });
    console.log('pokecreado:', pokemonToReturn)
    res.status(201).send({
        msg: `Great! You has created pokemon #${pokemonToReturn[0].id}!!`,
        pokemonToReturn,
      })  
})

router.get('/pokemons/:id', async (req, res, next) => {
    const id = req.params.id
    const allPokes = await getAllPokes()
    if(id){
        const pokeId = await allPokes.filter(p => p.id == id)
        pokeId.length ? 
        res.status(200).json(pokeId) : 
        res.status(404).send('The pokemon was not found')
    }
})

router.delete('/delete/:id', async(req, res, next) => {
    const id = req.params.id
    await Pokemon.destroy({
        where: {
           id: id
        }
    })
    res.status(200).send('Pokemon deleted')
})


module.exports = router;
