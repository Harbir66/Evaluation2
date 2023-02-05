const scoreUtils = require('../../src/utils/scoreUtils');
const database = require('../../database/models');
const companies = database.companies;
const axiosUtils = require('../../src/utils/axiosUtils');
const { HTTPError } = require('../../errors/customError');

const saveServices = require('../../src/services/saveCompanyServices');

describe('Testing Save Company Services', () => {
  describe('Testing saveCompaniesData function', () => {
    it('should return number of companies when input of data is given', async () => {
      const resolvedValue =
        'company_id,company_sector\n95b5a067-808a-44a9-a490-b4ef8a045f61,Automobile';
      const resolvedCompanyData = {
        id: '95b5a067-808a-44a9-a490-b4ef8a045f61',
        name: 'Volkswagen',
        description: 'asdfsdf',
        tags: ['Cars', 'EV'],
        ceo: '',
        numberEmployees: 15000,
      };
      const resolvedSectorData = [
        {
          companyId: '95b5a067-808a-44a9-a490-b4ef8a045f61',
          performanceIndex: [
            {
              key: 'cpi',
              value: 0.2,
            },
            {
              key: 'cf',
              value: 30000,
            },
            {
              key: 'mau',
              value: 0.1,
            },
            {
              key: 'roic',
              value: 20,
            },
          ],
        },
      ];

      jest
        .spyOn(axiosUtils, 'getCompaniesDataByURL')
        .mockResolvedValue(resolvedValue);
      jest
        .spyOn(axiosUtils, 'getCompaniesDataByID')
        .mockResolvedValue(resolvedCompanyData);
      jest
        .spyOn(axiosUtils, 'getSectorData')
        .mockResolvedValue(resolvedSectorData);

      jest.spyOn(scoreUtils, 'getScoreFromData').mockReturnValue(0.5);
      jest.spyOn(companies, 'create').mockResolvedValue({ data: 'data ' });

      const data = await saveServices.saveCompaniesData('urlLink');
      expect(data).toBe(1);
    });
  });

  describe('Testing getCompaniesData function', () => {
    it('should return companies details when called', async () => {
      const resolvedValue = [
        {
          id: 1,
          name: 'name',
        },
        { id: 2, name: 'name2' },
      ];
      jest.spyOn(companies, 'findAll').mockResolvedValue(resolvedValue);
      const data = await saveServices.getCompaniesData();
      expect(data).toEqual(resolvedValue);
    });
    it('should throw an HTTP Error when no data is found in database', async () => {
      const err = new HTTPError(404, 'No Companies Data Found');
      jest.spyOn(companies, 'findAll').mockResolvedValue(null);
      await expect(saveServices.getCompaniesData()).rejects.toThrow(err);
    });
  });
});
