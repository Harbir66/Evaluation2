const database = require('../../database/models');
const companies = database.companies;
const companyServices = require('../../src/services/companiesServices');
const { HTTPError } = require('../../errors/customError');

describe('Testing Company Services', () => {
  describe('Testing getCompaniesDataBySector Funtion', () => {
    it('should return companies ranked by score when provided with sector', async () => {
      const mockResolvedValue = [
        {
          id: 2,
          score: 16,
        },
        {
          id: 1,
          score: 9,
        },
      ];
      jest.spyOn(companies, 'findAll').mockResolvedValue(mockResolvedValue);
      const mockResult = [
        {
          companyRank: 1,
          id: 2,
          score: 16,
        },
        {
          companyRank: 2,
          id: 1,
          score: 9,
        },
      ];
      const result = await companyServices.getCompaniesDataBySector('sector');
      expect(result).toEqual(mockResult);
    });
    it('should throw 404 HTTPError when no company with required sector exist', async () => {
      const err = new HTTPError(404, 'No companies found for this sector');
      jest.spyOn(companies, 'findAll').mockResolvedValue([]);
      await expect(
        companyServices.getCompaniesDataBySector('sector')
      ).rejects.toThrow(err);
    });
  });
  describe('Testing updateCompany Funtion', () => {
    it('should return updated company detail when called', async () => {
      jest.spyOn(companies, 'update').mockResolvedValue([1]);
      await companyServices.updateCompany(1, { name: 'company' });
      expect(companies.update).toHaveBeenCalled();
    });
    it('should throw 404 HTTPError when no company with required id exist', async () => {
      const err = new HTTPError(404, 'Company not found');
      jest.spyOn(companies, 'update').mockResolvedValue([0]);
      await expect(
        companyServices.updateCompany(1, { name: 'company' })
      ).rejects.toThrow(err);
    });
  });
  describe('Testing getAllCompanies Funtion', () => {
    it('should all the companies in the database', async () => {
      const mockResolvedValue = [{ id: 1 }, { id: 2 }];
      jest.spyOn(companies, 'findAll').mockResolvedValue(mockResolvedValue);
      const result = await companyServices.getAllCompanies();
      expect(result).toEqual(mockResolvedValue);
    });
    it('should throw 404 HTTPError when no company exist', async () => {
      const err = new HTTPError(404, 'No companies found');
      jest.spyOn(companies, 'findAll').mockResolvedValue([]);
      await expect(companyServices.getAllCompanies()).rejects.toThrow(err);
    });
  });
  describe('Testing getSingleCompany Funtion', () => {
    it('should return company detail when called', async () => {
      const mockResolvedValue = { id: 1, companyName: 'company' };
      jest.spyOn(companies, 'findOne').mockResolvedValue(mockResolvedValue);
      const result = await companyServices.getSingleCompany(1);
      expect(result).toEqual(mockResolvedValue);
    });
    it('should throw 404 HTTPError when no company with required id exist', async () => {
      const err = new HTTPError(404, 'Company not found');
      jest.spyOn(companies, 'findOne').mockResolvedValue(null);
      await expect(companyServices.getSingleCompany(1)).rejects.toThrow(err);
    });
  });
});
