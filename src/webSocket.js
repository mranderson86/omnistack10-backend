const socketio = require('socket.io');

const calculateDistance = require('./utils/calculateDistance');

const parseStringAsArray = require('./utils/parseStringAsArray');

const connections = [];

let io;

// configura o servidor para ouvir requisições via socket.io
exports.setupWebSocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        // Recebe informações do frontend
        const { latitude, longitude, techs } = socket.handshake.query;

        //console.log('server ',latitude, longitude, techs);
        //console.log('server ',socket.id);

        //setTimeout(() => {
        //socket.emit('message','Hello OmniStack');
        //}, 3000); 

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
        
    });

};

exports.findConnections = (coordinates , techs) => {
    return connections.filter(connection => {
        //console.log(techs , connection.techs);
        return calculateDistance(coordinates,connection.coordinates) < 10 &&
        connection.techs.some(item => techs.includes(item))
    });
};

exports.sendMessage = (to , message , data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data)
    })

};