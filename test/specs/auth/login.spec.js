const parameter = require('../../helpers/environment-variables').parameters

let version = '';

describe('Practitioner can navigate to Switch Provider', () => {
    it('Navigates to Login page', () => {
        LoginPage.open();
    });
    it('Opens dropdown container', () => {
        LoginPage.dropdownProviders.waitForDisplayed({timeout:120000});
        LoginPage.dropdownProviders.click();
    });
});

describe('Practitioner can select Providers in the Switch Provider', () => {
    it('Selects grouped providers', () => {
        if (parameter.ParentProvider != undefined) {
            LoginPage.providerSelector(parameter.ParentProvider).click();
            if (LoginPage.popupContainer.isExisting()) {
                LoginPage.inputPasswordIfRequired(parameter.ParentProviderPass)
            }
        }
    });
    
    it.skip('Checks if password is required for Grouped Provider', () => {
        if (LoginPage.popupContainer.isExisting()) {
            LoginPage.inputPasswordIfRequired(parameter.ParentProviderPass)
        }
    });
});

describe('Practitioner can login through Demo', () => {
    it('Selects provider', () => {
        LoginPage.providerSelector(parameter.Provider).click();
    });

    it('Checks if password is required for Provider', () => { 
        if (LoginPage.popupContainer.isExisting()) {
            LoginPage.inputPasswordIfRequired(parameter.ProviderPass)
        }
    });

    it('Logs in via Demo', () => {
        LoginPage.btnDemo.click();
    });

    it('Gets build number', () => {
        MenuPage.version.waitForDisplayed({ timeout: 120000 })
        version = MenuPage.version.getText();
    });
});

describe('Practitioner can Logout of the Provider', () => {
    it('Logs out practitioner', () => {
        MenuPage.btnLogout.click();
        MenuPage.popupContainer.waitForExist();
        MenuPage.popupBtnYes.click();
    });
    it('Validates if practitioner is successfuly logged out', () => {
        LoginPage.dropdownProviders.waitForExist({timeout: 5000});
    });
});