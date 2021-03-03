const PatientManagementPage = require('../../pages/patients/patient-management.page')

let patient = require('../../../data/patient-info.js').patient

let firstNameBeforeSort = []
let firstNameAfterSort = []
let lastNameBeforeSort = []
let lastNameAfterSort = []
let personnummerBeforeSort = []
let personnummerAfterSort = []

describe('Practitioner can Add a Patient without Pairing Code', () => {
    it('Navigates to Login page', () => {
        LoginPage.open()
    })

    it('Logs in user', () => {
        LoginPage.login()
    })
    it('Navigates to Add Patient page', () => {
        MenuPage.menuNewPatient.click()
        PatientManagementPage.titleNewPatient.waitForExist()
    })

    it('Adds patient without Pairing Code', () => {
        PatientManagementPage.addPatient(patient)
        
    })
})

describe('Practitioner can Search Patients', () => {
    it('Validates the added patient exists', () => {
        MenuPage.menuPatientList.click()
        PatientManagementPage.inputSearch.setValue(patient.personnummer)

        PatientManagementPage.validatePatientInformation(patient.firstName, patient.lastName)
    })
})

describe('Practitioner can Delete a Patient', () => {
    it('Deletes the added patient', () => {
        PatientManagementPage.firstRowItemEditButton.click()

        PatientManagementPage.btnDeletePatient.click()
        PatientManagementPage.popupBtnDelete.click()
    })

    it('Validates patient is deleted', () => {
        PatientManagementPage.inputSearch.setValue(patient.personnummer)

        expect(PatientManagementPage.displayNoResultsFound).toBeDisplayed({timeout:3000})
    })
})

describe('Practitioner can Add a Patient with Pairing Code', () => {
    it('Adds patient and generate pairing code', () => {
        patient.withPairingCode = true

        PatientManagementPage.btnAddPatient.click()
        PatientManagementPage.addPatient(patient)
    })
})

describe('Practitioner can Edit a Patient details', () => {
    it('Validates the added patient exists', () => {
        PatientManagementPage.inputSearch.setValue(patient.personnummer)
        
        PatientManagementPage.validatePatientInformation(patient.firstName, patient.lastName)
    })
    it('Edits the added patient', () => {
        PatientManagementPage.firstRowItemEditButton.click()

        PatientManagementPage.editPatient(patient)  
    })
    it('Validates the edited patient exists', () => {
        PatientManagementPage.inputSearch.setValue(patient.personnummer)

        PatientManagementPage.validatePatientInformation(patient.editedFirstName, patient.editedLastName, patient.personnummer)
    })
})

describe('Practitioner can Edit a Patient and set as Inactive', () => {
    it('Edit and set patient status to "Inactive"', () => {
        PatientManagementPage.firstRowItemEditButton.click()

        PatientManagementPage.checkboxStatus.click()
        PatientManagementPage.btnSavePatient.waitForEnabled({timeout: 2000})
        PatientManagementPage.btnSavePatient.click()
    })
})

describe('Practitioner can view the Inactive Patients in the List', () => { /**Update 2020-11-06: This will not be fixed by service */
    it.skip('Does not show Inactive Patients when checkbox "Inactive" is not marked', () => { /** Will always fail unless bug HS30-345 is fixed. WILL SKIP FOR NOW */ 
        PatientManagementPage.inputSearch.setValue(patient.personnummer)

        expect(PatientManagementPage.displayNoResultsFound).toBeVisibleInViewport()
        browser.pause(1000)
    }) 
    it('Set filter to show "Inactive" patients', () => {
        PatientManagementPage.checkboxFilter.click()
        PatientManagementPage.inputSearch.setValue(patient.personnummer)
        PatientManagementPage.validatePatientInformation(patient.editedFirstName, patient.editedLastName)
    })
    it('Refreshes page to remove "Inactive" filter', () => {
        browser.refresh()
    })
})

describe.skip('Practitioner can sort Patient List by First Name', () => {
    it('Should get list of patients and store to variable', () => {
        PatientManagementPage.getTableColumnValues('First Name',firstNameBeforeSort);
    })
    it('Should sort list via sort method', () => {
        PatientManagementPage.getTableColumnValues('First Name',firstNameBeforeSort);
    })
    it('Should sort list via GUI', () => {
        PatientManagementPage.headerFirstName.click()
        PatientManagementPage.headerFirstName.click()
        browser.pause(3000)
    })
    it('Should get sorted list and store to variable', () => {
        PatientManagementPage.getTableColumnValues('First Name',firstNameAfterSort);
    })
    it('Should expect that sorting is correct', () => {
        PatientManagementPage.compareValues(firstNameBeforeSort, firstNameAfterSort)
    })
})

describe.skip('Practitioner can sort Patient List by Last Name', () => {
    it('Should get list of patients and store to variable', () => {
        PatientManagementPage.getTableColumnValues('Last Name',lastNameBeforeSort);
    })
    it('Should sort list via sort method', () => {
        PatientManagementPage.getTableColumnValues('Last Name',lastNameBeforeSort);
    })
    it('Should sort list via GUI', () => {
        PatientManagementPage.headerLastName.click()
        PatientManagementPage.headerLastName.click()
        browser.pause(3000)
    })
    it('Should get sorted list and store to variable', () => {
        PatientManagementPage.getTableColumnValues('Last Name', lastNameAfterSort);
    })
    it('Should expect that sorting is correct', () => {
        PatientManagementPage.compareValues(lastNameBeforeSort, lastNameAfterSort)
    })
})

describe.skip('Practitioner can sort Patient List by Personnummer', () => {
    it('Should get list of patients and store to variable', () => {
        PatientManagementPage.getTableColumnValues('Personnummer', personnummerBeforeSort);
    })
    it('Should sort list via sort method', () => {
        PatientManagementPage.getTableColumnValues('Personnummer', personnummerBeforeSort);
    })
    it('Should sort list via GUI', () => {
        PatientManagementPage.headerPersonnummer.click()
        PatientManagementPage.headerPersonnummer.click()
        browser.pause(3000)
    })
    it('Should get sorted list and store to variable', () => {
        PatientManagementPage.getTableColumnValues('Personnummer',personnummerAfterSort);
    })
    it('Should expect that sorting is correct', () => {
        PatientManagementPage.compareValues(personnummerBeforeSort, personnummerAfterSort)
    })
})