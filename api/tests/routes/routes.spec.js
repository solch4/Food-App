/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, Diet, conn } = require('../../src/db.js');

const agent = session(app);

const recipe1 = {
  name: 'Milanea a la napolitana',
  summary: 'Es una mila',
  diets: []
};
const recipe2 = {
  name: 'Guiso',
  summary: 'Es un guiso',
  diets: ['Primal', 'Vegan']
};

describe('RECIPE ROUTES', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe1)));
  
    describe('GET /recipes', () => {
      it('Should get statusCode 200', () =>
        agent.get('/recipes').expect(200)
      );
    });

    describe('GET /recipes/:id', () => {
      it('Should get statusCode 200 if id is found', () => 
        // const res = await agent.get('/recipes/715421')
        // expect(res.statusCode).to.equal(200)
        agent.get('/recipes/715421').expect(200)
      )
      it('Should get statusCode 404 if id is not found', () => 
        agent.get('/recipes/randomID123').expect(404)
      )
      it('Should get an appropriate msg if id is not found', () => 
        agent.get('/recipes/randomID123').expect(/not found/)
      )
    })

    describe('GET /diets', () => {
      it('Should get statusCode 200', () => 
        agent.get('/diets').expect(200)
      )
    })

    describe('POST /recipes', () => {
      it('Should get statusCode 400 if name and/or summary are not send ', async () => {
        const res1 = await agent.post('/recipes').send({})
        expect(res1.statusCode).to.equal(400)
        const res2 = await agent.post('/recipes').send({name: 'Ice Cream'})
        expect(res2.statusCode).to.equal(400)
        const res3 = await agent.post('/recipes').send({summary: "It's an ice Cream"})
        expect(res3.statusCode).to.equal(400)
      })
      
      it('Should get statusCode 201 if the recipe is created successfully', async () => {
        const res1 = await agent.post('/recipes').send(recipe1)
        expect(res1.statusCode).to.equal(201)
        const res2 = await agent.post('/recipes').send(recipe2)
        expect(res2.statusCode).to.equal(201)
      })
    })
});
