import { Box, Grid } from '@mui/material'
import Navbar from '../components/Navbar/'
import PokemonCard from '../components/PokemonCard'
import Container from '@mui/material/Container'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {

  const [pokemons, setPokemons] = useState([])

  useEffect(()=>{
   getPokemons()
  },[])

  const getPokemons = () =>{
    axios.get("https://localhost:7281/api/Pokemon").then((res)=>{
      setPokemons(res.data)
    }).catch((err) =>{
      console.log(err)
    })
  }

  const pokemonFilter = (name) => {
    var pokemonsFiltered = []

    name = name.toLowerCase()

    if(name ===""){
      getPokemons()
    }
    for (var i in pokemons){
    console.log(name)
      if(pokemons[i].name.toLowerCase().includes(name)){
        pokemonsFiltered.push(pokemons[i])
      }
    }

    setPokemons(pokemonsFiltered)
  }

  return (
    <div>
        <Navbar pokemonFilter={pokemonFilter} />
        <Container maxWidth='xl'>
          <Grid container spacing={2}>
            {pokemons.map((pokemon) =>(
              <Grid item xs={12} sm={6} md={2} key={pokemon.id}>
                <PokemonCard pokemon={pokemon} />
              </Grid>
            ))}
          </Grid>
        </Container>
    </div>
  )
}

