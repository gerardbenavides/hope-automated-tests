const Page = require('../page');
const PatientActivityPage = require('../activity/patient-activity.page')

class ActivityTemplatePage extends Page {

    /** Top navigation */
    get btnBack () { return $('//div[@class="left-content flex-cross-center"]')}
    get title () { return $('//div[@class="table-label header-5 font-medium"]//span')}
    get btnAddTemplate () { return $('//div[@class="right-content flex-cross-center"]//span[.="Ny mall för aktivitetsplan"]')}
    get firstRowTitle () { return $('//app-table//app-tr//app-tc[@class="name-cell flex"]//span')}
    get firstRowDate () { return $('//app-table//app-tr//app-tc[@class="date-cell flex"]//span')}
    get firstRowType () { return $('//app-table//app-tr//app-tc[@class="title-cell flex"]//span')}
    
    /** Add activity template popup dialog  */ 
    get addTemplateContainer () { return $('//app-activity-plan-template-add//div[@class="content-container"]')};
    get dropdownSelectExistingTemplate () { return $('//*[@id="mat-dialog-0"]/app-activity-plan-template-add/div/div[2]/div[1]/form/div[1]/app-select/div')}
    get inputTemplateTitle () { return $('//app-input[@formcontrolname="name"]//input')}
    get inputTemplateDescription () { return $('//app-input[@formcontrolname="description"]//input')}
    get dropdownHealthIssue () { return $('//app-select[@formcontrolname="healthIssue"]//div[@class="main-container clickable"]')}
    get dropdownHealthIssueContainer () { return $('//div[@class="dropdown-container sublabel"]')}
    get emptyHealthIssue () { return $('//app-select[@formcontrolname="healthIssue"]//div[@class="main-container clickable"]//span[contains(text(),"--")]')}
    get btnAddHealthIssue () { return $('//app-activity-plan-template-add//button[@class="label btnAddNotification"]')}
    get btnSaveActivityTemplate () { return $('//app-button//span[.="Spara och stäng"]')}

    /** Edit activity template page */
    get btnDeleteTemplate () { return $('//form//app-button//button[@class="label btnDeleteNotStartedActivity"]//span[.="Radera mall"]')}
    get btnSave () { return $('//form//button[@class="label btnPrimary"]//span[.="Spara mall"]')}
    get btnImportTemplate () { return $('//div[@class="action-wrapper flex-cross-center clickable faded"]//span[.="Importera och sammanfoga mall"]')};
    
    // Template merge dialog
    get popupMergeDialogContainer () { return $('//mat-dialog-container//app-activity-plan-template-merge//div[@class="content-container"]')}
    get dropdownSelectTemplateToMerge () { return $('//mat-dialog-container//app-activity-plan-template-merge//app-select//div[@class="main-wrapper flex-cross-center"]')};
    get btnImportAndMergeTemplate () { return $('//mat-dialog-container//app-activity-plan-template-merge//button//span[.="Importera och sammanfoga"]')};

    // Confirm popup dialog
    get popupConfirmDialogContainer () { return $('//mat-dialog-container//div[@class="content-container"]')}
    get popupBtnYes () { return $('//app-confirm-dialog//button//span[.="Ja"]')}
    get popupBtnCancel () { return $('//app-confirm-dialog//button//span[.="Avbryt"]')}
    
    addActivityTemplate (template) {
        expect(this.title).toHaveText("Mallar för aktivitetsplaner");
        this.btnAddTemplate.click();
        this.addTemplateContainer.waitForDisplayed({timeout:3000});

        if (template.existingTemplate != "") {
            this.dropdownSelectExistingTemplate.click();
            this.existingTemplateSelector(template.existingTemplate).click();
        } else {
            this.inputTemplateTitle.setValue(template.title);
            this.inputTemplateDescription.setValue(template.description);
    
            if (template.healthIssue != "") {
                template.healthIssue.forEach(issue => {
                    this.emptyHealthIssue.click();
                    this.issueSelector(issue).click();
                    this.btnAddHealthIssue.click();
                })
            }
        }

        this.btnSaveActivityTemplate.click();
        this.addTemplateContainer.waitForDisplayed({reverse: true})
        this.locateTemplateByTitle(template.title).waitForDisplayed({timeout:5000});
    }
    editActivityTemplate (template) {
        this.btnDeleteTemplate.waitForDisplayed({timeout:3000})

        this.inputTemplateTitle.setValue(template.editedTitle);
        this.inputTemplateDescription.setValue(template.editedDescription);
        this.btnSave.waitForDisplayed({timeout:3000});

        this.btnSave.click();
        this.btnBack.click();
    }

    deleteActivityTemplate(title) {
        expect(this.title).toHaveText("Mallar för aktivitetsplaner");
        this.locateTemplateByTitle(title).click();
        this.btnDeleteTemplate.click();
        
        this.popupConfirmDialogContainer.waitForDisplayed({timeout:3000});
        this.popupBtnYes.click();
        this.btnAddTemplate.waitForDisplayed({timeout:3000});
        
        //this.validateTemplateNotExisting(title); issue with HS30-582
    }

    importTemplate (template) {
        this.btnImportTemplate.click();
        expect(this.popupMergeDialogContainer).toBeDisplayed();
        this.dropdownSelectTemplateToMerge.click();
        this.existingTemplateSelector(template.title).click();
        
        this.btnImportAndMergeTemplate.click();

        this.popupMergeDialogContainer.waitForDisplayed({reverse:true})
    }
    locateTemplateByTitle(title) {
        return $('//app-table//app-tr//app-tc[@class="name-cell flex"]//span[.="'+ title +'"]');
    }

    validateTemplateNotExisting(title) {
        expect(this.locateTemplateByTitle(title)).not.toBeDisplayed();
    }

    validateActivityRowDetails (activity) {
        expect(this.firstRowTitle).toHaveTextContaining(activity.title);
        switch(activity.occurenceType) {
            case "Recurring":
            case "Single":
                expect(this.firstRowDate).toHaveText("0 00:00");
                break;
            case "Open":
                expect(this.firstRowDate).toHaveText("Open activity");
                break;
        }

        switch(activity.type) {
            case "Samtyckesförfrågan":
                expect(this.firstRowType).toHaveText("Samtyckesförfrågan");
                break;
            case "Blodtrycksmätning, hemtest":
                expect(this.firstRowType).toHaveText("Blodtrycksmätning, hemtest");
                break;
            case "Formulär":
                expect(this.firstRowType).toHaveText("Formulär");
                break;
            case "Aktivitet":
                expect(this.firstRowType).toHaveText("Aktivitet");
                break;
        }
    }

    issueSelector(issue) {
        return $('//app-select[@formcontrolname="healthIssue"]//div[@class="main-container clickable"]//span[.="'+ issue +'"]');
    }
    existingTemplateSelector(template) {
        return $('//app-select//app-dropdown//span[.="'+ template +'"]');
    }



    open () {
        return super.open('practitioner/sv/menu/main');
    }
}

module.exports = new ActivityTemplatePage();
