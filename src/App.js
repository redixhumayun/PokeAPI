import React, { Component } from 'react';
import logo from '../public/Pokeball.svg';
import './App.css';
import 'whatwg-fetch';
import PokemonIndexListContainer from './containers/PokemonIndexListContainer.js';
import PokemonModal from './components/PokemonModal.js';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      pokemon: [], 
      activePage: 1,
      limit: 50, 
      offset: 0, 
      totalPages: 0, 
      count: 0, 
      loaded: false,
      showModal: false, 
      selectedPokemon: null
    };

    this.loadPokemon = this.loadPokemon.bind(this);
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleLimitChange (event) {
    this.setState({
      limit: +event.target.innerHTML || this.state.count
    }, () => {
      this.loadPokemon(`${this.props.baseURL}pokemon?limit=${this.state.limit}&offset=0`);
    })
  }

  loadPokemon(url){
    fetch(url).then(response => {
      return response.json();
    }).then(json => {
      let pages = Math.round(json.count / this.state.limit);
      this.setState({
        pokemon: json.results, 
        totalPages: pages, 
        count: json.count, 
        loaded: true
      });
    }).catch(err => {
      console.log(err);
    });
  }

  componentWillMount () {
    this.loadPokemon(`${this.props.baseURL}pokemon?limit=${this.state.limit}`);
  }

  handlePaginationSelect(selectedPage) {
    let offset = this.state.limit * selectedPage;
    this.loadPokemon(`${this.props.baseURL}pokemon?limit=${this.state.limit}&offset=${offset}`);
    this.setState({
      activePage: selectedPage
    })
  }

  toggleModal(pokemon) {
    this.state.showModal === true ? this.setState({
      showModal: false
    }) : this.setState({
      showModal: true
    })
    if(pokemon.name){
      fetch(`${pokemon.url}`).then(response => {
        return response.json();
      }).then(json => {
        console.log(json);
        this.setState({
          selectedPokemon: json
        })
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pokemon Dashboard</h2>
        </div>

        {this.state.loaded ? null : "Loading..."}
        <div>
          <PokemonIndexListContainer 
            display={this.state.loaded}
            options={[10, 50, 100, 200]}
            selectedValue={this.state.limit}
            allValue={this.state.count}
            onOptionSelected={this.handleLimitChange}
            listOfPokemon={this.state.pokemon}
            bsSize='medium'
            items={this.state.totalPages}
            activePage={this.state.activePage}
            onSelect={this.handlePaginationSelect}
            totalPages={this.state.totalPages}
            toggleModal={this.toggleModal}/>
          </div>

          <PokemonModal toggleModal={this.toggleModal} showModal={this.state.showModal} pokemon={this.state.selectedPokemon}/>
      </div>
    );
  }
}

export default App;
