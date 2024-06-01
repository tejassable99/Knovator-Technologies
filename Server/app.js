
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
// Import routes
const routes= require('./routes/routes');


// Use routes
app.use('/',routes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
