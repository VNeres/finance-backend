const express = require('express');
const cors = require('cors');
const transactionsRoutes = require('./routes/transactionsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/transactions', transactionsRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});