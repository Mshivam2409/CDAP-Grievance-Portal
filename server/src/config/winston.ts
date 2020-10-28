import winston from "winston"

const options = {
    file: {
        level: 'info',
        filename: `${process.env.DIR}/logs/app.log`,
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

var logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
const winstonStream = {
    write: (message: string) => {
        logger.info(message);
    },
    error: (message: string) => {
        logger.error(message)
    }
};

export default winstonStream

