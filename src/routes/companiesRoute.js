const companyRouter = require('express').Router();
const companiesController = require('../controllers/companiesController');
const { validator } = require('../middlewares/companyRequest.validator');
const {
  getCompanyQuerySchema,
  updateCompanyBodySchema,
  updateCompanyParamSchema,
} = require('../middlewares/schemas.validator');

companyRouter
  .route('/')
  .get(
    validator(getCompanyQuerySchema, 'query'),
    companiesController.getCompaniesBySector
  );
companyRouter.route('/').get(companiesController.getAllCompanies);
companyRouter
  .route('/:companyId')
  .patch(
    validator(updateCompanyParamSchema, 'params'),
    validator(updateCompanyBodySchema, 'body'),
    companiesController.updateCompany
  );

module.exports = companyRouter;
