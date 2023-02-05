const { HTTPError } = require('../../errors/customError');
const saveServices = require('../services/saveCompanyServices');
const getCompaniesData = async (req, res) => {
  try {
    const { urlLink } = req.body;
    const length = await saveServices.saveCompaniesData(urlLink);
    const data = await saveServices.getCompaniesData();
    res.status(201).json({
      message: `Total off ${length} companies created`,
      data: data,
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = {
  getCompaniesData,
};
