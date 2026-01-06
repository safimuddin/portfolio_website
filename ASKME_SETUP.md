# Ask Me - AI Assistant Setup Guide

## Overview
The "Ask Me" section is an interactive Q&A feature that uses AI to answer questions about your resume, experience, projects, and background.

## How It Works
1. User asks a question in the chat interface
2. Question is sent to the backend API
3. Backend uses Google's Gemini API to generate a contextual response based on your resume data
4. Response is displayed in the chat

## Setup Instructions

### 1. Get Google Gemini API Key
1. Go to: https://ai.google.dev/
2. Click "Get API Key"
3. Create a new API key for your project
4. Copy the key

### 2. Create Environment Variables
Create a `.env` file in your project root:
```
GEMINI_API_KEY=your_api_key_here
```

### 3. Server Configuration
The `server.js` already has the `/api/ask-me` endpoint configured to use Gemini. It will:
- Accept user messages
- Use Gemini Pro model (free tier available!)
- Reference your resume context for accurate responses
- Return AI-generated answers

### 4. Features Included

✅ **Interactive Chat Interface**
- Real-time message display
- Typing indicator for AI responses
- Smooth animations
- Mobile responsive

✅ **Smart Suggestions**
- Pre-populated questions on first load
- Click to ask suggested questions
- Examples cover:
  - Technical skills
  - ML experience
  - Projects
  - Education
  - Programming languages
  - Work experience

✅ **Resume Context**
- AI has knowledge of:
  - All your experiences
  - Projects and achievements
  - Technical skills
  - Education details
  - Company roles and accomplishments

## Advantages of Gemini

✨ **Free Tier Available**
- 60 requests per minute
- Perfect for portfolio portfolios
- No credit card required initially

💰 **Cost Effective**
- Much cheaper than other APIs
- Excellent performance
- Your existing credits work great

⚡ **Fast & Reliable**
- Quick response times
- High-quality responses
- Easy integration

## Deployment Notes

**For Netlify (Frontend):**
- The component will work as-is
- Ensure API calls point to correct backend

**For Backend:**
- Deploy to Heroku, Railway, or similar
- Add `GEMINI_API_KEY` to environment variables
- Update the API endpoint if needed (currently `/api/ask-me`)

## Testing Locally

1. Create `.env` file with your Gemini API key
2. Start your backend server:
```bash
npm install
node server.js
```

3. In another terminal, start React:
```bash
npm start
```

4. Navigate to the "Ask Me" section
5. Type a question like "What are your main skills?"
6. Wait for AI response

## Customization

Edit the `resumeContext` in `src/components/AskMe.js` to:
- Add more details
- Update project descriptions
- Change skill categories
- Add new achievements

The AI will learn from this context to answer more accurately.

## Troubleshooting

**No AI responses?**
- Verify API key is correct in `.env`
- Check if backend is running
- Check browser console for errors
- Verify the API key has access to Gemini API

**Rate limited?**
- Free tier has 60 requests/minute limit
- Wait a minute before trying again
- Consider upgrading for higher limits

**Slow responses?**
- Gemini is generally fast (1-2 seconds)
- Can vary based on complexity
- Consider adding loading messages

**Questions out of context?**
- Update the resume context in `AskMe.js`
- Provide more specific information
- Test with different question formats

## Files Modified

- `src/components/AskMe.js` - Chat component
- `src/App.js` - Added AskMe component
- `src/App.css` - Chat styling
- `src/components/NavBar.js` - Added Ask Me link
- `server.js` - Added `/api/ask-me` endpoint for Gemini

## Alternative: Switch Back to OpenAI

If you want to use OpenAI later, simply:
1. Change `GEMINI_API_KEY` to `OPENAI_API_KEY` in `.env`
2. Replace the endpoint logic in `server.js` with OpenAI format
3. The frontend component stays the same!

## Monitor Usage

- Gemini: https://ai.google.dev/
- Check your quota and usage
- Free tier updates in real-time

## Cost Estimate

With Gemini's free tier, you can handle thousands of user interactions per month with no cost!

## Next Steps

1. Get your Gemini API key
2. Add it to `.env` as `GEMINI_API_KEY`
3. Deploy backend with the key
4. Test thoroughly
5. Monitor usage on Google AI dashboard
