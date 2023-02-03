const scoreUtils = require('../../src/utils/scoreUtils');
const database = require('../../database/models');
const companies = database.companies;
const axiosUtils = require('../../src/utils/axiosUtils');

const saveServices = require('../../src/services/saveCompanyServices');

describe('Testing Save Company Services', () => {
  describe('Testing getCompaniesData function', () => {
    it('should return number of companies when input of data is given', async () => {
      const resolvedValue =
        'company_id,company_sector\n95b5a067-808a-44a9-a490-b4ef8a045f61,Automobile';
      jest
        .spyOn(axiosUtils, 'getCompaniesDataByURL')
        .mockResolvedValue(resolvedValue);

      const resolvedCompanyData = {
        id: '95b5a067-808a-44a9-a490-b4ef8a045f61',
        name: 'Volkswagen',
        description: 'asdfsdf',
        tags: ['Cars', 'EV'],
        ceo: '',
        numberEmployees: 15000,
      };
      jest
        .spyOn(axiosUtils, 'getCompaniesDataByID')
        .mockResolvedValue(resolvedCompanyData);
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
        .spyOn(axiosUtils, 'getSectorData')
        .mockResolvedValue(resolvedSectorData);

      jest.spyOn(scoreUtils, 'getScoreFromData').mockReturnValue(0.5);
      jest.spyOn(companies, 'create').mockResolvedValue({ data: 'data ' });

      const data = await saveServices.getCompaniesData('urlLink');
      expect(data).toBe(1);
    });
  });
});
