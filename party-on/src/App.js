import React, { Component } from 'react';
import './App.css';
import rooms from './rooms/Rooms';
import player from './player/Player';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rooms,
      people: [],
      room: rooms[0],
      player: {}
    }

    this.handleExit = this.handleExit.bind(this);
    this.handlePickup = this.handlePickup.bind(this);
  }

  handleExit(room) {
    this.setState({room})
  }

  handlePickup(item) {
    const { room, player } = this.state;
    const index = room.items.indexOf(item);

    if( index > -1 ) room.items.splice(index, 1);
    player.items.push(item);
    this.setState(
      { room, player }
    )
  }

  render() {
    const { player, room } = this.state;

    return (

      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <Room room={room} onExit={this.handleExit} onPickup={this.handlePickup}/>
      </div>
    );
  }
}

function Room({ room, onExit, onPickup }){
  return (
    <div>
      <h2>{room.name}</h2>
      <p>You see: {room.items.map((item, i) => (
        <button key={i} onClick={() => onPickup(item)}>{item}</button>))}
      </p>
      {room.exits.map( (door, i) => {
        return (
          <button key={i} onClick={() => onExit(door)}>
            Door to {door.name}
          </button>)
      })}
    </div>
  )
}

export default App;
