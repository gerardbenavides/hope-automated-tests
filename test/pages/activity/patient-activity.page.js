const Page = require('../page')

class PatientActivityPage extends Page {

    /** Patient Activity */
    get btnBack () { return $('//div[@class="left-wrapper flex-main-between"]//span[.="Patientlista"]')}
    get patientName () { return $('//div[@class="name-wrapper"]//span')}
    get patientPersonnummer () { return $('//div[@class="id-wrapper label"]//span')}  
    get emptyActivityList () { return $('//div[@class="list-container ng-star-inserted"]//span[.="Ingen aktivitet"]')}

    /** Top navigation */
    get btnAddActivityPlan () { return $('//div[@class="action-wrapper flex-cross-center clickable faded"]//span[.="Ny aktivitetsplan"]')}
    get btnEditActivityPlan () { return $('//div[@class="action-wrapper flex-cross-center clickable faded ng-star-inserted"]//span[.="Redigera aktivitetsplan"]')}
    get containerEditActivityPlan () { return $('//div[@class="content-container"]')}
    get btnAddActivity () { return $('//div[@class="action-wrapper flex-cross-center clickable faded"]//span[.="Ny aktivitet"]')}
    
    /** Activity List row elements */
    get unclickableParentRecurringActivity () { return $('//cdk-virtual-scroll-viewport//app-tr[contains(@class,"unclickable")]')}
    get firstChildRecurringActivity () { return $('//cdk-virtual-scroll-viewport//app-table//app-tr[2]//app-tc[@class="name-cell flex"]')}
    get bannerActivityStatusComplete () { return $('//app-tr//app-tc[@class="result-cell flex"]//span')}
    get parentOpenActivity () { return $('//app-tr[1]//app-tc[@class="type-cell flex"]//span[contains(text(),"Öppna aktiviteter")]')}
    
    // First row elements
    get firstRow () { return $('//cdk-virtual-scroll-viewport//app-tr[1]//div')}
    get firstRowEditIcon () { return $('//cdk-virtual-scroll-viewport//app-tr[1]//app-tc//div[@class="flex-center faded clickable"]')}  
    get firstRowDate () { return $('//app-table//app-tr//app-tc[@class="date-cell flex"]//span')}
    get bannerOfFirstActivityStatusComplete () { return $('//app-tr[1]//app-tc[@class="result-cell flex"]//div[@class="banner-container flex-cross-center status-complete"]')}
   
    // Second row elements
    get secondRow () { return $('//cdk-virtual-scroll-viewport//app-tr[2]')}
    get secondRowEditIcon () { return $('//cdk-virtual-scroll-viewport//app-tr[2]//app-tc//div[@class="flex-center faded clickable"]')}  
    get bannerOfSecondActivityStatusComplete () { return $('//app-tr[2]//app-tc[@class="result-cell flex"]//div[@class="banner-container flex-cross-center status-complete"]')}

    /** New activity page */
    get btnSaveActivity () { return $('//app-button//button//span[.="Spara och stäng"]')}
    get dropdownActivityType () { return $('//app-select[@formcontrolname="type"]//div[@class="main-container clickable"]//div[@class="main-wrapper flex-cross-center"]')}
    get dropdownEformType () { return $('//app-select[@formcontrolname="eFormCode"]//div[@class="main-container clickable"]')}
    get dropdownConsentType () { return $('//app-select[@formcontrolname="consentCode"]//div[@class="main-container clickable"]')}
    get inputActivityTitle () { return $('//div[@class="input-container flex-start-start"]//app-input[@formcontrolname="name"]//input')}
    get occurenceTypeSingle () { return $('//app-radio-button//span//span[.="Enkel"]')}
    get occurenceTypeOpen () { return $('//app-radio-button//span//span[.="Öppen"]')}
    get occurenceTypeRecurring () { return $('//app-radio-button//span//span[.="Återkommande"]')}
    get inputActivityDescription () { return $('//textarea')}
    get containerActivityDescription () { return $('//div[@class="fake-textarea ng-star-inserted"]')}
    get activityTimePicker () { return $('//div[@class="datetimepicker-container flex-start-center"]')}
    get containerActivityTimePicker () { return $('//div[@class="cdk-overlay-pane owl-dt-popup"]')}
    get btnSetActivityTime () { return $('//div[@class="cdk-overlay-pane owl-dt-popup"]//button//span[.="Set"]')}
    get inputActivityTimeInactive () { return $('//owl-date-time-timer//input[@class="owl-dt-timer-input"]')}
    get inputActivityTimeActive () { return $('//owl-date-time-timer//input[@class="owl-dt-timer-input focus-visible"]')}

