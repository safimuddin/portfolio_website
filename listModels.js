require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('GEMINI_API_KEY not found in .env');
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.models) {
            console.log('Available models:');
            data.models.forEach(model => {
                console.log(`\n- ${model.name}`);
                console.log(`  Display Name: ${model.displayName}`);
                if (model.supportedGenerationMethods) {
                    console.log(`  Supported Methods: ${model.supportedGenerationMethods.join(', ')}`);
                }
            });
        } else if (data.error) {
            console.error('API Error:', data.error);
        } else {
            console.log('Response:', JSON.stringify(data, null, 2));
        }
    })
    .catch(error => console.error('Error:', error));
