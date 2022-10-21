import React from 'react'

export default function PokemonList({pokemons}) {
  return (
    <div>
      {pokemons.map((el, index)=> (
        <p key={index}>{el}</p>
      ))}
    </div>
  )
}
