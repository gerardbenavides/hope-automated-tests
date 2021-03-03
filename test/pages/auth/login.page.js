const Page = require('../page');
const parameter = require('../../helpers/environment-variables').parameters

class LoginPage extends Page {

    get dropdownProviders() { return $('//div[@class="provider-container flex-main-center"]//div[@class="main-container clickable"]')}
    get popupContainer () { return $('//div[@class="content-container"]')}
    get popupInputPassword () { return $('//div[@class="content-container"]//input')}
    get popupBtnOK () { return $('//div[@class="content-container"]//div//span[contains(text(),"OK")]')}
    get btnDemo () { return $('//button[@class="label btnPrimary"]//div//span[.="Demoläge"]')}
    
    providerSelector(provider) {
        return $('//div[@class="main-container clickable"]//span[contains(text(),"'+provider+'")]');
    }

    inputPasswordIfRequired(pass) { 
        this.popupInputPassword.setValue(pass);
        this.popupBtnOK.click();

    }

    login () {
        this.dropdownProviders.waitForDisplayed({timeout:120000});
        this.dropdownProviders.click();

        if (parameter.ParentProvider != undefined) {
            this.providerSelector(parameter.ParentProvider).click();
            if (this.popupContainer.isExisting()) {
                this.inputPasswordIfRequired(parameter.ParentProviderPass)
            }
            this.loginToProvider();
        } else {
            this.loginToProvider();
        }
    }
    
    loginToProvider () {
        this.providerSelector(parameter.Provider).click();
        if (this.popupContainer.isExisting()) {
            this.inputPasswordIfRequired(parameter.ProviderPass)
        }
        this.btnDemo.click();

        MenuPage.version.waitForExist({timeout: 120000})
    }
    open () {
        return super.open('auth/sv/login');
    }

}

module.exports = new LoginPage();
