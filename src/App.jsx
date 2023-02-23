import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ListadoPokemons from './Components/ListadoPokemons';
import FormularioPokemon from './Components/FormularioPokemon';

import './App.css';

function App() {
    const [ pokemons, setPokemons ] = useState( null );
    const [ pokemonSelected, setPokemonSelected ] = useState( {} );

    useEffect(() => {
        axiosApi();
    }, []);

    const axiosApi = () => {
        axios.get( `https://crud-poke-app.azurewebsites.net/v1/pokemon` )
            .then( respuesta => {
                setPokemons( respuesta.data.data );
            })
            .catch( error => { console.log( error ) })
    }

    return (
        <div className="app">
            <div className="card">
                <div className="container">
                    <ListadoPokemons
                        pokemons={pokemons}
                        setPokemons={setPokemons}
                        setPokemonSelected={setPokemonSelected}
                    />
                        
                    <FormularioPokemon
                        pokemons={pokemons}
                        setPokemons={setPokemons}
                        pokemonSelected={pokemonSelected}
                        setPokemonSelected={setPokemonSelected}
                    />
                </div>
            </div>
        </div>
    )
}

export default App;