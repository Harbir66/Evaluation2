const express = require('express');
const app = express();
app.use(express.json());

const saveRouter = require('./routes/saveCompanyRoute');
const companiesRouter = require('./routes/companiesRoute');

app.use('/api/save', saveRouter);
app.use('/api/companies', companiesRouter);
const port = 3000;

app.listen(port, () => {
  console.log('Listening on port 3000...');
});
