const mix = require("laravel-mix");

mix.js("resources/js/game.js", "public/js") // указываем входной файл и папку для результатов сборки
    .js("resources/js/GameRule.js", "public/js"); // если необходимо, указываем еще один файл для сборки
