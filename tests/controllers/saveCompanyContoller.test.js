const saveServices = require('../../src/services/saveCompanyServices');
const saveController = require('../../src/controllers/saveCompanyController');

describe('Testing Save Company Controller', () => {
  describe('Testing getCompaniesData function', () => {
    it('should return number of companies when input req with url in body is given', async () => {
      jest.spyOn(saveServices, 'getCompaniesData').mockResolvedValue(1);
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
        message: '1 companies created in the database',
      });
    });
    it('should 500 status code error if services give error', async () => {
      const err = new Error('Internal Server Error');
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
      expect(mockRes.json).toHaveBeenCalledWith({ error: err.message });
    });
  });
});
