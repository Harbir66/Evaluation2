const companiesServices = require('../services/companiesServices');
const { HTTPError } = require('../../errors/customError');

const getCompaniesBySector = async (req, res) => {
  try {
    const { sector } = req.query;
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

const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const body = req.body;
    await companiesServices.updateCompany(companyId, body);
    const updatedCompany = await companiesServices.getSingleCompany(companyId);
    res.status(200).json({
      message: 'Company updated successfully',
      updatedCompany: updatedCompany,
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      return res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await companiesServices.getAllCompanies();
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
  updateCompany,
  getAllCompanies,
};
