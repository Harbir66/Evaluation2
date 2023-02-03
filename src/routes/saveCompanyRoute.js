const saveRouter = require('express').Router();
const saveController = require('../controllers/saveCompanyController');

saveRouter.route('/').get(saveController.getCompaniesData);

module.exports = saveRouter;
