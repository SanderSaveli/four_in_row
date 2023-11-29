const mix = require("laravel-mix");

mix.js("resources/js/game.js", "public/js")
    .js("resources/js/GameRule.js", "public/js")
    .js("resources/js/gameConfig.js", "public/js")
    .js("resources/js/Canvas.js", "public/js")
    .js("resources/js/showPopup.js", "public/js")
    .js("resources/js/menuSelector.js", "public/js");
