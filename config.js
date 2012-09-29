module.exports = [
    {
        packagePath: "./plugins/httpserver",
        port: process.env.PORT || 8080,
        host: process.env.IP || "0.0.0.0"
  },
  "./plugins/denver",
  "./plugins/language",
  "./plugins/db"
]