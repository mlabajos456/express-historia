const defaultConfig = {
    appVersion: 'v1',
    db: {
        host: "172.16.102.206",
        name: "simys",
        user: "postgres",
        password: "postgres",
        dialect: "postgres"
    },
    tokenExpireInSeconds: ((3600) * 60) * 24,
    httpPort: 3000,
    privateKey: '37LvDSm4XvjYOh9Y',
};

module.exports = {
    ...defaultConfig
};