const saveServices = require('../../src/services/saveCompanyServices');
const saveController = require('../../src/controllers/saveCompanyController');
const { HTTPError } = require('../../errors/customError');

describe('Testing Save Company Controller', () => {
  describe('Testing getCompaniesData function', () => {
    it('should return number of companies when input req with url in body is given', async () => {
      jest.spyOn(saveServices, 'saveCompaniesData').mockResolvedValue(1);
      jest.spyOn(saveServices, 'getCompaniesData').mockResolvedValue({
        id: 1,
        name: 'name',
      });
      const mockReq = {
        body: {
          urlLink: 'urlLink',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await saveController.getCompaniesData(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Total off 1 companies created',
        data: { id: 1, name: 'name' },
      });
    });
    it('should throw HTTPError when no data is reterieved by the function', async () => {
      const err = new HTTPError(404, 'No Companies Data Found');
      jest.spyOn(saveServices, 'saveCompaniesData').mockResolvedValue(1);
      jest.spyOn(saveServices, 'getCompaniesData').mockRejectedValue(err);
      const mockReq = {
        body: {
          urlLink: 'urlLink',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await saveController.getCompaniesData(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: err.message });
    });
    it('should throw 500 status code error if services give error', async () => {
      const err = new Error('Internal Server Error');
      jest.spyOn(saveServices, 'saveCompaniesData').mockResolvedValue(1);
      jest.spyOn(saveServices, 'getCompaniesData').mockRejectedValue(err);
      const mockReq = {
        body: {
          urlLink: 'urlLink',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await saveController.getCompaniesData(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: err.message });
    });
  });
});
