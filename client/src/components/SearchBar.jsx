import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { getPokeName } from "../actions";
import styles from './styles/SearchBar.module.css'

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getPokeName(name))
        setName('')
    }

    return(
        <div className={styles.searchBar}>
            <input
            type='text'
            value={name}
            placeholder="Search Pokemon..."
            onChange={(e) => handleInputChange(e)}
            />
            <button
            className={styles.button_4}
            type="submit"
            onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}