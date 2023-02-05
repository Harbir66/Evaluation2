const scoreUtils = require('../utils/scoreUtils');
const database = require('../../database/models');
const companies = database.companies;
const axiosUtils = require('../utils/axiosUtils');
const { HTTPError } = require('../../errors/customError');

const saveCompaniesData = async (urlLink) => {
  let companiesData = await axiosUtils.getCompaniesDataByURL(urlLink);

  companiesData = companiesData.split('\n');
  companiesData.splice(0, 1);

  let totalCompanies = 0;
  let singleCompanyData = {};
  for (let index = 0; index < companiesData.length; index++) {
    const companyId = companiesData[index].split(',')[0];
    const companySector = companiesData[index].split(',')[1];

    const receivedData = await axiosUtils.getCompaniesDataByID(companyId);

    const sectorData = await axiosUtils.getSectorData(companySector);
    const score = scoreUtils.getScoreFromData(companyId, sectorData);

    singleCompanyData = {
      companyID: companyId,
      companyName: receivedData.name,
      description: receivedData.description.substring(0, 250),
      ceoName: receivedData.ceo,
      tags: receivedData.tags,
      score: score,
      comapanySector: companySector,
    };
    companies.create({
      ...singleCompanyData,
    });
    totalCompanies++;
  }
  return totalCompanies;
};

const getCompaniesData = async () => {
  const data = await companies.findAll({
    attributes: ['companyID', 'companyName', 'score'],
  });
  if (data === null) {
    throw new HTTPError(404, 'No Companies Data Found');
  }
  return data;
};

module.exports = {
  saveCompaniesData,
  getCompaniesData,
};
