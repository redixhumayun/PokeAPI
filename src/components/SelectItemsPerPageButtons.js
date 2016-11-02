import React from 'react';
import {Button, Col} from 'react-bootstrap/lib';
import style from '../style/style.js';

const SelectItemsPerPageButtons = ({options, onOptionSelected, selectedValue, allValue}) => {
	return (
		<div style={style.spaceTop}>
			<Col sm={12}>
				{options.map((option) => {
					return <Button 
					key={option} 
					onClick={onOptionSelected} 
					bsStyle={selectedValue === option ? 'primary' : 'default'}>
					{option}</Button>
				})}
				{allValue ? <Button key={allValue} onClick={onOptionSelected} 
				bsStyle={selectedValue === allValue ? 'primary' : 'default'}>All</Button> : false}
			</Col>
		</div>
	)
}

export default SelectItemsPerPageButtons;