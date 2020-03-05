import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';



function App(){
  const [pokemon, setPokemon] = useState([]);
  const [details, setDetails] = useState(null);

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  
  useEffect(()=>{

    fetch("https://pokeapi.co/api/v2/pokemon/?limit=151").then(response => response.json()).
    then(data => {console.log(data);
    setPokemon(data.results)});


  },[]);
  useEffect(()=>{

    fetch("https://pokeapi.co/api/v2/pokemon/" + selectedPokemon).then(response => response.json()).
    then(data => {console.log(data);
      setDetails(data);
    });


  },[selectedPokemon]);
  
  return (
      <div className="App">
        <div className="pokedex">
          <ul className="pokedex-list">
          {pokemon.map(obj => <li  key ={obj.name}> <button className={obj.name === selectedPokemon? "active": ""} onClick = {() => setSelectedPokemon(obj.name)} >000 {obj.name}</button></li>)}
          </ul>
          <Image src={details != null ? details.sprites.front_default : ""}/>
          <Details selectedPokemon = {selectedPokemon} />
        </div>
      </div>
    );

  
}

function Details(props){
  const [description, setDescription] = useState("");
  useEffect(()=>{

    fetch("https://pokeapi.co/api/v2/pokemon-species/"+props.selectedPokemon).then(response => response.json()).
    then(data => {console.log(data); 
      setDescription(data.flavor_text_entries[1].flavor_text)});


  },[props.selectedPokemon]);
  return <div className="pokedex-summary">
    {description}
  </div>
}


function Image(props){

  if(!props.src){
    return null;
  }
  return <div className = "pokedex-image">
  <img src= {props.src}/>
  </div>

}


export default App;
