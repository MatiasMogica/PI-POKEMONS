import React from "react";
import { Link } from "react-router-dom";
import styles from './styles/Card.module.css'

export default function Card({name, id, types, attack, image, createdInDb}){

      //const typesDb = types && types.map(t => t.name)
    console.log(types)
    //REVISAR FILTRADO POR TYPE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return(
        <div className={styles.pokeCard}>
        <div>
            <div className={styles.pokeName}>
            <h3>{name.toUpperCase()}</h3>
            </div>
            <div className={styles.pokeAttack}>
            <span>Attack: {attack}</span>
            </div>
            <div className={styles.pokeTypes}>
            <span>Types: {types && types.join(", ")}</span>
            </div> 
            {/* <h4 className="Caption">{typesDb && typesDb.join(', ')}</h4> */}
            <div className={styles.img_cointainer}>
            <Link to={`/pokemonsDetail/${id}`}>
            <img src={image} alt='image not found' width='200px' height='250px'/>
            </Link>
            </div>
        </div>
        </div>
    )
}