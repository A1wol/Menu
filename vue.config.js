const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                @use "@/assets/scss/mixins.scss" as *;
                @import "@/assets/scss/variables.scss";
                @import "@/assets/scss/inputs.scss";
                `
            }
        }
    }
})
