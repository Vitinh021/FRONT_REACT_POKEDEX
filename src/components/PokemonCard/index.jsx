import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function PokemonCard({pokemon}) {

  const navigate = useNavigate()

  const remove = () =>{
    axios.delete(`https://localhost:7281/api/Pokemon/${pokemon.id}`).then((res)=>{
      navigate("/")
      alert("Removido com sucesso!")
    }).catch((err)=>{
      alert("Falha ao remover!")
      console.log(err)
    })    
  }

  const typeMapping = {0: "Fogo", 1: "Água", 2: "Terra", 3: "Ar"}; 

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        src={`http://localhost:5173/src/img/${pokemon.name.toLowerCase()}.jpg`}
        sx={{ height: 250 }}
        title={pokemon.name}
        alt='Foto do pokemon'
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            {pokemon.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {typeMapping[pokemon.type]}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.primary">
          {pokemon.description}
        </Typography>        

      </CardContent>
      <CardActions>
        <Button onClick={()=> remove()} size="small">Apagar</Button>
        <Button onClick={()=> navigate(`/profile/${pokemon.id}`)} size="small">Editar</Button>
      </CardActions>    
    </Card>
  );
}