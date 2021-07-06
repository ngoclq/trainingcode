'use strict';

const request = require('supertest')
const app = require('../../app')

const newAccount = {
    username: 'correct@gmail.com',
    lastname: "Nguyen",
    firstname: "Van Dan",
    password: "secret",
    gender: "male",
    birthdate: "1984-11-24 12:00:00.000Z",
    metier: "particulier"
};

/**
 * Init database for testing
 */
module.exports.createUser = async () => {
    let response = await request(app)
        .post(`/api/user`)
        .send(newAccount);
    await request(app)
        .put(`/api/user/` + response.body._id + `/validation`)
        .send({"validationCode": response.body.validationCode});
    return JSON.parse(response.text);
};

module.exports.signIn = async () => {
    let response = await request(app)
        .post(`/api/signin`)
        .send({username: newAccount.username, password: newAccount.password});
    return response.body.token;
};