const path = require("path");

module.exports = {
    mode: "development", // Или 'production' для сборки в продакшн
    entry: "./resources/js/game.js", // Путь к вашему основному JavaScript файлу
    output: {
        path: path.resolve(__dirname, "public/js"), // Путь к папке, куда Webpack положит результат сборки
        filename: "bundle.js", // Имя выходного файла
    },
};
