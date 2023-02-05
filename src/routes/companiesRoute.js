const saveRouter = require('express').Router();
const companiesController = require('../controllers/companiesController');

saveRouter.route('/?sector').get(companiesController.getCompaniesBySector);
saveRouter.route('/').get(companiesController.getAllCompanies);
saveRouter.route('/:companyId').patch(companiesController.updateCompany);

module.exports = saveRouter;
