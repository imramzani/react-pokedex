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
  
  useEffect( () => {
    // setLoading(true)
    async function fetchAPI (){
      await axios.get(currentPageURL)
      .then(res => {
        console.log(res.data)
        setNextPageURL(res.data.next)
        setPrevPageURL(res.data.previous)
        let newArr = []
        res.data.results.forEach(async (el) => await axios.get(el.url).then(r => newArr.push(r)))
        setList(newArr)
        console.log(newArr)
        console.log(list)
      })
      .catch(err => {
        console.log(err)
      })
    } 
      fetchAPI()
      console.log(currentPageURL)
  }, [currentPageURL])

  if(loading) return "loading...."

  return (
    <>
    <PokemonList pokemons={list} />
    <Paginator gotoNext={ nextPageURL ? gotoNext : null} gotoPrev={ prevPageURL? gotoPrev: null} />
    </>
  );
}

export default App;
