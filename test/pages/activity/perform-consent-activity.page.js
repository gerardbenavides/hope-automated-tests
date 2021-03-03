const Page = require('../page');
const PatientActivityPage = require('../../pages/activity/patient-activity.page');

class PerformConsentActivityPage extends Page {
    
    // Perform Användarvillkor och samtycken popup container with fixed answers
    get item00 () { return $('//mat-dialog-container//erl-checkbox//mat-checkbox')}
    get item01 () { return $('//mat-dialog-container//erl-input//mat-form-field')}
    get item02 () { return $('//mat-dialog-container//erl-radiobutton//mat-radio-button')}
    

    validateAnvandarvillkorConsentNotPerformable (activity) {
        browser.refresh();
        PatientActivityPage.checkIfRecurringActivityExist(activity.editedTitle);

        expect(this.item00).toHaveElementClass('mat-checkbox-disabled');
        expect(this.item01).toHaveElementClass('mat-form-field-disabled');
        expect(this.item02).toHaveElementClass('mat-radio-disabled');

        expect(PatientActivityPage.btnPrimary).not.toExist();

        PatientActivityPage.popupBtnBack.click();
    } 

}

module.exports = new PerformConsentActivityPage();