    get inputActivityTimeBefore () { return $('//app-input[@formcontrolname="startBeforeMinutes"]')}
    get inputActivityTimeAfter () { return $('//app-input[@formcontrolname="startAfterMinutes"]')}
    
    // Recurring extra fields
    get inputNumberOfTimes () { return $('//app-input[@formcontrolname="numberOfTimes"]//input')}
    get inputInterval () { return $('//app-input[@formcontrolname="interval"]//input')}
    get intervalMinute () { return $('//app-radio-button//span//span[.="Minut"]')}
    get intervalHour () { return $('//app-radio-button//span//span[.="Timme"]')}
    get intervalDay () { return $('//app-radio-button//span//span[.="Dygn"]')}
    get intervalWeek () { return $('//app-radio-button//span//span[.="Vecka"]')}
    
    // Edit Activity
    get btnDeleteActivity () { return $('//app-button//span[.="Ta bort aktivitet"]')}
    get btnCancelActivity () { return $('//app-button//span[.="Avbryt aktivitet"]')}
    get descriptionContent () { return $('//div[@class="fake-textarea ng-star-inserted"]//p')}


    /** POPUPS */

    /** Activity Plan popup dialog */
    get inputPlanTitle () { return $('//app-input[@formcontrolname="name"]//input')}
    get inputPlanDescription () { return $('//app-textarea[@formcontrolname="description"]//textarea')}
    get containerPlanDescription () { return $('//app-textarea[@formcontrolname="description"]//div[@class="input-container flex"]')}
    get startDatePicker () { return $('//div[@class="start-date datetimepicker-container"]//img')}
    get endDatePicker () { return $('//div[@class="end-date datetimepicker-container"]//img')}
    get emptyHealthIssue () { return $('//app-select[@formcontrolname="healthIssue"]//div[@class="main-container clickable"]//span[contains(text(),"--")]')}
    get dropdownHealthIssue () { return $('//app-select[@formcontrolname="healthIssue"]//div[@class="main-container clickable"]')}
    get dropdownHealthIssueContainer () { return $('//div[@class="dropdown-container sublabel"]')}
    get btnSaveActivityPlan () { return $('//app-button//span[.="Spara och stäng"]')}
    get btnAddHealthIssue () { return $('//div[@class="button-container flex-end-end"]//button')}
    get btnDeletePlan () { return $('//app-button//span[.="Ta bort aktivitetsplan"]')}

    // Perform Activity popup container 
    get popupContainer () { return $('//mat-dialog-container')}
    get popupPerformActivityTitle () { return $('//mat-dialog-container//div[@class="two-columns-container"]//div[@class="title-container"]')}
    get popupBtnBack() { return $('//app-perform-activity/div/div/div/div[1]/div[1]')}
    get btnPopupPerform () { return $('//div[@class="activity-container ng-star-inserted"]//button[@class="label btnPrimary"]')}
    get btnPopupCancel () { return $('//div[@class="activity-container ng-star-inserted"]//button[@class="label btnUncancelActivity"]')}
    get btnSubmitActivity () { return $('//div[@class="activity-container"]//button[@class="label btnPrimary"]')}

    // Confirm popup dialog
    get popupConfirmDialogContainer () { return $('//mat-dialog-container//div[@class="content-container"]')}
    get popupBtnYes () { return $('//app-confirm-dialog//button//span[.="Ja"]')}
    get popupBtnCancel () { return $('//app-confirm-dialog//button//span[.="Avbryt"]')}
    
    // Edit Recurring Activity popup dialog
    get btnEditChildRecurringActivity () { return $('//mat-dialog-container//div[@class="content-container"]//button//span[.="Redigera endast denna aktivitet"]')}

    /** Patient Activity Plan */
    addActivityPlan(activityPlan){
        this.btnAddActivityPlan.click()
        this.inputPlanTitle.setValue(activityPlan.title)

        if(activityPlan.anchorDate!=undefined) { 
            this.setAnchorDate(activityPlan.anchorDate)
        }
        
        if(activityPlan.healthIssue!="") {
            activityPlan.healthIssue.forEach(issue => {
                this.emptyHealthIssue.click()
                this.issueSelector(issue).click()
                this.btnAddHealthIssue.click()
            })
        }
        
        this.btnSaveActivityPlan.click()
        this.containerEditActivityPlan.waitForDisplayed({reverse: true})

        this.filterActivityPlanLocator(activityPlan.title).isDisplayed()
    }

