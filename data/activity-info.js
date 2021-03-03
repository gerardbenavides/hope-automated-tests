const parameter = require('../test/helpers/environment-variables').parameters

module.exports = {
    observation: {
        type: "Blodtrycksmätning, hemtest",
        occurenceType: ["Single", "Open", "Recurring"],
        description: null,
        systolic: "100",
        diastolic: "120",
        numberOfTimes: 5,
        interval: 1,

        get title() {
            return this.type
            },
        get editedTitle() {
            return this.title + " EDITED"
        }
    },
    general: {
        type: "Aktivitet",
        occurenceType: ["Single", "Open", "Recurring"],
        description: null,
        numberOfTimes: 5,
        interval: 1,
    
        get title() {
            return this.type
            },
        get editedTitle() {
            return this.title + " EDITED"
        }
    },
    eform: {
        type: "Formulär",
        eform: parameter.Eform,
        occurenceType: ["Single", "Open", "Recurring"],
        numberOfTimes: 5,
        interval: 1,
        description: null,
        pcrCode: "pcr-000-000-251-1",
        comment: random.paragraph(),
    
        get title() {
            return this.type + " - " + this.eform
            },
        get editedTitle() {
            return this.title + " EDITED"
        }
    },
    consent: {
        type: "Samtyckesförfrågan",
        consent: parameter.Consent,
        occurenceType: ["Single", "Open", "Recurring"],
        description: null,
        numberOfTimes: 5,
        interval: 1,
    
        get title() {
            return this.type + " - " + this.consent
            },
        get editedTitle() {
            return this.title + " EDITED"
        }
    }

}