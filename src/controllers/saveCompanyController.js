const saveServices = require('../services/saveCompanyServices');
const getCompaniesData = async (req, res) => {
  try {
    const { urlLink } = req.body;
    const data = await saveServices.getCompaniesData(urlLink);
    res
      .status(201)
      .json({ message: `${data} companies created in the database` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCompaniesData,
};
