const calculateScore = (data) => {
  const cpi = data.find((data) => data.key === 'cpi').value;
  const cf = data.find((data) => data.key === 'cf').value;
  const mau = data.find((data) => data.key === 'mau').value;
  const roic = data.find((data) => data.key === 'roic').value;
  const score = (cpi * 10 + cf / 10000 + mau * 10 + roic) / 4;
  return score;
};

const getScoreFromData = (companyId, sectorData) => {
  const companyData = sectorData.find((data) => data.companyId === companyId);
  const score = calculateScore(companyData.performanceIndex);
  return score;
};

module.exports = {
  calculateScore,
  getScoreFromData,
};
