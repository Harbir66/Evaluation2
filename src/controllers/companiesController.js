const companiesServices = require('../services/companiesServices');
const { HTTPError } = require('../../errors/customError');
const getCompaniesBySector = async (req, res) => {
  try {
    const { sector } = req.query;
    console.log(sector);
    const companies = await companiesServices.getCompaniesDataBySector(sector);
    res.status(200).json(companies);
  } catch (err) {
    if (err instanceof HTTPError) {
      return res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = {
  getCompaniesBySector,
};
