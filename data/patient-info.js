let patient = {
    personnummer: random.personnummer(),
    firstName: random.firstName(),
    lastName: random.lastName(),
    email: random.email(),
    phoneNumber: random.phoneNumber(),
    birthdate: '19010101',
    withPairingCode: false,

    editedFirstName: random.firstName(),
    editedLastName: random.lastName(),
    editedEmail: random.email(),
    editedPhoneNumber: random.phoneNumber(),
    editedBirthdate: '19990101',
}

let patientShowsFirstInTheList = {
    personnummer: "111111111111",
    firstName: "   AAA_First_Patient",
    lastName: "   AAA_First_Patient",
    email: "aaaaaaaa@aaa.aaa",
    phoneNumber: "+63 111 1111 1111",
    birthdate: '19991212',
}

let patientShowsLastInTheList = {
    personnummer: "999999999999",
    firstName: "ZZZ_Last_Patient",
    lastName: "ZZZ_Last_Patient",
    email: "zzzzzzzz@zzz.zzz",
    phoneNumber: "+63 111 1111 1111",
    birthdate: '19991212',
}

module.exports = {patient, patientShowsFirstInTheList, patientShowsLastInTheList }