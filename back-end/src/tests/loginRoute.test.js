const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const Controller = require('../controllers/loginController');
const Service = require('../services/loginService');
const models = require('../database/models');

const {
  login,
  wrongLogin,
  user,
  notFoundError,
  token
} = require('./utils');

chai.use(chaiAsPromised);

const { expect } = chai;
const { stub } = sinon;

describe("Login service", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("login function", () => {    

    describe("with wrong credentials", () => {
      const { email } = wrongLogin;

      before(() => {
        stub(models.user, 'findOne').resolves(null);
      });

      it("returns an error object", async () => {
        expect(Service.login(wrongLogin)).to.be.rejectedWith(notFoundError);
        expect(models.user.findOne.args[0][0]).to.be.deep.include({ where: { email }});
      });
    });
  });
});

describe("Login controller", () => {
  const req = {};
  const res = {};
  res.status = stub().returns(res);
  res.json = stub();

  afterEach(() => {
    sinon.restore();
    res.status.resetHistory();
    res.json.resetHistory();
  });
  describe("login function", () => {
    describe("with correct credentials", () => {
      before(() => {
        req.body = login;
        stub(Service, 'login').resolves({ token });
      });

      it("returns a 200 status", async () => {
        await Controller.login(req, res);

        expect(Service.login.args[0][0]).to.be.deep.equal(login);
        expect(res.status.args[0][0]).to.be.equal(200);
        expect(res.json.args[0][0]).to.be.deep.equal({ token });
      });
    });
  });
});