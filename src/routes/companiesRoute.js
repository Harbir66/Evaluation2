const saveRouter = require('express').Router();
const companiesController = require('../controllers/companiesController');

saveRouter.route('/').get(companiesController.getCompaniesBySector);

module.exports = saveRouter;
