const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const config = require('./config/index');
const db = require('./db/connection');
const path = require('path');
const allowCors = require('./middlewares/allowCors');
const errorHandler = require('./middlewares/middleware');
const { AppError } = require('./utils/AppError')
const clientsMigration = require('./utils/clientsMigration');

const app = express();

if (config.environment !== "production") {
    const corsOptions = {
        origin: [
            'http://127.0.0.1:3000',
            'http://localhost:3000'
        ],
        credentials: true
    };
    app.use(cors(corsOptions));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

if (config.environment === "production") {

    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

(async () => {
    try {
        await app.listen(config.port);
        console.log(`server listening on port: ${config.port}`);

        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // db.sequelize.sync({ force: true }).then(async() => {
        //     console.log("Drop and re-sync db.");
            // await clientsMigration.migrateAllData()
        //   }).catch(err=> {
        //       console.log(err);
        //   }) ;

        // run this line onces, for dummy data 


    } catch (error) {
        console.error(error)
    }
}
)();