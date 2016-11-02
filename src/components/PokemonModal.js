import React from 'react';
import {Modal, Button} from 'react-bootstrap/lib/';
import PokemonInfo from '../components/PokemonInfo.js';

const PokemonModal = ({toggleModal, showModal, pokemon}) => {
	return (
		<div>
	        <div className="modal-container" style={{height: 200}}>
		        <Modal
		          show={showModal}
		          onHide={toggleModal}>
		          <Modal.Header closeButton>
		            <Modal.Title id="contained-modal-title">{pokemon !== null ? pokemon.name : 'Loading...'}</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	{pokemon !== null ? <PokemonInfo pokemon={pokemon} />
		          	: null}
		          </Modal.Body>
		          <Modal.Footer>
		            <Button onClick={toggleModal}>Close</Button>
		          </Modal.Footer>
		        </Modal>
	      	</div>
		</div>
	)
}

export default PokemonModal;