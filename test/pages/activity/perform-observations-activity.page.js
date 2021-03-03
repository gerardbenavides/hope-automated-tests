const Page = require('../page');
const PatientActivityPage = require('../../pages/activity/patient-activity.page');

class PerformObservationActivityPage extends Page {

    // Perform Blood Pressure popup container
    get inputSystolic () { return $('//div[@class="field-container ng-star-inserted"][1]//app-input//input')}
    get inputDiastolic () { return $('//div[@class="field-container ng-star-inserted"][2]//app-input//input')}
    
    performBlooodPressure(activity) {
        PatientActivityPage.checkIfRecurringActivityExist(activity.title);
        
        PatientActivityPage.btnPopupPerform.click();
        
        this.inputSystolic.waitForDisplayed();
        this.inputSystolic.setValue(activity.systolic);
        
        this.inputDiastolic.waitForDisplayed();
        this.inputDiastolic.setValue(activity.diastolic);
        
        PatientActivityPage.btnSubmitActivity.click();
    }

    validatePerformedBloodPressure (activity) {

        if (PatientActivityPage.unclickableParentRecurringActivity.isExisting() == true) { // For handling recurring activities
            expect(PatientActivityPage.bannerOfSecondActivityStatusComplete).toHaveTextContaining(activity.systolic + "/" + activity.diastolic)
            console.log("Is Recurring parent is existing: " + PatientActivityPage.unclickableParentRecurringActivity.isExisting());
        } else if (PatientActivityPage.parentOpenActivity.isExisting() == true) { // For handling open activities
            expect(PatientActivityPage.bannerOfSecondActivityStatusComplete).toHaveTextContaining(activity.systolic + "/" + activity.diastolic)
            console.log("Is Open parent is existing: " + PatientActivityPage.parentOpenActivity.isExisting());
        } else {
            expect(PatientActivityPage.bannerActivityStatusComplete).toHaveTextContaining(activity.systolic + "/" + activity.diastolic)
        }  
    }
}

module.exports = new PerformObservationActivityPage();
