import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDetail } from "../actions";
import styles from './styles/CardDetail.module.css'

export default function CardDetail(){
    const dispatch = useDispatch()
    const details = useSelector((state) => state.details)
    const {id} = useParams()

    useEffect(() => {
        dispatch(getDetail(id))
        // console.log(details)
    }, [dispatch, id])

    return(
        <div  className={styles.pokemonDetail}>
            <div>
            <Link to='/home'>
            <button className={styles.button_32}>Home</button>
            </Link>
            </div>
            <div className={styles.false_background}></div>
            <div className={styles.pokeDetail}>
            {
                details.length > 0 ? 
                <div className={styles.detail_info}>
                    <div className={styles.eachInfo}>
                    <span>{details[0].name.toUpperCase()}</span>
                    </div>
                    {/* BUSCAR IMAGEN PREDETERMINADA!!!!!!!!!! */}
                    <div className={styles.pokemon_image}>
                    <img src = {details[0].image ? details[0].image : 'Image not found' }/> 
                    </div>
                    
                    <div className={styles.eachInfo}>
                        <div>
                        <span>Types: </span>
                        </div>
                        <span>{details[0].types.length === 1 ? details[0].types : details[0].types.join(", ")}</span>
                    </div>
                    <div className={styles.eachInfo}>
                        #ID: {details[0].id}
                    </div>
                    <div className={styles.info_cointainer}>
                   
                    <div className={styles.dimensiones}>
                        <span>Height: {details[0].height}</span>
                        <span>Weight: {details[0].weight}</span>
                    </div>
                    <div className={styles.stats}>
                    <div>
                        <span>Life: {details[0].life}</span>
                        <span>Speed: {details[0].speed}</span>
                    </div>
                    <div>
                        <span>Attack: {details[0].attack}</span>
                        <span>Defense: {details[0].defense}</span>
                    </div>
                   
                    </div>
                  </div>
                </div> : <p>Loading...</p>
            }
            </div>
        </div>
    )
}