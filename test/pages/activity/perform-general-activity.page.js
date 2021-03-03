const Page = require('../page');
const PatientActivityPage = require('../../pages/activity/patient-activity.page');

class PerformGeneralActivityPage extends Page {
    
    /** Perform Activity popup container */
    performAktivitet(activity) {
        PatientActivityPage.checkIfRecurringActivityExist(activity.title);
        PatientActivityPage.btnPopupPerform.click();
    }

    validatePerformedAktivitet () {
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
}

module.exports = new PerformGeneralActivityPage();
