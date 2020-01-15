const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
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
        }

        return response.json(dev);
    },

};