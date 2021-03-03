const PatientManagementPage = require('../../pages/patients/patient-management.page')
const PatientActivityPage = require('../../pages/activity/patient-activity.page')
const PerformConsentActivityPage = require('../../pages/activity/perform-consent-activity.page')

let patient = require('../../../data/patient-info.js').patient
let activity = require('../../../data/activity-info.js').consent

describe('Practitioner can login through Demo', () => { 

    it('Should navigate to Login page', () => {
        LoginPage.open()
    })
    it('Should login practitioner', () => {
        LoginPage.login()
    })
})

describe('Practitioner can Add Open Consent activity in Patient Activity', () => {

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
    it('Should add Consent activity', () => {
        activity.occurenceType = activity.occurenceType[1]
        PatientActivityPage.addActivity(activity)
    })
 
    it('Should validate added Consent activity exist', () => {
        expect(PatientActivityPage.locateActivityByTitle(activity.title)).toExist()
    })
})

describe('Practitioner can Edit Open Consent activity in Patient Activity', () => {
    
    it('Should edit created Consent activity', () => {
        activity.description = random.paragraph()
        PatientActivityPage.editActivity(activity)
    })
    it('Should verify edited values', () => {
        PatientActivityPage.validateActivityDetails(activity)
    })
})

describe('Practitioner cannot perform Open Consent Activity in Patient Activity', () => {
    it('Should validate activity not performable', () => {
        PerformConsentActivityPage.validateAnvandarvillkorConsentNotPerformable(activity)
    })
})
describe('Practitioner can Cancel Open Consent activity in Patient Activity', () => {
    it('Should cancel activity', () => {
        PatientActivityPage.cancelActivity(activity.editedTitle)
        browser.pause(1000)
        expectChai(PatientActivityPage.currentActivityListCount()).to.equal(2, "Activity count is not equal to 2")
        console.log("ACTIVITY COUNT: " +PatientActivityPage.currentActivityListCount())
    })
})

describe('Practitioner can Delete Open Consent activity in Patient Activity', () => {
    it('Should delete activity', () => {
        PatientActivityPage.deleteAllActivities()
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