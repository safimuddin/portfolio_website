import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Send, Lightbulb } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import colorSharp from "../assets/img/color-sharp.png";

export const AskMe = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm an AI assistant trained on Safi's resume and projects. Ask me anything about his experience, skills, projects, or background!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  const suggestions = [
    "What are Safi's main technical skills?",
    "Tell me about his machine learning experience",
    "What projects has he built recently?",
    "What's his educational background?",
    "What programming languages does he know?",
    "Describe his experience at NCR Voyix"
  ];

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Only scroll on subsequent message updates, not on initial mount
    if (messages.length > 1) {
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    }
  }, [messages]);

  const resumeContext = `
Safi Uddin is a Machine Learning-focused Computer Science major at Georgia Institute of Technology with a GPA of 3.83/4.00, expected to graduate in December 2026.

Technical Skills:
- Programming: Python, C++, Go, Java, Shell scripting
- ML/AI: PyTorch, TensorFlow, scikit-learn, deep neural networks, model training & evaluation, hyperparameter tuning
- Web: React.js, React Native, Node.js, Express, MongoDB, PostgreSQL, MySQL
- DevOps: Docker, AWS, CI/CD pipelines, GPU-based training
- Core: Data structures, algorithms, linear algebra, probability, optimization

Experience:
1. NCR Voyix (May-Aug 2025): Mobile and Backend Engineering Intern
   - Built high performance APIs for financial transaction services
   - Debugged device side networking and optimized backend data flows
   - Collaborated in Agile sprints

2. Molecular Evolution Core Laboratory (Jan 2025-Present): Software Engineer
   - Developed React Native interfaces for real-time lab analytics
   - Integrated OAuth and JWT authentication with cloud APIs
   - Optimized data processing pipelines for mobile

3. Georgia Tech (May 2024-Present): Teaching Assistant (CS 1332 & CS 3600)
   - Led discussions on algorithm design, complexity analysis, OOP, AI
   - Provided code review and debugging guidance to 100+ students

4. University of Georgia (Jun 2022-Jun 2023): Robotics Researcher
   - Programmed soft robotic worm in C++ on Raspberry Pi
   - Created visualization tools and statistical models for published research

Featured Projects:
1. Financial Forecasting with Sentiment Analysis
   - Sentiment-enhanced stock classifier using NLP
   - Achieved 0.79 F1 score and 0.87 AUC ROC

2. CSVistool
   - Real-time dataset processing and visualization platform
   - Node.js, MongoDB, Docker, Express

3. Connexya
   - ML-powered mobile platform for project matching and collaboration
   - React Native, Python, PyTorch, real-time inference pipelines

Education:
- Georgia Institute of Technology, BS Computer Science
- Intelligence and Information Networks specialization
- Relevant coursework: DSA, Systems, OOP, Analysis of Algorithms, Linear Algebra, AI, ML, Distributed Systems
  `;

  const generateAIResponse = async (userMessage) => {
    try {
      setLoading(true);

      // Call Netlify function
      const response = await fetch('/.netlify/functions/ask-me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: resumeContext
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error:', error);
      return "I apologize, but I'm having trouble connecting to my AI assistant. Please try again later or reach out directly at safimuddin2005@gmail.com";
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowSuggestions(false);

    // Generate AI response
    const aiResponse = await generateAIResponse(messageText);

    const aiMessage = {
      id: messages.length + 2,
      text: aiResponse,
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setLoading(false);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <section className="ask-me" id="ask-me">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Ask Me Anything</h2>
                  <p>Curious about my experience, skills, or projects? Ask away!</p>

                  <div className="chat-container">
                    <div className="chat-messages" ref={chatMessagesRef}>
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
                        >
                          <div className="message-content">
                            <p>{message.text}</p>
                          </div>
                        </div>
                      ))}
                      {loading && (
                        <div className="message ai-message loading">
                          <div className="message-content">
                            <div className="typing-indicator">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {showSuggestions && messages.length === 1 && (
                      <div className="suggestions-grid">
                        <p className="suggestions-title">
                          <Lightbulb size={18} /> Suggested questions:
                        </p>
                        <div className="suggestions">
                          {suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              className="suggestion-btn"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="chat-input-container">
                      <div className="chat-input-wrapper">
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
                          placeholder="Ask me about my experience, skills, or projects..."
                          disabled={loading}
                          className="chat-input"
                        />
                        <button
                          onClick={() => handleSendMessage(input)}
                          disabled={loading || !input.trim()}
                          className="send-btn"
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-left" src={colorSharp} alt="Background Pattern" />
    </section>
  );
};
