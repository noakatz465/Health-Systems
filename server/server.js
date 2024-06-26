const express = require('express');
const mongooseConnect = require('./db/mongoConnect');
const app = express();
const cors = require('cors');
const membersRoute = require('./routes/members');
const vaccineManufacturersRoute = require('./routes/vaccineManufacturers');
const port = 3000;


app.use(cors());

app.use(express.json());
app.use('/api/members', membersRoute);
app.use('/api/vaccineManufacturers', vaccineManufacturersRoute);
  

(async ()=>{
    await mongooseConnect();
})();

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send('An error in app');
})

app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
})