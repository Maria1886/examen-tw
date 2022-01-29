const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors')

const port = 8080

if (process.env.NODE_ENV === "development") {
    require('dotenv').config();
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const Spacecraft = require('./src/models/spacecraft');
const Astronaut = require('./src/models/astronaut');
const sequelize = require('./src/config/database');
sequelize.sync();

app.use(cors())

const roleRouter = require('./src/routes/role')
const astronautRouter = require('./src/routes/astronaut')
const spacecraftRouter = require('./src/routes/spacecraft')
const sfcRouter = require('./src/routes/sfc')



app.use('/api/role' , roleRouter);
app.use('/api/astronaut', astronautRouter);
app.use('/api/spacecraft', spacecraftRouter);
app.use('/api/sfc', sfcRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${process.env.PORT || port}`)
})