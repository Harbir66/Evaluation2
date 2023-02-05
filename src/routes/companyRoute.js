const companyRouter = require('express').Router();
const companiesController = require('../controllers/companiesController');

companyRouter.route('/').get(companiesController.getAllCompanies);

module.exports = companyRouter;
