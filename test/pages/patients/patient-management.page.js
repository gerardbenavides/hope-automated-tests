const Page = require('../page')

class PatientManagementPage extends Page {

    /** Add Patient */
    get titleNewPatient () { return $('//div[@class="title-wrapper"]//span[.="Ny patient"]')}
    get inputPersonnummer () { return $('//div[@class="input-container"]//app-input[@formcontrolname="idNumber"]//input')}
    get dropdownGender () { return $('//div[@class="input-container"]//app-select[@formcontrolname="gender"]//div[@class="main-container clickable"]')}
    get dropdownGenderManSelector () { return $('//app-dropdown//span[.="Man"]')}
    get dropdownGenderWomanSelector () { return $('//app-dropdown//span[.="Kvinna"]')}
    get inputBirthdate () { return $('//app-datepicker[@class="ng-untouched ng-valid ng-dirty"]//input')}
    get inputFirstName () { return $('//app-input[@formcontrolname="firstName"]//input')}
    get inputLastName () { return $('//app-input[@formcontrolname="lastName"]//input')}
    get inputEmail () { return $('//app-input[@formcontrolname="email"]//input')}
    get inputPhoneNumber () { return $('//app-input[@formcontrolname="phoneNumberForSMS"]//input')}

    get btnSavePatient () { return $('//button[.="Spara patient"]')}
    get btnCreatePairingCode () { return $('//button[.="Skapa parkopplingskod"]')}

    /** Patient List */
    get inputSearch () { return $('//input[@placeholder="Sök"]')}
    get secondRowItem () { return $('//cdk-virtual-scroll-viewport//app-table//app-tr[2]')}
    get firstRowItemEditButton () { return $('//cdk-virtual-scroll-viewport//app-table//app-tr[1]//div[@class="flex-center faded clickable"]')}
    get displayNoResultsFound () { return $('//div[@class="body-wrapper"]//span[contains(text(),"Patient saknas i patientlista")]')}
    get btnAddPatient () { return $('//div[@class="right-content flex-cross-center"]//div[@class="add-wrapper flex-cross-center clickable faded"]//span[.="Ny patient"]')}
    get btnCancel () { return $('//app-button[.="Avbryt"]')}
    get checkboxFilter () { return $('//div[@class="right-wrapper flex-cross-center"]//app-checkbox')}

    get headerFirstName () { return $('//div[@class="inner-wrapper flex-cross-center"]//span[.="Förnamn"]')}
    get columnFirstName () { return $$('//cdk-virtual-scroll-viewport//app-table//app-tr//app-tc[2]//span')}
    get headerLastName () { return $('//div[@class="inner-wrapper flex-cross-center"]//span[.="Efternamn"]')}
    get columnLastName () { return $$('//cdk-virtual-scroll-viewport//app-table//app-tr//app-tc[3]')}
    get headerPersonummer () { return $('//div[@class="inner-wrapper flex-cross-center"]//span[.="Personnummer"]')}
    get columnPersonnummer () { return $$('//cdk-virtual-scroll-viewport//app-table//app-tr//app-tc[4]')}
    
    get bottomPageNavigator () { return $('//cdk-virtual-scroll-viewport/div/div/mat-paginator//div[@class="mat-paginator-page-size ng-star-inserted"]')}
    
    // First row 
    get firstRowItem () { return $('//cdk-virtual-scroll-viewport//app-table//app-tr[1]//span')}
    get firstRowItemFirstName () { return $('//cdk-virtual-scroll-viewport//app-table//app-tr[1]//app-tc[2]//span')}
    get firstRowItemLastName () { return $('//cdk-virtual-scroll-viewport//app-table//app-tr[1]//app-tc[3]//span')}
    get firstRowItemPersonnummer () { return $('//cdk-virtual-scroll-viewport//app-table//app-tr[1]//app-tc[4]//span')}

    /** Edit Patient */
    get dialogConfirmDelete () { return $('//app-confirm-dialog//div[@class="content-container"]')}
    get btnDeletePatient () { return $('//button//span[.="Ta bort patient"]')}
    get popupBtnDelete () { return $('//app-confirm-dialog//button//span[.="Ja"]')}
    get checkboxStatus () { return $('//div[@class="input-container flex-start-center"]//app-checkbox')}

    /** Patient Activity */
    get btnBack () { return $('//div[@class="left-wrapper flex-main-between"]//span[.="Patientlista"]')}
    get patientName () { return $('//div[@class="name-wrapper"]//span')}
    get patientPersonnummer () { return $('//div[@class="id-wrapper label"]//span')}  

    addPatient (patient) {
        let retry = 0

        this.inputAddPatientDetails(patient)
        switch (patient.withPairingCode) {
            case true:
                if (this.btnCreatePairingCode.isEnabled()) {
                    this.btnCreatePairingCode.click();
                    this.btnCancel.waitForEnabled()
                    this.btnCancel.click()
                }
                break;
            case false:
                if (this.btnSavePatient.isEnabled()) {
                    this.btnSavePatient.click();
                }
                break;
        }

        /** Executes retries. When buttons are not enabled, there's an invalid input or the validation service
         in email or number is not working or taking too long to process
         */
        if (this.btnSavePatient.isDisplayed() && !this.btnSavePatient.isEnabled()) {
            do {
                console.log("Save/Create Pairing Code button is not enabled")
                browser.refresh()

                this.inputAddPatientDetails(patient)
                this.btnCreatePairingCode.click()
                retry++
            } while (this.btnCreatePairingCode.isDisplayed() && retry < 3)
        }
    }

