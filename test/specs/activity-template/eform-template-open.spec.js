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

/** Add template with 1 health issue*/
describe('Practitioner can Add Templates', () => {
    it('Should navigate to Activity Plan Templates page', () => {
        MenuPage.menuActivityTemplate.click(); 
    });
    it('Should add template with 1 Health Issue ', () => {
        template.healthIssue = ["Stroke"];
        ActivityTemplatePage.addActivityTemplate(template);
    });
});

/** OPEN EFORM ACTIVITY */
describe('Practitioner can Add Open eForm Activity in the Template', () => {
    activity.occurenceType = activity.occurenceType[1];
    it('Should open the created template', () => {
        ActivityTemplatePage.locateTemplateByTitle(template.title).click();
    });
    it('Should add Open eForm activity', () => {
        PatientActivityPage.addActivity(activity)
    });
    it('Should validate added Open eForm activity exists', () => {
        expect(PatientActivityPage.locateActivityByTitle(activity.title)).toBeDisplayed();
    });
    it('Should validate added Open eForm activity\'s row details', () => {
        ActivityTemplatePage.validateActivityRowDetails(activity);
    });

});
describe('Practitioner can Edit Open eForm Activity in the Template', () => {
    it('Should open the Open eForm activity', () => {
        PatientActivityPage.locateActivityByTitle(activity.title).click();
    });
    it('Should edit Open eForm activity', () => {
        activity.description = random.paragraph();
        PatientActivityPage.editActivity(activity);
    });
    it('Should validate the edited Open eForm activity', () => {
        PatientActivityPage.locateActivityByTitle(activity.editedTitle).click();
        PatientActivityPage.validateActivityDetails(activity);
    });
});
describe('Practitioner can Delete Open eForm Activity in the Template', () => {
    it('Should open the edited Open eForm activity', () => {
        PatientActivityPage.locateActivityByTitle(activity.editedTitle).click();
    });
    it('Should delete Open eForm activity', () => {
        PatientActivityPage.deleteActivity(activity.editedTitle)
    });
    it.skip('Should validate deleted Open eForm activity does not exist', () => { // Unable to delete last activity HS30-327
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
