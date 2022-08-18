import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, postPokemon } from "../actions";
import styles from './styles/PokemonCreate.module.css'


function validate(input){
    var errors = {};
    let urlValidator = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
    if(!input.name) errors.name = 'Name cannot be null'
    else if (!input.life || input.life < 0 || input.life > 255)
    errors.life = 'Life must be between 1 and 255'
    else if (!input.attack || input.attack < 5 || input.attack > 210)
    errors.attack = 'Attack must be between 5 and 210'
    else if (!input.defense || input.defense < 5 || input.defense > 230)
    errors.defense = 'Defense must be between 5 and 230'
    else if (!input.speed || input.speed < 5 || input.speed > 116)
    errors.speed = 'Speed must be between 5 and 116'
    else if (!input.height || input.height < 10 || input.height > 100)
    errors.height = 'Height must be between 10 and 100'
    else if (!input.weight || input.weight < 1 || input.weight > 500)
    errors.weight = 'Weight must be between 1 and 500'
    else if (!input.image || urlValidator.test(input.image) == false) 
    errors.image = 'Image cannot be null or incorrect (png, gif, jpg)'

    return errors
}

export default function PokemonCreate(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allTypes = useSelector((state) => state.types)
    const [errors, setErrors] = useState({})
    const [selectedTypes, setSelectedTypes] = useState([])

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    const [input, setInput] = useState({
        name: '',
        life: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        // CAMBIE TYPE POR TYPES
        types: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validate({
              ...input,
              [e.target.name]: e.target.value,
            })
        )
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
        setSelectedTypes([...selectedTypes, e.target.value])
    }

    function handleClearTypes(et){
        
        setInput({
            ...input,
             types: input.types.filter(t => t != et)
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        // CAMBIE TYPE POR TYPES
        if (input.types.length) {
            dispatch(postPokemon(input))
            alert('Pokemon successfully created')
            setInput({
                name: '',
                life: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                image: '',
                // CAMBIE TYPE POR TYPES
                types: []
            })
            navigate('/home')    
        } else {
            alert('Please select almost one type')
        }
    }

    return(
        <div className={styles.cointanier}>
            <div className={styles.false_nav}>
                <div>
                   <Link to='/home'><button className={styles.button_32}>Home</button></Link>
                </div>
                <div className={styles.titulo}>
                   <h1>Create your Pokemon!</h1>
                </div>
            </div>
            <div className={styles.form}>
            <form className={styles.inside_form}>
                <div className={styles.eachInput}>
                    <label>Name:</label>
                    <input
                    type='text'
                    value={input.name}
                    name= 'name' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className={styles.msgErrors}>{errors.name}</p>
                    )}
                </div>
                <div className={styles.eachInput}>
                    <label>Life:</label>
                    <input
                    type='text'
                    value={input.life}
                    name= 'life' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.life && (
                        <p className={styles.msgErrors}>{errors.life}</p>
                    )}
                </div>
                <div className={styles.eachInput}>
                    <label>Attack:</label>
                    <input
                    type='text'
                    value={input.attack}
                    name= 'attack' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.attack && (
                        <p className={styles.msgErrors}>{errors.attack}</p>
                    )}
                </div>
                <div className={styles.eachInput}>
                    <label>Defense:</label>
                    <input
                    type='text'
                    value={input.defense}
                    name= 'defense' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.defense && (
                        <p className={styles.msgErrors}>{errors.defense}</p>
                    )}
                </div>
                <div className={styles.eachInput}>
                    <label>Speed:</label>
                    <input
                    type='text'
                    value={input.speed}
                    name= 'speed' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.speed && (
                        <p className={styles.msgErrors}>{errors.speed}</p>
                    )}
                </div>
                <div className={styles.eachInput}>
                    <label>Height:</label>
                    <input
                    type='text'
                    value={input.height}
                    name= 'height' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.height && (
                        <p className={styles.msgErrors}>{errors.height}</p>
                    )}
                </div>
                <div className={styles.eachInput}>
                    <label>Weight:</label>
                    <input
                    type='text'
                    value={input.weight}
                    name= 'weight'
                    onChange={(e) => handleChange(e)} 
                    />
                    {errors.weight && (
                        <p className={styles.msgErrors}>{errors.weight}</p>
                    )}
                </div>
                <div className={styles.eachInput}>
                    {/* MIN 41 VIDEO JUEVES EXPLICA COMO PONER IMG POR DEFAULT */}
                    <label>Image:</label> 
                    <input
                    type='text'
                    value={input.image}
                    name= 'image' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.image && (
                        <p className={styles.msgErrors}>{errors.image}</p>
                    )}
                </div>
                <div className={styles.eachInput}>
                
                    <label>Type:</label>
                    <select onChange={(e) => handleSelect(e)}>
                    <option hidden>Types</option>
                    <option value='all'>All</option>
                    {
                       allTypes&&allTypes.map(p => {
                           return(
                           <option value={p.name} key={p.id}>{p.name}</option>
                        )})
                    }
                    </select>
                    {/* CAMBIE TYPE POR TYPES */}
                    <div className={styles.eachInputType}>
                    {input.types.map(et => 
                       <div> 
                        <p>{et}</p>
                        <button onClick={() => handleClearTypes(et)}>x</button>
                        </div>)}
                    {/* VER VIDEO DEL VIERNES MIN 7 PARA BORRAR DE A UNO */}
                    {/* {selectedTypes.length? <button onClick={(e) => handleClearTypes(e)} className={styles.buttons}>x</button> : <button hidden='true'>x</button>} */}
                    </div>
                
                </div>

                {/* {!Object.keys(errors).length ? (
                ""
              ) : (
                <div>
                  <div>
                    {errors.name && <p>{errors.name}</p>}
                    {errors.life && <p>{errors.life}</p>}
                    {errors.attack && <p>{errors.attack}</p>}
                    {errors.defense && <p>{errors.defense}</p>}
                    {errors.speed && <p>{errors.speed}</p>}
                    {errors.height && <p>{errors.height}</p>}
                    {errors.weight && <p>{errors.weight}</p>}
                    {errors.image && <p>{errors.image}</p>}
                  </div>
                </div>
              )} */}
           {/* CAMBIE TYPE POR TYPES */}
              {
                !Object.keys(errors).length && input.name.length && input.types.length ?
                (<button type="submit" className={styles.button_4} onClick={(e) => handleSubmit(e)}>Create Pokemon</button>) :
                (<button hidden='true'>Create Pokemon</button>)
              } 
            </form>
            </div>
        </div>
    )

    
}


