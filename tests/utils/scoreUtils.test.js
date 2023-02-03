const {
  getScoreFromData,
  calculateScore,
} = require('../../src/utils/scoreUtils');

describe('Tests for Utils', () => {
  describe('Tests for calculateScore', () => {
    it('should return correct score when correct data is passed', () => {
      const data = [
        { key: 'cpi', value: 10 },
        { key: 'cf', value: 10000 },
        { key: 'mau', value: 10 },
        { key: 'roic', value: 10 },
      ];
      const score = calculateScore(data);
      expect(score).toBe(52.75);
    });
  });

  describe('Tests for getScoreFromData', () => {
    it('should return correct score when correct company id and sector data is given', () => {
      const companyId = '1';
      const sectorData = [
        {
          companyId: '1',
          performanceIndex: [
            { key: 'cpi', value: 10 },
            { key: 'cf', value: 10000 },
            { key: 'mau', value: 10 },
            { key: 'roic', value: 10 },
          ],
        },
        {
          companyId: '2',
          performanceIndex: [
            { key: 'cpi', value: 10 },
            { key: 'cf', value: 10000 },
            { key: 'mau', value: 10 },
            { key: 'roic', value: 10 },
          ],
        },
      ];
      const score = getScoreFromData(companyId, sectorData);
      expect(score).toBe(52.75);
    });
  });
});
