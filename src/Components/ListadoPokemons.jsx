import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

import Pokemon from './Pokemon';
import Spinner from './Spinner';

function ListadoPokemons({ pokemons, setPokemons, setPokemonSelected }) {

    const eliminarPokemon = ( id ) => {
        axios.delete( `https://crud-poke-app.azurewebsites.net/v1/pokemon/${id}` )
            .then( respuesta => {
                const pokemonsActualizados = pokemons.filter( pokemon => pokemon._id !== id );
                setPokemons(pokemonsActualizados);
            })
            .catch( error => { console.log( error ) })
    }

    const nuevo = () => {
        const elemento = document.getElementById("agregar");
        elemento.focus();
    }

    return (
        <React.Fragment>
            <h5> Listado de Pokemon </h5>
            <div className="row">
                <div className="col-md-6 col-sm-6 col-6">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <FontAwesomeIcon icon={faSearch}/>
                        </span>
                        <input type="text" className="form-control" placeholder="Buscar..."/>
                    </div>
                </div>

                <div className="col-md-6 col-sm-6 col-6">
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-6">
                            <button type="button" className="btn btn-primary"> <FontAwesomeIcon icon={faSearch}/> </button>
                        </div>
                        <div className="col-md-6 col-sm-6 col-6 text-end">
                            <button type="button" className="btn btn-primary" onClick={() => nuevo()}> <FontAwesomeIcon icon={faPlus}/> Nuevo </button>
                        </div>
                    </div>
                </div>
            </div>

            { pokemons ?
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center"> Nombre </th>
                            <th scope="col" className="text-center"> Imagen </th>
                            <th scope="col" className="text-center"> Ataque </th>
                            <th scope="col" className="text-center"> Defensa </th>
                            <th scope="col" className="text-center"> Accione </th>
                        </tr>
                    </thead>

                    <tbody>
                        { pokemons.map( pokemon => (
                            <Pokemon
                                key={pokemon._id}
                                pokemon={pokemon}
                                setPokemonSelected={setPokemonSelected}
                                eliminarPokemon={eliminarPokemon}
                            />
                        ))}
                    </tbody>
                </table>
                : <Spinner />
            }
        </React.Fragment>
    )
}

export default ListadoPokemons;