import React from 'react';
// import ReactDOM from 'react-dom';

export default function Square(props){
    return (
        <button 
            className="square" 
            value={props.value}
            id={props.index}
            onClick={(event) => props.onClick(event.target.id)}
            style={{ backgroundColor: props.color}}
        >

        </button>
    );
}