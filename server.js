const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to send");
    }
});

router.post("/contact", (req, res) => {
    const name = req.body.firstName + req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const mail = {
        from: name,
        to: process.env.RECIPIENT_EMAIL,
        subject: "Form Submission - Website",
        html:   `<p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Email: ${email}</p>
                <p>Email: ${email}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json(error);
        } else {
            res.json({code: 200, status: "Message Sent"});
        }
    });
});

// Ask Me endpoint for AI responses using Google Gemini
router.post("/api/ask-me", async (req, res) => {
    try {
        const { message, context } = req.body;

        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            return res.status(500).json({
                response: "AI assistant is currently unavailable. Please try again later."
            });
        }

        const systemPrompt = `You are a helpful AI assistant representing Safi Uddin's portfolio. Here is Safi's resume information:\n\n${context}\n\nAnswer questions about Safi's experience, skills, projects, and background based on this information. Be concise and helpful. Keep responses to 2-3 sentences when possible.`;

        // Append API key to URL for Gemini (using gemini-2.5-flash model)
        const urlWithKey = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        
        const geminiResponse = await fetch(urlWithKey, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `${systemPrompt}\n\nUser Question: ${message}`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                }
            })
        });

        const data = await geminiResponse.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response format from Gemini');
        }

        const aiResponse = data.candidates[0].content.parts[0].text;

        res.json({
            response: aiResponse
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            response: "I'm having trouble processing your question. Please try again later."
        });
    }
});