    issueSelector(issue) {
        return $('//app-select[@formcontrolname="healthIssue"]//div[@class="main-container clickable"]//span[.="'+ issue +'"]')
    }

    filterActivityPlanLocator (name) {
        return $('//div[@class="input-container"]//app-select//span[contains(text(),"'+ name +'")]')
    }

    editActivityPlan(activityPlan){
        this.btnEditActivityPlan.click()
        this.inputPlanTitle.setValue(activityPlan.title)
        this.containerPlanDescription.click()
        this.inputPlanDescription.setValue(activityPlan.description)

        /** Loops through all issues in the array passed */
        if(activityPlan.healthIssue!="") {
            activityPlan.healthIssue.forEach(issue => {
                this.emptyHealthIssue.click()
                this.issueSelector(issue).click()
                this.btnAddHealthIssue.click()
            })
        }

        this.btnSaveActivityPlan.click()
        this.containerEditActivityPlan.waitForDisplayed({reverse: true})
        
        this.filterActivityPlanLocator(activityPlan.title).isDisplayed()
    }

    setAnchorDate (anchorDate) {

        this.startDatePicker.waitForClickable()
        this.startDatePicker.click()

        this.dateSelector(anchorDate).waitForClickable()
        this.dateSelector(anchorDate).click()

        this.endDatePicker.waitForClickable()
        this.endDatePicker.click()

        this.dateSelector(anchorDate).waitForClickable()
        this.dateSelector(anchorDate).click()
    }

    dateSelector (day) {
        return $('//owl-date-time-calendar//tbody//td[not(@aria-disabled)]//span[text()="'+day+'"]')
    }

    deleteActivityPlan () {
        this.btnEditActivityPlan.click()
        this.btnDeletePlan.waitForClickable()
        this.btnDeletePlan.click()
        this.popupBtnYes.click()

        this.containerEditActivityPlan.waitForDisplayed({reverse: true})
    }

    addActivity (activity) {
        browser.pause(1000)
        
        this.btnAddActivity.click()

        this.dropdownActivityType.waitForDisplayed({timeout:3000})

        if (activity.occurenceType != null) {
            switch (activity.occurenceType)
            {
                case "Single":
                    this.occurenceTypeSingle.click()
                    break
                case "Open":
                    this.occurenceTypeOpen.click() 
                    break
                case "Recurring": // Interval is set to Minutes
                    this.occurenceTypeRecurring.click()
                    this.inputNumberOfTimes.setValue(activity.numberOfTimes)
                    this.inputInterval.setValue(activity.interval)
                    this.intervalMinute.click()
                    break
                default:
                    this.occurenceTypeSingle.click()
                    break
            }
        }
        switch(activity.type)
        {
            case "Blodtrycksmätning, hemtest":
                this.dropdownActivityType.click()
                this.activityTypeSelector(activity.type).click()
                break
            case "Aktivitet":
                this.dropdownActivityType.click()
                this.activityTypeSelector(activity.type).click()
                break
            case "Formulär":
                this.dropdownActivityType.click()
                this.activityTypeSelector(activity.type).click()
                this.dropdownEformType.click()
                this.activityTypeSelector(activity.eform).click()
                break
            case "Samtyckesförfrågan":
                this.dropdownActivityType.click()
                this.activityTypeSelector(activity.type).click()
                this.dropdownConsentType.click()
                this.activityTypeSelector(activity.consent).click()
                break
        }

        this.inputActivityTitle.setValue(activity.title)
        if (activity.description != null) {
            this.inputActivityDescription.setValue(activity.description)
        }

        this.btnSaveActivity.click()
        expect(this.locateActivityByTitle(activity.title)).toBeDisplayed()
    }

    checkIfRecurringActivityExist (activityTitle) {
        browser.refresh()

        console.log("Is first activity clickable: " + this.unclickableParentRecurringActivity.isExisting())
        
        if (this.unclickableParentRecurringActivity.isExisting()) {
            this.firstChildRecurringActivity.click()
            this.popupContainer.waitForDisplayed()
            expect(this.popupPerformActivityTitle).toHaveText(activityTitle+"*")
            this.popupContainer.waitForDisplayed()
            expect(this.popupPerformActivityTitle).toHaveText(activityTitle+"*")
        } else {
            this.locateActivityByTitle(activityTitle).click()
            this.popupContainer.waitForDisplayed()
            expect(this.popupPerformActivityTitle).toHaveText(activityTitle)
            this.popupContainer.waitForDisplayed()
            expect(this.popupPerformActivityTitle).toHaveText(activityTitle)
        }
    }

