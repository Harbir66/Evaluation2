const axios = require('axios');
jest.mock('axios');
const {
  getCompaniesDataByID,
  getSectorData,
  getCompaniesDataByURL,
} = require('../../src/utils/axiosUtils');

describe('Tests for Axios Utils', () => {
  describe('Tests for getCompaniesByID ', () => {
    it('should return correct data of companies when passed company id', () => {
      const resolvedValue = { data: { name: 'test' } };
      const id = '1';
      axios.get.mockResolvedValue(resolvedValue);
      const data = getCompaniesDataByID(id);
      expect(axios.get).toHaveBeenCalledWith(
        `http://54.167.46.10/company/${id}`
      );
      expect(data).resolves.toEqual(resolvedValue.data);
    });
  });
  describe('Tests for getSectorData ', () => {
    it('should return correct data of sectors when passed company sector', () => {
      const resolvedValue = { data: { name: 'test' } };
      const sector = '1';
      axios.get.mockResolvedValue(resolvedValue);
      const data = getSectorData(sector);
      expect(axios.get).toHaveBeenCalledWith(
        `http://54.167.46.10/company/${sector}`
      );
      expect(data).resolves.toEqual(resolvedValue.data);
    });
  });
  describe('Tests for getCompaniesByURL ', () => {
    it('should return correct data of companies when passed url', () => {
      const resolvedValue = { data: { name: 'test' } };
      const url = 'http://abc.com';
      axios.get.mockResolvedValue(resolvedValue);
      const data = getCompaniesDataByURL(url);
      expect(axios.get).toHaveBeenCalledWith(url);
      expect(data).resolves.toEqual(resolvedValue.data);
    });
  });
});
