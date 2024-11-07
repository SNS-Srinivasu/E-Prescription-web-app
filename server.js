const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 8080;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname)));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index1.html'));
});


const db = new sqlite3.Database('./prescriptions.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the prescriptions database.');
});

db.run(`CREATE TABLE IF NOT EXISTS prescriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_name TEXT,
    license_number TEXT,
    clinic_address TEXT,
    doctor_email TEXT,
    doctor_phone TEXT,
    patient_name TEXT,
    dob TEXT,
    sex TEXT,
    patient_address TEXT,
    patient_email TEXT,
    patient_phone TEXT,
    insurance_info TEXT,
    medication TEXT,
    dosage TEXT,
    frequency TEXT,
    instructions TEXT,
    remarks TEXT,
    doctor_signature TEXT,
    signature TEXT
)`);


app.post('/submit', (req, res) => {

    const {
        'doctor-name': doctorName,
        'license-number': licenseNumber,
        'clinic-address': clinicAddress,
        'doctor-email': doctorEmail,
        'doctor-phone': doctorPhone,
        'patient-name': patientName,
        dob,
        sex,
        'patient-address': patientAddress,
        'patient-email': patientEmail,
        'patient-phone': patientPhone,
        'insurance-info': insuranceInfo,
        medication,
        dosage,
        frequency,
        instructions,
        remarks,
        'doctor-signature': doctorSignature,
        signature,
    } = req.body;

    const query = `INSERT INTO prescriptions (doctor_name, license_number, clinic_address, doctor_email, doctor_phone,
        patient_name, dob, sex, patient_address, patient_email, patient_phone, insurance_info,
        medication, dosage, frequency, instructions, remarks, doctor_signature, signature)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(query, [
        doctorName, licenseNumber, clinicAddress, doctorEmail, doctorPhone,
        patientName, dob, sex, patientAddress, patientEmail, patientPhone,
        insuranceInfo, medication, dosage, frequency, instructions, remarks,
        doctorSignature, signature
    ], function(err) {
        if (err) {
            return res.status(500).send('Error saving data: ' + err.message);
        }
        res.send('Data securely stored in the database');
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

