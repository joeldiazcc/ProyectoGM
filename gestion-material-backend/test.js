import * as chai from 'chai';
import chaiHttp from 'chai-http';
import server from './server.js';

chai.use(chaiHttp);
const should = chai.should();

describe('Empleados', () => {
    it('debería obtener todos los empleados', (done) => {
        chai.request(server)
            .get('/api/empleados')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});