const PatientManagementPage = require('../../pages/patients/patient-management.page')
const PatientActivityPage = require('../../pages/activity/patient-activity.page')
const PerformObservationActivityPage = require('../../pages/activity/perform-observations-activity.page')

let patient = require('../../../data/patient-info.js').patient
let activity = require('../../../data/activity-info.js').observation

describe('Practitioner can login through Demo', () => { 
    it('Should navigate to Login page', () => {
        LoginPage.open()
    })
    it('Should login practitioner', () => {
        LoginPage.login()
    })
})

describe('Practitioner can Add Open Observation Activity in Patient Activity', () => {
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
        // PatientManagementPage.inputSearch.setValue("193367662830")
        // browser.pause(1000)
        // PatientManagementPage.firstRowItem.click()
        // expect(PatientActivityPage.patientName).toHaveText("Antonio Hartmann")
    })
    it('Should delete all activities if there\'s any', () => {
        PatientActivityPage.deleteAllActivities()
    })
    it('Should add Open Observation activities', () => {
        activity.occurenceType = activity.occurenceType[1]
        PatientActivityPage.addActivity(activity)
    })
    it('Should validate added Open Observation activities exist', () => {
        expect(PatientActivityPage.locateActivityByTitle(activity.title)).toExist()
    })
})

describe('Practitioner can Edit Open Observation Activity in Patient Activity', () => {
    it('Should edit created Open observation activities', () => {
        activity.description = random.paragraph()
        PatientActivityPage.editActivity(activity)
        })
    it('Should validate edited values', () => {
        PatientActivityPage.validateActivityDetails(activity)
    })
})

describe('Practitioner can Cancel Open Observation Activity in Patient Activity', () => {
    it('Should cancel activity', () => {
        PatientActivityPage.cancelActivity(activity.editedTitle)

        browser.pause(1000)
        expectChai(PatientActivityPage.currentActivityListCount()).to.equal(2, "Activity count is not equal to 2")
        console.log("ACTIVITY COUNT: " +PatientActivityPage.currentActivityListCount())

    })
})

describe('Practitioner can Delete Open Observation Activity in Patient Activity', () => {
    it('Should delete activity', () => {
        PatientActivityPage.deleteAllActivities()
    })
})

describe('Practitioner can Perform Open Observation Activity in Patient Activity', () => {
    it('Should add Observation activities', () => {
        PatientActivityPage.addActivity(activity)
    })
    it('Should perform Observation activity', () => {
        PerformObservationActivityPage.performBlooodPressure(activity)
    })
    it('Should validate that there are 2 activities in the list after performing Open Observation Activity', () => {
        browser.pause(1000)

        expectChai(PatientActivityPage.currentActivityListCount()).to.equal(2, "Activity count is not equal to 2")
        console.log("ACTIVITY COUNT: " +PatientActivityPage.currentActivityListCount())    
    })
    it('Should validate Observation activity performed is complete', () => {
        PerformObservationActivityPage.validatePerformedBloodPressure(activity)
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