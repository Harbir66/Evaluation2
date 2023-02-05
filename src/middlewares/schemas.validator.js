const joi = require('joi');

const saveCompanySchema = joi.object({
  urlLink: joi.string().uri().required(),
});

const getCompanyQuerySchema = joi.object({
  sector: joi.string().required(),
});

const updateCompanyParamSchema = joi.object({
  companyId: joi.string().uuid().required(),
});

const updateCompanyBodySchema = joi.object({
  ceoName: joi.string().required(),
});
module.exports = {
  saveCompanySchema,
  getCompanyQuerySchema,
  updateCompanyParamSchema,
  updateCompanyBodySchema,
};
