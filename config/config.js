const defaultConfig = {
    appVersion: "v1",
    db_test: {
        host: "192.168.21.11",
        name: "simys",
        user: "postgres",
        password: "postgres",
        dialect: "postgres",
    },
    db_production: {
        host: "localhost",
        name: "simys",
        user: "postgres",
        password: "utE#Eu$O1xy7XTqU",
        dialect: "postgres",
    },
    tokenExpireInSeconds: 3600 * 60 * 24,
    httpPort: 3000,
    privateKey: "37LvDSm4XvjYOh9Y",
};

module.exports = {
    ...defaultConfig,
};
