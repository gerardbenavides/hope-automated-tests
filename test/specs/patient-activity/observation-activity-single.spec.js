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

describe('Practitioner can Add Single Observation Activity in Patient Activity', () => {

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
        // PatientManagementPage.searchPatient("193367662830")
        // PatientManagementPage.firstRowItem.click()
        // expect(PatientActivityPage.patientName).toHaveText("Antonio Hartmann")
    })
    it('Should delete all activities if there\'s any', () => {
        PatientActivityPage.deleteAllActivities()
    })
    it('Should add Observation activities', () => {
        activity.occurenceType = activity.occurenceType[0]
        PatientActivityPage.addActivity(activity)
        
    })
 
    it('Should validate added Observation activities exist', () => {
        expect(PatientActivityPage.locateActivityByTitle(activity.title)).toExist()
    })
})

describe('Practitioner can Open Single Observation Activity in Patient Activity', () => {


    it('Should edit created observation activities', () => {
        activity.description = random.paragraph()
        PatientActivityPage.editActivity(activity)

    })
    it('Should verify edited values', () => {
        PatientActivityPage.validateActivityDetails(activity)
    })
})

describe('Practitioner can Cancel Single Observation Activity in Patient Activity', () => {
    it('Should cancel activity', () => {
        PatientActivityPage.cancelActivity(activity.editedTitle)
    })
})

describe('Practitioner can Delete Single Observation Activity in Patient Activity', () => {
    it('Should delete activity', () => {
        PatientActivityPage.deleteActivity(activity.editedTitle)
    })
})

describe('Practitioner can Perform Single Observation Activity in Patient Activity', () => {
    it('Should add Observation activities', () => {
        PatientActivityPage.addActivity(activity)
    })
    it('Should perform Observation activity', () => {
        PerformObservationActivityPage.performBlooodPressure(activity)
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