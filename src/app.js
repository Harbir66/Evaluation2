const express = require('express');
const app = express();
app.use(express.json());

const saveRouter = require('./routes/saveCompanyRoute');

app.use('/api/save', saveRouter);

const port = 3000;

app.listen(port, () => {
  console.log('Listening on port 3000...');
});