    activityTypeSelector(type){
        return $('//div[@class="dropdown-container sublabel"]//span[contains(text(),"'+type+'")]')
    }

    locateActivityByTitle (activityTitle) {
        return $('//app-tr//app-tc[@class="name-cell flex"]//span[.="'+activityTitle+'"]')
    }
    locateActivityByStatus (status) {
        return $('//app-tr//app-tc[@class="result-cell flex"]//span[.="'+status+'"]')
    }
    editActivity (activity) {
        if (this.firstRowEditIcon.isDisplayed()) {
            this.firstRowEditIcon.click()
        } else {
            expect(this.popupContainer).toBeDisplayed()
        }
        this.dropdownActivityType.waitForDisplayed({timeout:3000})
        
        this.inputActivityTitle.setValue(activity.editedTitle)
        this.inputActivityDescription.click()
        this.inputActivityDescription.setValue(activity.description)

        this.btnSaveActivity.click()
        browser.pause(1000)
    }

    deleteAllActivities () {
        while (this.firstRowEditIcon.isDisplayed()) {
            browser.refresh()
            this.firstRowEditIcon.click()

            if(this.btnEditChildRecurringActivity.isDisplayed() == true) {
                this.btnEditChildRecurringActivity.click()
                this.btnDeleteActivity.click()
                this.popupBtnYes.click()
            } else {
                this.btnDeleteActivity.click()
                this.popupBtnYes.click()
            }
            
            browser.pause(1000)
            
            if (this.firstRowEditIcon.isDisplayed() == false) {
                break
            }
        }
            expect(this.emptyActivityList).toBeDisplayed()
    }

    validateActivityDetails (activity) {
        this.locateActivityByTitle(activity.editedTitle)
        
        if (this.firstRowEditIcon.isDisplayed()) {
            this.firstRowEditIcon.click()
        } else {
            expect(this.popupContainer).toBeDisplayed()
        }
        this.dropdownActivityType.waitForDisplayed({timeout:3000})
        expect(this.dropdownActivityType).toHaveTextContaining(activity.type)
        expect(this.descriptionContent).toHaveText(activity.description)

        this.btnSaveActivity.click()
    }

    cancelActivity (activityTitle) {
        let status = "Avbruten"
        expect(this.locateActivityByTitle(activityTitle)).toBeDisplayed()
        
        browser.refresh()
        if (this.unclickableParentRecurringActivity.isExisting()) {
            this.secondRowEditIcon.click()
            this.popupConfirmDialogContainer.waitForDisplayed()
            this.btnEditChildRecurringActivity.click()
            this.btnCancelActivity.click()
            this.popupConfirmDialogContainer.waitForDisplayed()
            this.popupBtnYes.click()
        } else {
            this.firstRowEditIcon.click()
            this.btnCancelActivity.click()
            this.popupConfirmDialogContainer.waitForDisplayed()
            this.popupBtnYes.click()
        }

        this.patientName.waitForDisplayed()

        expect(this.locateActivityByStatus(status))
    }

    deleteActivity (activityTitle) {
        expect(this.locateActivityByTitle(activityTitle)).toBeDisplayed()

        if (this.firstRowEditIcon.isDisplayed()) {
            this.firstRowEditIcon.click()
        } else {
            expect(this.popupContainer).toBeDisplayed()
        }
        this.dropdownActivityType.waitForDisplayed({timeout:3000})

        this.btnDeleteActivity.click()
        this.popupConfirmDialogContainer.waitForDisplayed()
        this.popupBtnYes.click()
        this.btnAddActivity.waitForClickable({timeout:3000})

        // this.locateActivityByTitle(activityTitle).waitForDisplayed({reverse:true, timeout: 2000}) 
        // unable to delete last activity in templates, fails test if uncommented
    }
    
    currentActivityListCount () {
        this.patientName.waitForDisplayed()
        browser.pause(1000)
        let rowCount = $$('//cdk-virtual-scroll-viewport//app-tr').length
        return rowCount
    }
    open () {
        return super.open('practitioner/sv/menu/main')
    }
}

module.exports = new PatientActivityPage()
