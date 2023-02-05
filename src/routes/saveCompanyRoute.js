const saveRouter = require('express').Router();
const saveController = require('../controllers/saveCompanyController');
const { saveCompanySchema } = require('../middlewares/schemas.validator');
const { validator } = require('../middlewares/companyRequest.validator');

saveRouter
  .route('/')
  .get(validator(saveCompanySchema, 'body'), saveController.getCompaniesData);

module.exports = saveRouter;