    inputAddPatientDetails (patient) {
        this.inputPersonnummer.setValue(patient.personnummer)
        this.dropdownGender.click()
        this.dropdownGenderManSelector.click()
        this.inputBirthdate.setValue(patient.birthdate)
        this.inputFirstName.setValue(patient.firstName)
        this.inputLastName.setValue(patient.lastName)
        this.inputEmail.setValue(patient.email)
        browser.pause(1000) // buffer
        this.inputPhoneNumber.click()
        this.inputPhoneNumber.setValue(patient.phoneNumber)
        browser.pause(2000) // buffer
    }

    editPatient (patient) {
        let retry = 0

        browser.pause(1000) // buffer

        this.inputEditPatientDetails(patient)
        if (this.btnSavePatient.isDisplayed() && this.btnSavePatient.isEnabled()) {
            this.btnSavePatient.click()
        } else if (this.btnSavePatient.isDisplayed() && !this.btnSavePatient.isEnabled()){
            do {
                console.log("Save button is not enabled")
                browser.refresh()
                this.inputEditPatientDetails(patient)
                this.btnSavePatient.click()
                retry++
            } while (this.btnSavePatient.isDisplayed() && this.btnSavePatient.isEnabled() == false && retry < 3)
        }
    }

    inputEditPatientDetails (patient) {
        this.dropdownGender.click()
        this.dropdownGenderWomanSelector.click()
        this.inputBirthdate.setValue(patient.editedBirthdate)
        this.inputFirstName.setValue(patient.editedFirstName)
        this.inputLastName.setValue(patient.editedLastName)
        this.inputEmail.setValue(patient.editedEmail)
        browser.pause(1000) // buffer
        this.inputPhoneNumber.click()
        this.inputPhoneNumber.setValue(patient.editedPhoneNumber)
        this.btnSavePatient.click()
        browser.pause(2000) // buffer
    }

    searchPatient (personnummer) {
        this.inputSearch.waitForDisplayed({timeout:3000})
        this.inputSearch.setValue(personnummer)
        browser.pause(1000)
        this.secondRowItem.waitForDisplayed({reverse:true})
    }

    deletePatient(personnummer) {
        this.searchPatient(personnummer)
        this.firstRowItemEditButton.click()
        this.btnDeletePatient.click()
        this.popupBtnDelete.click()

        this.dialogConfirmDelete.waitForDisplayed({reverse: true})
    }

    validatePatientNotExisting (personnummer) {
        this.inputSearch.setValue(personnummer)
        this.displayNoResultsFound.isDisplayed({timeout: 3000})
    }
    
    patientLocator (patient) {
        return $('//app-tr[@class="label ng-tns-c11-13 clickable faded ng-star-inserted"]//span[.="'+patient.firstName+'"]')
    }

    validatePatientInformation (firstName, lastName) {
        browser.pause(1000) // buffer
        this.secondRowItem.waitForDisplayed({timeout:3000, reverse: true}) // Waits until there's only one result showing
        
        this.firstRowItem.click()
        expect(this.patientName).toHaveTextContaining(firstName+ " "+lastName)

        this.btnBack.click()
        this.firstRowItem.waitForDisplayed({timeout:3000})
    }

    checkFirstRowPatientPersonnummerIfValid() { 
        let firstRowPersonnummer = $('//cdk-virtual-scroll-viewport//app-tr[1]//app-tc[4]//span')

        let firstRowPersonnummerValue = firstRowPersonnummer.getText()

        switch(true) {
            case this.firstRowPersonnummerValue == NaN:
            case this.firstRowFirstName == "     ":
            case this.firstRowLastName == "     ":
                this.deletePatient(firstRowPersonnummerValue)
                break
            default:
                console.log("First row patient's personnummer is a number'")
                break
        }
    }
    verifyFirstRowPatientDetails(string) {
        expect(this.firstRowItemFirstName).toHaveTextContaining(string)
        expect(this.firstRowItemLastName).toHaveTextContaining(string)
    }

    getTableColumnValues(column, values) {
        this.firstRowItem.waitForDisplayed()

        /** Handle passed parameter to use only 1 method for diff columns */
        switch (column) {
            case 'First Name':
                column = this.columnFirstName
                break;
            case 'Last Name':
                column = this.columnLastName
            case 'Personnummer':
                column = this.columnPersonnummer
        }

        /** It only gets first 15 patients unless scrolled down to the bottom most
        * then it gets the last 15 patients 
        */
        
        let rowCount = column.length

        for(let i = 0; i < rowCount; i++) {
            values[i] = column[i].getText()

            console.log('index: ' + i +' '+ values[i])
        }

        return values;
    }

    compareValues (before, after) {
        expectChai(JSON.stringify(before)).to.equal(JSON.stringify(after))
    }
    
    open () {
        return super.open('practitioner/sv/menu/main')
    }

}

module.exports = new PatientManagementPage()
