const PatientManagementPage = require('../../pages/patients/patient-management.page')
const PatientActivityPage = require('../../pages/activity/patient-activity.page')
const PerformGeneralActivityPage = require('../../pages/activity/perform-general-activity.page')

let patient = require('../../../data/patient-info.js').patient
let activity = require('../../../data/activity-info.js').general
describe('Practitioner can login through Demo', () => { 
    it('Should navigate to Login page', () => {
        LoginPage.open()
    })
    it('Should login practitioner', () => {
        LoginPage.login()
    })
})

describe('Practitioner can Add Recurring Observation Activity in Patient Activity', () => {
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
        // PatientManagementPage.searchPatient("198449163418")
        // PatientManagementPage.firstRowItem.click()
        // expect(PatientActivityPage.patientName).toHaveText("Allie Peters")
    })
    it('Should delete all activities if there\'s any', () => {
        PatientActivityPage.deleteAllActivities()
    })
    it('Should add Recurring General activity', () => {
        activity.occurenceType = activity.occurenceType[2]
        PatientActivityPage.addActivity(activity)
    })
    it('Should validate added Recurring General activity exist', () => {
        expect(PatientActivityPage.locateActivityByTitle(activity.title)).toExist()
    })
})

describe('Practitioner can Edit Recurring General activity in Patient Activity', () => {
    it('Should edit created Recurring General activity', () => {
        activity.description = random.paragraph()
        PatientActivityPage.editActivity(activity)
        browser.refresh()    
    })
    it('Should validate edited values', () => {
        PatientActivityPage.validateActivityDetails(activity)
    })

})

describe('Practitioner can Cancel Recurring General activity in Patient Activity', () => {
    it('Should cancel activity', () => {
        PatientActivityPage.cancelActivity(activity.editedTitle)

        browser.pause(1000)
        expectChai(PatientActivityPage.currentActivityListCount()).to.equal(6, "Activity count is not equal to 6")
        console.log("ACTIVITY COUNT: " +PatientActivityPage.currentActivityListCount())

    })
})

describe('Practitioner can Delete Recurring General activity in Patient Activity', () => {
    it('Should delete activity', () => {
        PatientActivityPage.deleteAllActivities()
    })
})

describe('Practitioner can Perform Recurring General activity in Patient Activity', () => {
    it('Should add General activities', () => {
        PatientActivityPage.addActivity(activity)
    })
    it('Should perform General activity', () => {
        PerformGeneralActivityPage.performAktivitet(activity)
    })
    it('Should validate that there are 6 activities in the list after performing Recurring Observation Activity', () => {
        browser.pause(1000)

        expectChai(PatientActivityPage.currentActivityListCount()).to.equal(6, "Activity count is not equal to 6")
        console.log("ACTIVITY COUNT: " +PatientActivityPage.currentActivityListCount())    
    })
    it('Should validate General activity performed is complete', () => {
        PerformGeneralActivityPage.validatePerformedAktivitet()
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