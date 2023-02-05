const database = require('../../database/models');
const companies = database.companies;
const { HTTPError } = require('../../errors/customError');

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

const updateCompany = async (companyId, body) => {
  const company = await companies.update(
    { ...body },
    {
      where: { companyID: companyId },
    }
  );
  if (company[0] === 0) throw new HTTPError(404, 'Company not found');
};

const getAllCompanies = async () => {
  const allCompanies = await companies.findAll({
    raw: true,
    attributes: ['companyID', 'companyName', 'ceoName'],
  });
  if (allCompanies.length === 0) throw new HTTPError(404, 'No companies found');
  return allCompanies;
};

const getSingleCompany = async (companyId) => {
  const company = await companies.findOne({
    raw: true,
    attributes: ['companyID', 'companyName', 'ceoName'],
    where: { companyID: companyId },
  });
  if (!company) throw new HTTPError(404, 'Company not found');
  return company;
};

module.exports = {
  getCompaniesDataBySector,
  updateCompany,
  getAllCompanies,
  getSingleCompany,
};
