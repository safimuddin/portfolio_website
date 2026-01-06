exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { message, context: resumeContext } = JSON.parse(event.body);

        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            console.error('GEMINI_API_KEY environment variable is not set');
            return {
                statusCode: 500,
                body: JSON.stringify({
                    response: "AI assistant is currently unavailable. Please try again later."
                })
            };
        }

        const systemPrompt = `You are a helpful AI assistant representing Safi Uddin's portfolio. Here is Safi's resume information:\n\n${resumeContext}\n\nAnswer questions about Safi's experience, skills, projects, and background based on this information. Be concise and helpful. Keep responses to 2-3 sentences when possible.`;

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

        return {
            statusCode: 200,
            body: JSON.stringify({ response: aiResponse })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                response: "I'm having trouble processing your question. Please try again later."
            })
        };
    }
};
