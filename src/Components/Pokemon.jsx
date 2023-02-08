import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Pokemon({ pokemon, setPokemonSelected, eliminarPokemon }) {
    return (
        <tr>
            <th scope="row"> {pokemon.nombre} </th>
            <td> {pokemon.imageUrl} </td>
            <td> {pokemon.ataque} </td>
            <td> {pokemon.defensa} </td>
            <td>
                <div className="row text-center">
                    <div className="col-md-6 col-sm-6 col-6">
                        <button type="button" className="btn btn-light btn-sm" onClick={() => setPokemonSelected(pokemon)}>
                            <FontAwesomeIcon icon={faEdit}/>
                        </button>
                    </div>
                    <div className="col-md-6 col-sm-6 col-6">
                        <button type="button" className="btn btn-light btn-sm" onClick={() => eliminarPokemon(pokemon._id)}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default Pokemon;