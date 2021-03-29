const ENVIRONMENT = require('./environments');
const BASE_URL = require('./base-urls');

/** Checks if "env=" is available on cli arguments
    If not, returns Dev baseUrl as default
 */
const env_arg = process.argv.find( arg => {
    return arg.match(/env/)
    // return argument if it matches string `env`
});

switch (env_arg) {
    case ENVIRONMENT.BASE + ENVIRONMENT.DEV:
        baseUrl = BASE_URL.DEV;
        break;
    case ENVIRONMENT.BASE + ENVIRONMENT.STAGING:
        baseUrl = BASE_URL.STAGING;
        break;
    case ENVIRONMENT.BASE + ENVIRONMENT.PREPROD:
        baseUrl = BASE_URL.PREPROD;
        break;
    case ENVIRONMENT.BASE + ENVIRONMENT.DEMO:
        baseUrl = BASE_URL.DEMO;
        break;
    case ENVIRONMENT.BASE + ENVIRONMENT.WEEKDEV:
        baseUrl = BASE_URL.WEEKDEV;
        break;
    case ENVIRONMENT.BASE + ENVIRONMENT.EXPRESS:
        baseUrl = BASE_URL.EXPRESS;
        break;
    case ENVIRONMENT.BASE + ENVIRONMENT.ONECLICK:
        baseUrl = BASE_URL.ONECLICK;
        break;
    default:
        baseUrl = BASE_URL.DEV;
        console.log('Base URL not defined or arg is incorrect. Running on default Dev environment')
        break;
}


const environment_parameters = {
    DEV: {
        ParentProvider: "Dev CI Netzon Group",
        ParentProviderPass: "password",
        Provider: "Dev CI Automation Testing",
        ProviderPass: "password",

        Eform: "Blödning",
        Consent: "Användarvillkor och samtycken"
    },
    STAGING: {
        ParentProvider: "Netzon Group of Providers",
        ParentProviderPass: "password",
        Provider: "Staging CI Automation Testing",
        ProviderPass: "password",

        Eform: "Blödning",
        Consent: "Användarvillkor och samtycken"
    },
    DEMO: {
        ParentProvider: "Demo ADDI",
        ParentProviderPass: "password",
        Provider: "Demo Automation",
        ProviderPass: "atom",

        Eform: "Blödning",
        Consent: "Användarvillkor och samtycken"
    },

    WEEKDEV: {
        // ParentProvider: "Week-Dev CI Automation Testing",
        // ParentProviderPass: "password",
        Provider: "Week-Dev CI Automation Testing",
        ProviderPass: "password",

        Eform: "Blödning",
        Consent: "Användarvillkor och samtycken"
    },
    EXPRESS: {
        Provider: "DEV-ER-NETZON-2",
        ProviderPass: "password",

        Eform: "Blödning",
        Consent: "Användarvillkor och samtycken"
    },
    ONECLICK: {
        Provider: "HopeOneClickTest",
        ProviderPass: "fE0D1N7n",

        Eform: "Blödning",
        Consent: "Användarvillkor och samtycken"
    }
};

/** Checks if the value after "env=" on cli arguments matches
    any environment in environments.js file. Then returns the 
    parameters based on the environment
    If not, returns Dev parameters as default
 */
switch (env_arg) {
    case ENVIRONMENT.BASE + ENVIRONMENT.DEV:
        parameters = environment_parameters.DEV;
        break;
    case ENVIRONMENT.BASE + ENVIRONMENT.STAGING:
        parameters = environment_parameters.STAGING;
        break;
    case ENVIRONMENT.BASE + ENVIRONMENT.DEMO:
        parameters = environment_parameters.DEMO;
        break;
    case ENVIRONMENT.BASE + ENVIRONMENT.WEEKDEV:
        parameters = environment_parameters.WEEKDEV;
        break;
    case ENVIRONMENT.BASE + ENVIRONMENT.EXPRESS:
        parameters = environment_parameters.EXPRESS;
        break;
    case ENVIRONMENT.BASE + ENVIRONMENT.ONECLICK:
        parameters = environment_parameters.ONECLICK;
        break;
    default:
        parameters = environment_parameters.DEV;
        break;
}


module.exports = {env_arg, baseUrl, parameters};