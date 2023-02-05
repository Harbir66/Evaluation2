const companyServices = require('../../src/services/companiesServices');
const { HTTPError } = require('../../errors/customError');

const companyController = require('../../src/controllers/companiesController');

describe('Testing Company Controllers', () => {
  describe('Testing getCompaniesBySector Function', () => {
    it('should return companies ranked by score when provided with sector', async () => {
      const resolvedValue = [
        {
          Rank: 1,
          id: 2,
          score: 16,
        },
        {
          Rank: 2,
          id: 1,
          score: 9,
        },
      ];
      jest
        .spyOn(companyServices, 'getCompaniesDataBySector')
        .mockResolvedValue(resolvedValue);
      const mockReq = {
        query: {
          sector: 'sector',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await companyController.getCompaniesBySector(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
    });
    it('should throw 404 HTTPError when no company with required sector exist', async () => {
      const err = new HTTPError(404, 'No companies found for this sector');
      jest
        .spyOn(companyServices, 'getCompaniesDataBySector')
        .mockRejectedValue(err);
      const mockReq = {
        query: {
          sector: 'sector',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await companyController.getCompaniesBySector(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: err.message });
    });
    it('should throw 500 status when there is some problem with database', async () => {
      const err = new Error('Internal Server Error');
      jest
        .spyOn(companyServices, 'getCompaniesDataBySector')
        .mockRejectedValue(err);
      const mockReq = {
        query: {
          sector: 'sector',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await companyController.getCompaniesBySector(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: err.message });
    });
  });
  describe('Testing updateCompany Function', () => {
    it('should return updated company when provided with valid company id', async () => {
      const resolvedValue = {
        id: 1,
        name: 'company',
        ceoName: 'ceo',
      };
      jest
        .spyOn(companyServices, 'updateCompany')
        .mockResolvedValue(resolvedValue);
      jest
        .spyOn(companyServices, 'getSingleCompany')
        .mockResolvedValue(resolvedValue);
      const mockReq = {
        params: {
          companyId: 1,
        },
        body: {
          ceoName: 'ceo',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await companyController.updateCompany(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Company updated successfully',
        updatedCompany: resolvedValue,
      });
    });
    it('should return Error 404 when there is no company with provided id', async () => {
      const err = new HTTPError(404, 'No company found with this id');
      jest.spyOn(companyServices, 'updateCompany').mockRejectedValue(err);
      jest.spyOn(companyServices, 'getSingleCompany').mockResolvedValue(null);
      const mockReq = {
        params: {
          companyId: 1,
        },
        body: {
          ceoName: 'ceo',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await companyController.updateCompany(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: err.message });
    });
    it('should return Error 500 when there is some problem with database', async () => {
      const err = new Error('Internal Server Error');
      jest.spyOn(companyServices, 'updateCompany').mockRejectedValue(err);
      jest.spyOn(companyServices, 'getSingleCompany').mockResolvedValue(null);
      const mockReq = {
        params: {
          companyId: 1,
        },
        body: {
          ceoName: 'ceo',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await companyController.updateCompany(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: err.message });
    });
  });
  describe('Testing getAllCompanies Function', () => {
    it('should return list of all companies', async () => {
      const resolvedValue = [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ];
      jest
        .spyOn(companyServices, 'getAllCompanies')
        .mockResolvedValue(resolvedValue);
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await companyController.getAllCompanies(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
    });
    it('should return HTTPError 404 when there is no company in database', async () => {
      const err = new HTTPError(404, 'No companies found');
      jest.spyOn(companyServices, 'getAllCompanies').mockRejectedValue(err);
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await companyController.getAllCompanies(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: err.message });
    });
    it('should return Error 500 when there is some problem with database', async () => {
      const err = new Error('Internal Server Error');
      jest.spyOn(companyServices, 'getAllCompanies').mockRejectedValue(err);
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await companyController.getAllCompanies(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: err.message });
    });
  });
});
