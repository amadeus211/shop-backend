const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const promotionsRoutes = require('./routes/promotions');
const clientsRoutes = require('./routes/clients');
const responsesRoutes = require('./routes/responses');

const cors = require('cors');


dotenv.config();
connectDB();


const app = express();

app.use(cors());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()}: Request param: ${req.originalUrl}`);
  next();
});

app.use(express.json());

app.use('/api/promotions', promotionsRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/responses', responsesRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});