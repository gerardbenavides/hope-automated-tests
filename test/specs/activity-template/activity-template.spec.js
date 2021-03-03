const ActivityTemplatePage = require('../../pages/activity-template/activity-template.page')
const PatientActivityPage = require('../../pages/activity/patient-activity.page')

let template1 = require('../../../data/activity-template-info').template1;
let template2 = require('../../../data/activity-template-info').template2;
let observationActivity = require('../../../data/activity-info').observation;
let eformActivity = require('../../../data/activity-info').eform;

describe('Practitioner can login through Demo', () => { 
    it('Should navigate to Login page', () => {
        LoginPage.open();
    });
    it('Should login practitioner', () => {
        LoginPage.login();
    });
});

describe('Practitioner can Add Templates', () => {
    it('Should navigate to Activity Plan Templates page', () => {
        MenuPage.menuActivityTemplate.click();      
    });
    it('Should add template with no Health Issue ', () => {
        template1.healthIssue = [""]
        ActivityTemplatePage.addActivityTemplate(template1);
    });
    it('Should delete the added template', () => {
        ActivityTemplatePage.deleteActivityTemplate(template1.title)
    });
});
describe('Practitioner can add multiple Health Issues', () => {
    
    it('Should add template with multiple Health Issues ', () => {
        template1.healthIssue = ["Stroke", "Psoriasis", "Astma"]
        ActivityTemplatePage.addActivityTemplate(template1);
    });
    it('Should validate template with multiple Health Issues\' exists ', () => {
        expect(ActivityTemplatePage.locateTemplateByTitle(template1.title)).toBeDisplayed();
    });
});
describe('Practitioner can Rename Templates', () => {
    it('Should rename the added template', () => {
        ActivityTemplatePage.locateTemplateByTitle(template1.title).click();
        ActivityTemplatePage.editActivityTemplate(template1);
    });
    it('Should validate the renamed template exists', () => {
        expect(ActivityTemplatePage.locateTemplateByTitle(template1.editedTitle)).toBeDisplayed();
    });
    it('Should delete the added template', () => {
        ActivityTemplatePage.deleteActivityTemplate(template1.editedTitle)
    });
});

describe('Practitioner can add an Activity Plan Template from an existing template', () => {
    it('Should add template with 1 Health Issues ', () => {
        template1.healthIssue = ["Stroke"];
        ActivityTemplatePage.addActivityTemplate(template1);
    });
    it('Should add an activity from to existing template', () => {
        ActivityTemplatePage.locateTemplateByTitle(template1.title).click();
        PatientActivityPage.addActivity(observationActivity);
        
    });
    it('Should validate added activity exists ', () => {
        expect(PatientActivityPage.locateActivityByTitle(observationActivity.title)).toBeDisplayed();
        ActivityTemplatePage.btnBack.click();
        expect(ActivityTemplatePage.locateTemplateByTitle(template1.title)).toBeDisplayed();
    });
    it('Should add a new template using an existing added template', () => {
        template1.existingTemplate = template1.title;
        browser.refresh();
        ActivityTemplatePage.addActivityTemplate(template1);
    });
    it('Should validate the added template exists', () => {
        expect(ActivityTemplatePage.locateTemplateByTitle(template1.existingTemplate)).toBeDisplayed();
    });
    it('Should validate the template contains the added activity', () => {
        ActivityTemplatePage.locateTemplateByTitle(template1.existingTemplate).click();
        expect(PatientActivityPage.locateActivityByTitle(observationActivity.title)).toBeDisplayed();
        ActivityTemplatePage.btnBack.click();
    });
    it('Should delete the existing template', () => {
        ActivityTemplatePage.deleteActivityTemplate(template1.existingTemplate)
    });
});
describe('Practitioner can Merge Templates', () => {
    it('Should add a template', () => {
        browser.refresh();
        ActivityTemplatePage.addActivityTemplate(template2);
    });
    it('Should add different activity to the template', () => {
        ActivityTemplatePage.locateTemplateByTitle(template2.title).click();

        eformActivity.occurenceType = eformActivity.occurenceType[0];
        PatientActivityPage.addActivity(eformActivity);
        expect(PatientActivityPage.locateActivityByTitle(eformActivity.title)).toBeDisplayed();

        
        eformActivity.occurenceType = eformActivity.occurenceType[1];
        PatientActivityPage.addActivity(eformActivity);
        expect(PatientActivityPage.locateActivityByTitle(eformActivity.title)).toBeDisplayed();

        eformActivity.occurenceType = eformActivity.occurenceType[2];
        PatientActivityPage.addActivity(eformActivity);
        expect(PatientActivityPage.locateActivityByTitle(eformActivity.title)).toBeDisplayed();

    });
    it('Should merge another template', () => {
        ActivityTemplatePage.importTemplate(template1);
    });
    it('Should validate merged template activities', () => {
        expect(PatientActivityPage.locateActivityByTitle(observationActivity.title)).toBeDisplayed();
    });
    it('Should delete the added template', () => {
        ActivityTemplatePage.btnBack.click();
        ActivityTemplatePage.deleteActivityTemplate(template1.title)
        ActivityTemplatePage.deleteActivityTemplate(template2.title)
    });
});
describe('Practitioner can Delete Templates', () => {
    it('Should add template with 1 Health Issue ', () => {
        template2.healthIssue = ["Stroke"];
        ActivityTemplatePage.addActivityTemplate(template2);
    });
    it('Should delete template with 1 Health Issue ', () => {
        ActivityTemplatePage.deleteActivityTemplate(template2.title)
    });
    it('Should add template with no Health Issue ', () => {
        template2.healthIssue = [""]
        ActivityTemplatePage.addActivityTemplate(template2);
    });
    it('Should delete the added template', () => {
        ActivityTemplatePage.deleteActivityTemplate(template2.title)
    });
    it('Should add template with multiple Health Issues ', () => {
        template2.healthIssue = ["Stroke", "Psoriasis", "Astma"]
        ActivityTemplatePage.addActivityTemplate(template2);
    });
    it('Should delete template with multiple Health Issues ', () => {
        ActivityTemplatePage.deleteActivityTemplate(template2.title)
    });
});
