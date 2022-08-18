import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { filterPokesByTypes, getPokemons, getTypes, orderByName, orderByAttack, filterPokesByCreate } from "../actions";
import { Link } from "react-router-dom"
import  Card  from './Card'
import Paginated from "./Paginated";
import SearchBar from './SearchBar'
import styles from './styles/Home.module.css'

export default function Home(){
const dispatch = useDispatch()
const allpokes = useSelector((state) => state.pokemons)
const allTypes = useSelector((state) => state.types)
const [order, setOrder] = useState('')

const [currentPage, setCurrentPage] = useState(1)
const [pokesPerPage, setPokesPerPage] = useState(12)
const indexOfLastPoke = currentPage * pokesPerPage
const indexOfFirstPoke = indexOfLastPoke - pokesPerPage
const currentPokes = allpokes.slice(indexOfFirstPoke, indexOfLastPoke)

const paginated = (pageNumber) => {
    setCurrentPage(pageNumber)
}


useEffect(() => {
    dispatch(getPokemons())
},[dispatch])

useEffect(() => {
    dispatch(getTypes())
},[dispatch])
 
function handleRefresh(e){
    e.preventDefault()
    dispatch(getPokemons())
}

function handleFilterCreate(e){
    e.preventDefault()
    dispatch(filterPokesByCreate(e.target.value))
}

function handleFilterType(e){
    e.preventDefault()
    dispatch(filterPokesByTypes(e.target.value))
}

function handleOrderByName(e){
    e.preventDefault(e)
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
}

function handleOrderByAttack(e){
    e.preventDefault(e)
    dispatch(orderByAttack(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
}

return(
    <div className="home">
        
        <Link to='/create'><button className={styles.button_5}>Create Pokemon</button></Link>
        <SearchBar/>
        
        <div className={styles.home_cointainer}>
            <div className={styles.filter_father}>
            <select onChange={(e) => handleOrderByName(e)} className={styles.select}>
                <option hidden>Order by name</option>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>
            <select onChange={(e) => handleOrderByAttack(e)} className={styles.select}>
                <option hidden>Order by attack</option>
                <option value='asc'>Max attack</option>
                <option value='desc'>Min attack</option>
            </select>
            <select onChange={(e) => handleFilterCreate(e)} className={styles.select}> 
                {/* MINUTO 52 PRIMER VIDEO DESCARGADO SELE */}
                <option hidden>Filtered by created</option>
                <option value='all'>All</option>
                <option value='api'>Api</option>
                <option value='created'>Created</option>
            </select>
            <select onChange={(e) => handleFilterType(e)} className={styles.select}>
                <option hidden>Filtered by types</option>
                <option value='all'>All</option>
                {
                    allTypes&&allTypes.map(p => {
                        return(
                        <option value={p.name} key={p.id}>{p.name}</option>
                    )})
             // DESPUES VER COMO AGREGARLE UN 'POKEMON NO ENCONTRADO' O ALGO ASI CUANDO NO EXISTE EL TIPO
                }
            </select>
            <button onClick={(e) => handleRefresh(e)} className={styles.button_4}>Refresh</button>
            </div>

            <Paginated
            pokesPerPage = {pokesPerPage}
            allpokes = {allpokes.length}
            paginated = {paginated}
            />
            <div className={styles.pokemon_cointainer}>
            {
                currentPokes?.map(p => {
                    // console.log(p.types)
                    return(
                    <Card key={p.id} id={p.id} name={p.name} attack={p.attack} image={p.image} types={p.types} createdInDb={p.createdInDb} />
                    )
                }) 
            }
            </div>
        </div>


    </div>
) 

} 