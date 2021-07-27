const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => console.log(chalk.cyan('DATABASE CONNECTED SUCCESSFULLY')))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
    console.log(chalk.blueBright(`App started to run on port: ${chalk.green(port)} successfully`));
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION 🐱‍🚀.Sutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('🐱‍🏍 SIGTERM RECEIVED. Shutting down gracefully');

    server.close(() => {
        console.log('💥 process terminated');
    });
});