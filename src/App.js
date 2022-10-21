import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Paginator from "./Paginator";

function App() {
  const [list, setList] = useState(['charmander', 'pikachu'])
  const [loading, setLoading] = useState(true)
  const [currentPageURL, setCurrentPageURL] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageURL, setNextPageURL] = useState('https://pokeapi.co/api/v2/pokemon')
  const [prevPageURL, setPrevPageURL] = useState(null)

  const gotoNext = () => {
    setCurrentPageURL(nextPageURL)
  }
  const gotoPrev = () => {
    setCurrentPageURL(prevPageURL)
  }

  
  useEffect(() => {
    setLoading(true)
    axios.get(currentPageURL)
      .then(res => {
        console.log(res.data)
        setNextPageURL(res.data.next)
        setPrevPageURL(res.data.previous)
        setList(res.data.results.map(el => el.name))
      })
      .catch(err => {
        console.log(err.data)
      })
  
  }, [currentPageURL])

  if(loading) return "loading"

  return (
    <>
    <PokemonList pokemons={list} />
    <Paginator gotoNext={ nextPageURL ? gotoNext : null} gotoPrev={ prevPageURL? gotoPrev: null} />
    </>
  );
}

export default App;
