import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Card, CardActions, CardContent, CardMedia, Container, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import PokemonCard from '../components/PokemonCard'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate()

  useEffect(()=>{
    getPokemon()
   },[])

  const getPokemon = () =>{
    axios.get(`https://localhost:7281/api/Pokemon/${id}`).then((res)=>{
     setPokemon(res.data)
    }).catch((err) =>{
      console.log(err)
    })
  }

  const saveUpdate = () => {
    if(pokemon.id != null){
      axios.put(`https://localhost:7281/api/Pokemon/${pokemon.id}`, pokemon).then((res)=>{
        navigate("/")
        alert("Atualizado com sucesso!")
      }).catch((err)=>{
        alert("Falha na atualização!")
        console.log(err)
      })
    }else{
      axios.post(`https://localhost:7281/api/Pokemon/`, pokemon).then((res)=>{
        navigate("/")
        alert("Salvo com sucesso!")
      }).catch((err)=>{
        alert("Falha na atualização!")
        console.log(err)
      })
    }
  }

  return (    

    <Grid container justifyContent="center">
      <Grid item>
      <Card sx={{ maxWidth: 345}}>
        <CardMedia
          component="img"
          src={`http://localhost:5173/src/img/${pokemon.name}.jpg`}
          sx={{ height: 250 }}
          title={pokemon.name}
        />
        <CardContent>
          <Box marginBottom={2}display="flex" justifyContent="space-between" alignItems="center">
              <Box marginRight={2}>
                <TextField id='name'
                  label="Nome" 
                  value={pokemon.name || ''}
                  onChange={(e)=> setPokemon({ ...pokemon, name: e.target.value })}
                />
              </Box>
              <Select
                labelId="combo-box-label"
                id="type"
                value={pokemon.type || 0} 
                onChange={(e)=> setPokemon({ ...pokemon, type: parseInt(e.target.value)})}
                label="Tipo"
              >
                <MenuItem value="0">Fogo</MenuItem>
                <MenuItem value="1">Agua</MenuItem>
                <MenuItem value="2">Terra</MenuItem>
                <MenuItem value="3">Ar</MenuItem>
              </Select>
          </Box>
          <TextField 
            id='description' 
            rows={4} 
            label="Descricao"
            fullWidth  
            multiline
            value={pokemon.description || ''}
            onChange={(e)=> setPokemon({ ...pokemon, description: e.target.value })}
          />

        </CardContent>
        <CardActions>
          <Button onClick={()=> navigate("/")} size="small">Voltar</Button>
          <Button onClick={()=> saveUpdate()} size="small">{pokemon.id ? "Atualizar" : "Salvar"}</Button>
        </CardActions>    
      </Card>        
      </Grid>
    </Grid>
  )
}