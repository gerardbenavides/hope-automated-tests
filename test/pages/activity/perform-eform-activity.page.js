const Page = require('../page');
const PatientActivityPage = require('../../pages/activity/patient-activity.page');

class PerformEformActivityPage extends Page {
    
    // Perform PAT: Egenprovtagning COVID-19 popup container with fixed answers
    get item01 () { return $('//*[@id="mat-dialog-0"]/app-perform-activity/div/div/div/erl-eform-renderer-lib/form/div/div/erl-radiobutton[1]/div//p[contains(text(),"Du har COVID-19-symtom")]')}
    get item02 () { return $('//*[@id="mat-dialog-0"]/app-perform-activity/div/div/div/erl-eform-renderer-lib/form/div/div/erl-radiobutton[2]/div//p[contains(text(),"Ja")]')}
    get item03 () { return $('//*[@id="mat-dialog-0"]/app-perform-activity/div/div/div/erl-eform-renderer-lib/form/div/div/erl-radiobutton[3]/div//p[contains(text(),"Ja")]')}
    get item05 () { return $('//*[@id="mat-dialog-0"]/app-perform-activity/div/div/div/erl-eform-renderer-lib/form/div/div//*[@id="mat-input-0"]')}
    get item06 () { return $('//*[@id="mat-checkbox-1"]/label/span')}
    get item08 () { return $('//*[@id="mat-dialog-0"]/app-perform-activity/div/div/div/erl-eform-renderer-lib/form/div/div//*[@id="mat-input-1"]')}
    
    // Perform Blodning popup container with fixed answers
    get item1411 () { return $('//div[@class="form-preview-container ng-star-inserted"]//*[@id="mat-checkbox-1"]//p[contains(text(),"Vid katetersättning")]')}
    get item1412 () { return $('//div[@class="form-preview-container ng-star-inserted"]//textarea')}
    get item1412DisabledTextField () { return $('//mat-form-field[@class="mat-form-field ng-tns-c26-5 mat-primary disabled full-width mat-form-field-type-mat-input mat-form-field-appearance-legacy mat-form-field-can-float mat-form-field-hide-placeholder ng-untouched ng-pristine mat-form-field-should-float mat-form-field-disabled"]')}
    get btnSubmitActivity () { return $('//div[@class="eform-container ng-star-inserted"]//button[@class="label btnPrimary"]')}
    get btnUnlockEform () { return $('//div[@class="eform-container ng-star-inserted"]//button[@class="label btnPrimary"]//span[.="Lås upp"]')}
    get popupBtnBack() { return $('//app-perform-activity/div/div/div/div[1]/div[1]')}
    
    performEgenprovtagningCOVID19(activity) { // PAT: Egenprovtagning COVID-19
    
        PatientActivityPage.checkIfRecurringActivityExist();

        this.item01.waitForDisplayed({timeout: 5000})
        this.item01.click();
        this.item02.click();
        this.item03.click();
        this.item05.setValue(activity.pcrCode);
        this.item06.click();
        this.item08.setValue(activity.comment)

        this.btnSubmitActivity.click();
    }

    performBlodning(activity) { // Blödning
        PatientActivityPage.checkIfRecurringActivityExist(activity.title);
        this.item1411.waitForDisplayed({timeout: 5000})
        this.item1411.click();
        this.item1412.setValue(activity.comment)

        this.btnSubmitActivity.click();

        browser.pause(1000)
    }
    
    validatePerformedActivity () {
        
        if (PatientActivityPage.unclickableParentRecurringActivity.isExisting() == true) { // For handling recurring activities
            expect(PatientActivityPage.bannerOfSecondActivityStatusComplete).toBeDisplayed();
            console.log("Is Recurring parent is existing: " + PatientActivityPage.unclickableParentRecurringActivity.isExisting());
        } else if (PatientActivityPage.parentOpenActivity.isExisting() == true) { // For handling open activities
            expect(PatientActivityPage.bannerOfSecondActivityStatusComplete).toBeDisplayed();
            console.log("Is Open parent is existing: " + PatientActivityPage.parentOpenActivity.isExisting());
        } else {
            expect(PatientActivityPage.bannerOfFirstActivityStatusComplete).toBeDisplayed();
        }  
    }

    unlockEform () {
        this.btnUnlockEform.click();
        PatientActivityPage.popupConfirmDialogContainer.waitForDisplayed();
        PatientActivityPage.popupBtnYes.click();

        PatientActivityPage.popupBtnBack.click();
        browser.pause(1000);

        if (PatientActivityPage.unclickableParentRecurringActivity.isExisting() == true) {
            expect(PatientActivityPage.bannerOfSecondActivityStatusComplete).not.toBeDisplayed({message: 'Recurring activity is still completed and not unlocked'});
        } else {
            expect(PatientActivityPage.bannerOfFirstActivityStatusComplete).not.toBeDisplayed({message: 'Activity is still completed and not unlocked'});
        }
    }
}

module.exports = new PerformEformActivityPage();
