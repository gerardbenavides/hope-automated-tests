const ActivityTemplatePage = require('../../pages/activity-template/activity-template.page')
const PatientActivityPage = require('../../pages/activity/patient-activity.page');

let template = require('../../../data/activity-template-info').template1;
let activity = require('../../../data/patient-activity-info').eform;

describe('Practitioner can login through Demo', () => { 
    it('Should navigate to Login page', () => {
        LoginPage.open();
        
    });
    it('Should login practitioner', () => {
        LoginPage.login();
    });
});

/** Add template with no health issues */
describe('Practitioner can Add Templates', () => {
    it('Should navigate to Activity Plan Templates page', () => {
        MenuPage.menuActivityTemplate.click();
        
    });
    it('Should add template with no Health Issue ', () => {
        template.healthIssue = [];
        ActivityTemplatePage.addActivityTemplate(template);
    });
});

/** SINGLE EFORM ACTIVITY */
describe('Practitioner can Add Single eForm Activity in the Template', () => {
    activity.occurenceType = activity.occurenceType[0];
    it('Should open the created template', () => {
        ActivityTemplatePage.locateTemplateByTitle(template.title).click();
    });
    it('Should add Single eForm activity', () => {
        PatientActivityPage.addActivity(activity)
    });
    it('Should validate added Single eForm activity exists', () => {
        expect(PatientActivityPage.locateActivityByTitle(activity.title)).toBeDisplayed();
    });
    it('Should validate added Open eForm activity\'s row details', () => {
        ActivityTemplatePage.validateActivityRowDetails(activity);
    });

});
describe('Practitioner can Edit Single eForm Activity in the Template', () => {
    it('Should open the Single eForm activity', () => {
        PatientActivityPage.locateActivityByTitle(activity.title).click();
    });
    it('Should edit Single eForm activity', () => {
        activity.description = random.paragraph();
        PatientActivityPage.editActivity(activity);
    });
    it('Should validate the edited Single eForm activity', () => {
        PatientActivityPage.locateActivityByTitle(activity.editedTitle).click();
        PatientActivityPage.validateActivityDetails(activity);
    });
});
describe('Practitioner can Delete Single eForm Activity in the Template', () => {
    it('Should open the edited Single eForm activity', () => {
        PatientActivityPage.locateActivityByTitle(activity.editedTitle).click();
    });
    it('Should delete Single eForm activity', () => {
        PatientActivityPage.deleteActivity(activity.editedTitle)
    });
    it.skip('Should validate deleted Single eForm activity does not exist', () => { // Unable to delete last activity HS30-327
        expect(PatientActivityPage.locateActivityByTitle(activity.editedTitle)).not.toBeDisplayed();

    });
});
describe('Practitioner can Delete Templates', () => {
    it('Should navigate back to template list', () => {
        ActivityTemplatePage.btnBack.click();
    });
    it('Should delete template with 1 Health Issue', () => {
        ActivityTemplatePage.deleteActivityTemplate(template.title);
    });
    it('Should validate deleted template not existing', () => {
        expect(ActivityTemplatePage.locateTemplateByTitle(template.title)).not.toBeDisplayed();
    });
});
