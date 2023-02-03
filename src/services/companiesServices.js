// const scoreUtils = require('../utils/scoreUtils');
const database = require('../../database/models');
const companies = database.companies;
const { HTTPError } = require('../../errors/customError');
// const axiosUtils = require('../utils/axiosUtils');

const getCompaniesDataBySector = async (sector) => {
  const requiredCompanies = await companies.findAll({
    raw: true,
    attributes: [
      'companyID',
      'companyName',
      'ceoName',
      'score',
      'comapanySector',
    ],
    where: { comapanySector: sector },
    order: [['score', 'DESC']],
  });
  let rank = 1;
  const companiesData = requiredCompanies.map((company) => {
    const companyData = {
      ...company,
      companyRank: rank,
    };
    rank++;
    return companyData;
  });
  if (companiesData.length === 0)
    throw new HTTPError(404, 'No companies found for this sector');
  return companiesData;
};

module.exports = {
  getCompaniesDataBySector,
};
