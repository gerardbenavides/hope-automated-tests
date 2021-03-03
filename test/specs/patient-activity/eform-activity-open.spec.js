const PatientManagementPage = require('../../pages/patients/patient-management.page')
const PatientActivityPage = require('../../pages/activity/patient-activity.page')
const PerformEformActivityPage = require('../../pages/activity/perform-eform-activity.page')

let patient = require('../../../data/patient-info.js').patient
let activity = require('../../../data/activity-info.js').eform

describe('Practitioner can login through Demo', () => { 

    it('Should navigate to Login page', () => {
        LoginPage.open()
    })
    it('Should login practitioner', () => {
        LoginPage.login()
    })
})

describe('Practitioner can Add Open eForm activity in Patient Activity', () => {

    it('Should create a random patient', () => {
        MenuPage.menuPatientList.click()
        PatientManagementPage.btnAddPatient.click()
        PatientManagementPage.addPatient (patient)
    })
    it('Should open created patient', () => {
        PatientManagementPage.searchPatient(patient.personnummer)
        PatientManagementPage.firstRowItem.click()
        expect(PatientActivityPage.patientName).toHaveText(patient.firstName + " " + patient.lastName)
        // MenuPage.menuPatientList.click()
        // PatientManagementPage.searchPatient("190351815102")
        // PatientManagementPage.firstRowItem.click()
        // expect(PatientActivityPage.patientName).toHaveText("Adam Borgioli")
    })
    it('Should delete all activities if there\'s any', () => {
        PatientActivityPage.deleteAllActivities()
    })
    it('Should add eForm activity', () => {
        activity.occurenceType = activity.occurenceType[1]
        PatientActivityPage.addActivity(activity)
    })
 
    it('Should validate added eForm activity exist', () => {
        expect(PatientActivityPage.locateActivityByTitle(activity.title)).toExist()
    })
})

describe('Practitioner can Edit Open eForm activity in Patient Activity', () => {
    
    it('Should edit created eForm activity', () => {
        activity.description = random.paragraph()
        PatientActivityPage.editActivity(activity)
    })
    it('Should verify edited values', () => {
        PatientActivityPage.validateActivityDetails(activity)
    })
})

describe('Practitioner can Cancel Open eForm activity in Patient Activity', () => {
    it('Should cancel activity', () => {
        PatientActivityPage.cancelActivity(activity.editedTitle)
        browser.pause(1000)
        expectChai(PatientActivityPage.currentActivityListCount()).to.equal(2, "Activity count is not equal to 2")
        console.log("ACTIVITY COUNT: " +PatientActivityPage.currentActivityListCount())
    })
})

describe('Practitioner can Delete Open eForm activity in Patient Activity', () => {
    it('Should delete activity', () => {
        PatientActivityPage.deleteAllActivities()
    })
})

describe('Practitioner can Complete Open eForm activity in Patient Activity', () => {
    it('Should add eForm activity', () => {
        PatientActivityPage.addActivity(activity)    
    })
    it('Should perform eForm activity', () => {
        PerformEformActivityPage.performBlodning(activity)
    })
    it('Should validate that there are 2 activities in the list after performing Open General activity', () => {
        browser.pause(1000)

        expectChai(PatientActivityPage.currentActivityListCount()).to.equal(2, "Activity count is not equal to 2")
        console.log("ACTIVITY COUNT: " +PatientActivityPage.currentActivityListCount())    
    })
    it('Should validate eForm activity performed is complete', () => {
        PerformEformActivityPage.validatePerformedActivity()
    })
})

describe.skip('Practitioner can Unlock Open eForm activity in Patient Activity', () => { // Will be skipped until HS30-311 is fixed
    it('Should unlock eForm activity', () => {
        PatientActivityPage.locateActivityByTitle(activity.title).click()
        PerformEformActivityPage.unlockEform()

    })
})

describe.skip('Practitioner can Complete Open eForm in Patient Activity again after being unlocked', () => {

    it('Should complete eForm activity again', () => {
        PerformEformActivityPage.performBlodning(activity)
    })
    it('Should validate eForm activity performed is complete', () => {
        PerformEformActivityPage.validatePerformedActivity()
    })
})

describe('Practitioner can Delete a Patient', () => {
    it('Deletes the added patient', () => {
        PatientActivityPage.btnBack.click()
        PatientManagementPage.deletePatient(patient.personnummer)
    })

    it('Validates patient is deleted', () => {
        PatientManagementPage.validatePatientNotExisting(patient.personnummer)
    })
})