const ENVIRONMENT = require('../../environments/environments');
const env_arg = require('./environment-variables').env_arg;

const parameters = {
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

    WEEKDEV: {
        // ParentProvider: "Week-Dev CI Automation Testing",
        // ParentProviderPass: "password",
        Provider: "Week-Dev CI Automation Testing",
        ProviderPass: "password",

        Eform: "Blödning",
        Consent: "Användarvillkor och samtycken"
    }
};

switch (env_arg) {
    case ENVIRONMENT.BASE + ENVIRONMENT.DEV:
        ToExport = parameters.DEV;
        break;
    case ENVIRONMENT.BASE + ENVIRONMENT.STAGING:
        ToExport = parameters.STAGING;
        break;
    case ENVIRONMENT.BASE + ENVIRONMENT.WEEKDEV:
        ToExport = parameters.WEEKDEV;
        break;
    default:
        ToExport = parameters.DEV;
        break;
}

module.exports = ToExport;
