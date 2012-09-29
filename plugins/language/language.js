module.exports = function setup(options, imports, register) {

register(null, {
    language: {
        translateToLanguage : function(entry, callback) {
            // Use https://github.com/nanek/mstranslator to translate
            // the entered text
        }
    }
});

};