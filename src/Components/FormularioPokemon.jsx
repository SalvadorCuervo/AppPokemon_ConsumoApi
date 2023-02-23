import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';

import Error from './Error';

function FormularioPokemon({ pokemons, setPokemons, pokemonSelected, setPokemonSelected }) {
    const [ nombre, setNombre ] = useState( '' );
    const [ imageUrl, setImageUrl ] = useState( '' );
    const [ ataque, setAtaque ] = useState( 0 );
    const [ defensa, setDefensa ] = useState( 0 );
    const [ error, setError ] = useState( false );

    useEffect(() => {
        if( Object.keys(pokemonSelected).length > 0 ) {
            setNombre(pokemonSelected.nombre);
            setImageUrl(pokemonSelected.imageUrl);
            setAtaque(pokemonSelected.ataque);
            setDefensa(pokemonSelected.defensa);
        }
    }, [pokemonSelected]);

    const agregarAxiosApi = ( objetoPokemon ) => {
        axios.post( `https://crud-poke-app.azurewebsites.net/v1/pokemon`, objetoPokemon )
            .then( respuesta => {
                const nuevoObjetoPokemon = respuesta.data.data;
                setPokemons([ ...pokemons, nuevoObjetoPokemon ]);
                reiniciarFormulario();
            })
            .catch( error => { console.log( error ) })
    }

    const editarAxiosApi = (objetoPokemon) => {
        objetoPokemon._id = pokemonSelected._id;
        axios.put( `https://crud-poke-app.azurewebsites.net/v1/pokemon/${objetoPokemon._id}`, objetoPokemon )
            .then( respuesta => {
                const nuevoObjetoPokemon = respuesta.data.data;
                const pokemonsActualizados = pokemons.map( pokemon => pokemon._id === nuevoObjetoPokemon._id ? nuevoObjetoPokemon : pokemon );
                setPokemons(pokemonsActualizados);
                setPokemonSelected({});
                reiniciarFormulario();
            })
            .catch( error => { console.log( error ) })
    }

    const enviar = () => {
        if([ nombre, imageUrl ].includes('') || [ ataque, defensa ].includes(0) ) {
            setError('Completa todos los campos');
            return;
        }else{
            setError(false);
            const objetoPokemon = { nombre, imageUrl, ataque, defensa };

            if(pokemonSelected._id) editarAxiosApi(objetoPokemon);
            else agregarAxiosApi(objetoPokemon);
        }
    }

    const reiniciarFormulario = () => {
        setNombre('')
        setImageUrl('');
        setAtaque(0);
        setDefensa(0);
    }

    return (
        <div className="border p-4">
            <h5 className='text-center'> Nuevo Pokemon </h5>

            <form>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        Nombre: <input type="text" className="form-control" value={nombre} onChange={evt => setNombre(evt.target.value)} id="agregar"/>
                        Imagen: <input type="text" className="form-control" value={imageUrl} onChange={evt => setImageUrl(evt.target.value)}/>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        Ataque: <input type="range" className="form-range" min="0" max="100" step="1" value={ataque} onChange={evt => setAtaque(evt.target.value)}/>
                        Defensa: <input type="range" className="form-range" min="0" max="100" step="1" value={defensa} onChange={evt => setDefensa(evt.target.value)}/>
                    </div>
                </div>
                <div className="mt-3 text-center">
                    { error && <Error mensaje={error}/> }
                    <button type="button" className="btn btn-primary mr-2" onClick={() => enviar()}> <FontAwesomeIcon icon={faFloppyDisk}/> Guardar </button>
                </div>
            </form>
        </div>
    )
}

export default FormularioPokemon;