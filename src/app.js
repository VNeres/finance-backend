const express = require('express');
const cors = require('cors');
const transactionsRoutes = require('./routes/transactionsRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const goalRoutes = require('./routes/goalRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/transactions', transactionsRoutes);
app.use('/categories', categoryRoutes);
app.use('/goals', goalRoutes); 

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});