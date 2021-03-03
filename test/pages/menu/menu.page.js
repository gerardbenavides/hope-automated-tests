const Page = require('../page');

class MenuPage extends Page {

    get version () { return $('//div[@class="left-container flex-cross-center"]//div[@class="version-tag detail font-regular"]//span')};
    get btnLogout () { return $('//div[@class="right-container flex-cross-center"]//div[@class="nav-items flex-main-end"]//span[.="Logga ut"]')};
    get popupContainer () { return $('//div[@class="content-container"]')};
    get popupBtnYes () { return $('//div[@class="content-container"]//button[@class="left-button"]//span[.="Ja"]')};
    get menuNewPatient () { return $('//div[@class="menu-option clickable faded"]//div[@class="option-description font-medium flex-center-start"]//span[.="Ny patient"]')}
    get menuPatientList () { return $('//div[@class="menu-option clickable faded"]//span[.="Patienter och aktiviteter"]')}
    get menuActivityTemplate () { return $('//div[@class="menu-option clickable faded"]//span[.="Mall för aktivitetsplaner"]')}
    
    logout () {
        this.btnLogout.click();
        this.popupContainer.waitForDisplayed({timeout:3000});
        this.popupBtnYes.click();
        this.popupContainer.waitForDisplayed({timeout:3000, reverse: true});
    }
    
    open () {
        return super.open('practitioner/sv/menu/main');
    }

}

module.exports = new MenuPage();
