const ActivityTemplatePage = require('../../pages/activity-template/activity-template.page')
const PatientActivityPage = require('../../pages/activity/patient-activity.page');

let template = require('../../../data/activity-template-info').template1;
let activity = require('../../../data/patient-activity-info').general;

describe('Practitioner can login through Demo', () => { 
    it('Should navigate to Login page', () => {
        LoginPage.open();
    });
    it('Should login practitioner', () => {
        LoginPage.login();
    });
});

/** Add template with multiple health issues*/
describe('Practitioner can Add Templates', () => {
    it('Should navigate to Activity Plan Templates page', () => {
        MenuPage.menuActivityTemplate.click();
    });
    it('Should add template with 1 Health Issue ', () => {
        template.healthIssue = ["Stroke", "Psoriasis", "Astma"];
        ActivityTemplatePage.addActivityTemplate(template);
    });
});
/** RECURRING GENERAL ACTIVITY */
describe('Practitioner can Add Recurring General Activity in the Template', () => {
    activity.occurenceType = activity.occurenceType[2];
    it('Should open the created template', () => {
        ActivityTemplatePage.locateTemplateByTitle(template.title).click();
    });
    it('Should add Recurring General activity', () => {
        PatientActivityPage.addActivity(activity)
    });
    it('Should validate added Recurring General activity exists', () => {
        expect(PatientActivityPage.locateActivityByTitle(activity.title)).toBeDisplayed();
    });
    it('Should validate added Recurring General activity\'s row details', () => {
        ActivityTemplatePage.validateActivityRowDetails(activity);
    });

});
describe('Practitioner can Edit Recurring General Activity in the Template', () => {
    it('Should open the Recurring General activity', () => {
        PatientActivityPage.locateActivityByTitle(activity.title).click();
    });
    it('Should edit Recurring General activity', () => {
        activity.description = random.paragraph();
        PatientActivityPage.editActivity(activity);
    });
    it('Should validate the edited Recurring General activity', () => {
        PatientActivityPage.locateActivityByTitle(activity.editedTitle).click();
        PatientActivityPage.validateActivityDetails(activity);
    });
});
describe('Practitioner can Delete ORecurringpen General Activity in the Template', () => {
    it('Should open the edited Recurring General activity', () => {
        PatientActivityPage.locateActivityByTitle(activity.editedTitle).click();
    });
    it('Should delete Recurring General activity', () => {
        PatientActivityPage.deleteActivity(activity.editedTitle)
    });
    it.skip('Should validate deleted Recurring General activity does not exist', () => { // Unable to delete last activity HS30-327
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