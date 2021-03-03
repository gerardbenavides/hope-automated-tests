const PatientManagementPage = require('../../pages/patients/patient-management.page')
const PatientActivityPage = require('../../pages/activity/patient-activity.page')

let patient = require('../../../data/patient-info.js').patient
let activityPlan = require('../../../data/patient-activity-info.js').activityPlan

describe('Practitioner can login through Demo', () => { 
    it('Should navigate to Login page', () => {
        LoginPage.open()
    })
    it('Should login practitioner', () => {
        LoginPage.login()
    })

    it('Should create a random patient', () => {
        MenuPage.menuPatientList.click()
        PatientManagementPage.btnAddPatient.click()
        PatientManagementPage.addPatient(patient)
    }) 
    
    it('Should open the created patient', () => {
        PatientManagementPage.inputSearch.setValue(patient.personnummer)
        browser.pause(1000)
        PatientManagementPage.firstRowItem.click()
        expect(PatientActivityPage.patientName).toHaveText(patient.firstName + " " + patient.lastName)
    }) 
})

describe('Practitioner can Create an Activity Plan without Health Issue', () => {
    it('Should add a Activity Plan without Health Issues', () => {
        activityPlan.healthIssue = "";
        PatientActivityPage.addActivityPlan(activityPlan)
    })

})
describe.skip('Practitioner can View and Verify the Activity Plan\'s details', () => { // Title text is hidden, unable to retrieve
    it('Should View and Validate the added activity plan\'s detials', () => {
        PatientActivityPage.filterActivityPlanLocator(activityPlan.title)
        
    })
})

describe('Practitioner can Edit Activity Plan and add multiple Health Issues', () => {
    it('Should edit Title and Description fields', () => {
        activityPlan.title = random.string()
        activityPlan.description = random.paragraph()
        activityPlan.healthIssue = ["Stroke","KOL","Astma"],

        PatientActivityPage.editActivityPlan(activityPlan)
    })
})

describe('Practitioner can Delete the Activity Plan', () => {
    it('Should delete the active Activity Plan', () => {
        PatientActivityPage.deleteActivityPlan()
    })

    it('Should validate that Activity Plan has been deleted', () => {
        PatientActivityPage.filterActivityPlanLocator(activityPlan.title).waitForDisplayed({reverse:true})
    })
})

describe('Practitioner can Create an Activity Plan with Health Issues and Anchor Date', () => {
    it('Should add Activity Plan', () => {
        PatientActivityPage.addActivityPlan(activityPlan)
    })

    it('Should validate created Activity Plan exists', () => {
        PatientActivityPage.filterActivityPlanLocator(activityPlan.title).waitForDisplayed()
    })

    it('Should delete the active Activity Plan', () => {
        PatientActivityPage.deleteActivityPlan()
    })

    it('Should validate that Activity Plan has been deleted', () => {
        PatientActivityPage.filterActivityPlanLocator(activityPlan.title).waitForDisplayed({reverse:true})
    })

    it('Should delete the created patient', () => {
        PatientActivityPage.btnBack.click()
        PatientManagementPage.deletePatient(patient.personnummer)
    })
    it('Should validate patient not existing', () => {
        PatientManagementPage.validatePatientNotExisting(patient.personnummer)
    })
})