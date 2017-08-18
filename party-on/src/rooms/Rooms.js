const frontYard = {
    name: 'Front Yard',
    description: '',
    exits: [ 'Garage', 'Living Room' ],
    people: [],
    items: []
};

const backYard = {
    name: 'Back Yard',
    description: '',
    exits: [ 'Living Room' ],
    people: [],
    items: [ 'table' ]
};

const livingRoom = {
    name: 'Living Room',
    description: '',
    exits: [ 'Kitchen', 'Bathroom', 'Front Yard', 'Back Yard' ],
    people: [],
    items: []
};

const kitchen = {
    name: 'Kitchen',
    description: '',
    exits: [ 'Living Room', 'Garage' ],
    people: [],
    items: [ 'solo cups' ]
};

const garage = {
    name: 'Garage',
    description: '',
    exits: [ 'Kitchen', 'Front Yard' ],
    people: [ 'Bros', 'Tanner' ],
    items: [ 'keg' ]
};

const bathroom = {
    name: 'Bathroom',
    description: '',
    exits: [ 'Living Room' ],
    people: [ 'Sally' ],
    items: [ 'ping pong ball' ]
};

const rooms = [ bathroom, garage, kitchen, livingRoom, frontYard, backYard ];

rooms.forEach(room => {
    room.exits = room.exits.map( exit => {
        return rooms.find( r => r.name = exit );
    });
});

export default rooms;