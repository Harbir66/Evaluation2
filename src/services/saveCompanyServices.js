const scoreUtils = require('../utils/scoreUtils');
const database = require('../../database/models');
const companies = database.companies;
const axiosUtils = require('../utils/axiosUtils');

const getCompaniesData = async (urlLink) => {
  let companiesData = await axiosUtils.getCompaniesDataByURL(urlLink);

  companiesData = companiesData.split('\n');
  companiesData.splice(0, 1);

  const allCompanies = [];
  let singleCompanyData = {};
  companiesData.forEach(async (data) => {
    const companyId = data.split(',')[0];
    const companySector = data.split(',')[1];

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

    const createdData = companies.create({
      ...singleCompanyData,
    });
    allCompanies.push(createdData);
    singleCompanyData = {};
  });
  return companiesData.length;
};

module.exports = {
  getCompaniesData,
};
