const defaultConfig = {
    appVersion: "v1",
    db_test: {
        host: "172.16.102.206",
        name: "simys",
        user: "postgres",
        password: "postgres",
        dialect: "postgres",
    },
    db_production: {
        host: "20.195.226.148",
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
