"use strict";

const chai = require ('chai');
const chaiHttp = require ('chai-http');
const webdriver = require('selenium-webdriver');

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
require('dotenv').config();
const testDataApi = require ('../data/api.json')

describe('api.test.qa.rs', () => {



    it('Gets information about users payment', (done)  => {
        let test = testDataApi.orderInfo;
        chai.request('http://test.qa.rs/api')
            .post('/payment')
            .send({
                'order_id': test.order_id,
                'user_id': test.user_id,
                'status': test.status,
                'amount': test.amount
            })
            .end((error, response) => {
                response.should.have.status(200);

                done();
            });
    });
});