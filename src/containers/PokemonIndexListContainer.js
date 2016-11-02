import React from 'react';
import SelectItemsPerPageButtons from '../components/SelectItemsPerPageButtons.js';
import PaginationContainer from './PaginationContainer.js';
import PokeList from '../components/PokeList.js';

const PokemonIndexList = ({display, options, selectedValue, allValue, 
	onOptionSelected, listOfPokemon, btnSize, totalPages, activePage, onSelect, toggleModal}) => {

	let style = {
		display: 'none'
	}

	if(display){
		style.display = 'initial'
	}else{
		style.display = 'none'
	}

	return (
		<div style={style}>
			<SelectItemsPerPageButtons 
			options={options}
			selectedValue={selectedValue}
			allValue={allValue}
			onOptionSelected={onOptionSelected}/>

			<PokeList 
			listOfPokemon={listOfPokemon}
			toggleModal={toggleModal}/>

			<PaginationContainer 
			btnSize={btnSize}
			totalPages={totalPages}
			activePage={activePage}
			onSelect={onSelect}/>
		</div>
	)
}

export default PokemonIndexList;