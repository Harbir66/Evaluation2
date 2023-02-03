const axios = require('axios');

const getCompaniesDataByID = async (id) => {
  const companyDataUrl = `http://54.167.46.10/company/${id}`;
  const receivedData = await axios.get(companyDataUrl).then((response) => {
    return response.data;
  });
  return receivedData;
};
const getCompaniesDataByURL = async (url) => {
  const receivedData = await axios.get(url).then((response) => {
    return response.data;
  });
  return receivedData;
};
const getSectorData = async (sector) => {
  const sectorDataUrl = `http://54.167.46.10/sector?name=${sector}`;
  const sectorData = await axios.get(sectorDataUrl).then((response) => {
    return response.data;
  });
  return sectorData;
};

module.exports = { getCompaniesDataByID, getSectorData, getCompaniesDataByURL };
