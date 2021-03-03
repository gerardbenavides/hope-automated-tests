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


describe('Practitioner can Add Open General activity in Patient Activity', () => {
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
        // PatientManagementPage.inputSearch.setValue("196730691815")
        // browser.pause(1000)
        // PatientManagementPage.firstRowItem.click()
        // expect(PatientActivityPage.patientName).toHaveText("Alberta Failli")
    })
    it('Should delete all activities if there\'s any', () => {
        PatientActivityPage.deleteAllActivities()
    })
    it('Should add Open General activity', () => {
        activity.occurenceType = activity.occurenceType[1]
        PatientActivityPage.addActivity(activity)
    })
    it('Should validate added Open General activity exist', () => {
        expect(PatientActivityPage.locateActivityByTitle(activity.title)).toExist()
    })
})

describe('Practitioner can Edit Open General activity in Patient Activity', () => {
    it('Should edit created Open General activity', () => {
        activity.description = random.paragraph()
        PatientActivityPage.editActivity(activity)
        })
    it('Should validate edited values', () => {
        PatientActivityPage.validateActivityDetails(activity)
    })
})

describe('Practitioner can Cancel Open General activity in Patient Activity', () => {
    it('Should cancel activity', () => {
        PatientActivityPage.cancelActivity(activity.editedTitle)

        browser.pause(1000)
        expectChai(PatientActivityPage.currentActivityListCount()).to.equal(2, "Activity count is not equal to 2")
        console.log("ACTIVITY COUNT: " +PatientActivityPage.currentActivityListCount())

    })
})

describe('Practitioner can Delete Open General activity in Patient Activity', () => {
    it('Should delete activity', () => {
            PatientActivityPage.deleteAllActivities()
        })
})

describe('Practitioner can Perform Open General activity in Patient Activity', () => {
    it('Should add General activity', () => {
        PatientActivityPage.addActivity(activity)
    })
    it('Should perform General activity', () => {
        PerformGeneralActivityPage.performAktivitet(activity)
    })
    it('Should validate that there are 2 activities in the list after performing Open General activity', () => {
        browser.pause(1000)

        expectChai(PatientActivityPage.currentActivityListCount()).to.equal(2, "Activity count is not equal to 2")
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