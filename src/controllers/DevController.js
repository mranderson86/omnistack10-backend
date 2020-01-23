const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {  findConnections, sendMessage } = require('../webSocket');

module.exports = {
    // devolve a lista de devs
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {

        const { github_username, techs, latitude, longitude } = request.body;

        // Consulta se o usuário já está cadastrado no banco de dados
        let dev = await Dev.findOne({github_username});

        // Evita cadastro duplicado
        if(!dev) {
            // resultado da consulta na api do github
            const result = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url , bio  } = result.data;

            // lista de tecnologias do desenvolvedor
            const techsArray = parseStringAsArray(techs);

            // localização do desenvolvedor
            const location = {
                type: 'Point',
                coordinates: [ longitude, latitude ],
            }

            // Inserindo dados dentro da tabela Devs no mongodb
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });


            // Filtrar as conexões que estão dentro de um raio de 10 km
            // E que o novo dev tenha algumas das tecnologias filtradas
            // Avisa ao front-end web / mobile que um novo dev foi incluido no cadastro
            const sendSocketMessageTo = findConnections(
                { latitude, longitude } ,
                techsArray,
            );

            // Envia mensagem para o front-end 
            sendMessage(sendSocketMessageTo,'new-dev', dev);
        }

        return response.json(dev);
    },

    // update
    async update (request , response) {
        const { github_username, techs, latitude, longitude } = request.body;

        const location = {
            type: 'Point',
            coordinates: [ longitude, latitude ],
        }

        Dev.updateOne({github_username: github_username}, 
            { techs, location },
            (err,res) => {
                if(err){
                    console.log(err);
                }
            }
        );

        const devs = await Dev.find();

        return response.json(devs);
    },

    // destroy
    async destroy (request , response) {

        const { github_username } = request.query;
        Dev.deleteOne({ github_username : github_username}, err => {  
            if(err){
                console.log(err);
            }
        });
        const devs = await Dev.find();

        return response.json(devs);
    }

};