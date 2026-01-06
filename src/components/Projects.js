import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowUpRight } from 'react-bootstrap-icons';
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Financial Forecasting with Sentiment Analysis",
      category: "ML & NLP",
      description: "Stock movement classifier using sentiment analysis with historical data",
      fullDescription: "Constructed a sentiment enhanced stock movement classifier using historical SPY data and labeled financial news headlines. Engineered technical and sentiment features and trained Logistic Regression, Random Forest, and SVM models with temporal validation. Achieved up to 0.79 F1 score and 0.87 AUC ROC.",
      tags: ["Python", "scikit-learn", "NLP", "Pandas", "Financial Data"],
      color: "#AA367C",
      featured: true
    },
    {
      id: 2,
      title: "CSVistool",
      category: "Data Visualization",
      description: "Real-time dataset processing and visualization platform",
      fullDescription: "Developed backend services using Node.js and MongoDB to process and visualize large structured datasets in real time. Containerized and deployed services with Docker to ensure reproducible and reliable execution across environments.",
      tags: ["React.js", "Node.js", "MongoDB", "Docker", "Express"],
      color: "#4A2FBD",
      featured: true
    },
    {
      id: 3,
      title: "Connexya",
      category: "ML Platform",
      description: "ML-powered mobile platform for intelligent project matching",
      fullDescription: "Built an ML powered mobile platform using recommendation models for intelligent project matching and collaboration. Deployed real time inference pipelines with scalable APIs to generate content suggestions under peak load.",
      tags: ["React Native", "Python", "Node.js", "PyTorch", "APIs"],
      color: "#AA367C",
      featured: true
    },
    {
      id: 4,
      title: "Al Huda Islamic Center",
      category: "Web Development",
      description: "Full-featured website with donations and community features",
      fullDescription: "Led the software engineering team consisting of undergraduate and high school students that developed a website for our local mosque, which allows community members to donate money, contact board members, and receive newsletters.",
      tags: ["Web Development", "Leadership", "Community"],
      color: "#4A2FBD",
      featured: false
    },
    {
      id: 5,
      title: "CS 1332 Teaching Assistant",
      category: "Education",
      description: "Guided 100+ students through DSA fundamentals",
      fullDescription: "Served as a TA for Data Structures and Algorithms, providing guidance through TA-led lectures, office hours, and creating/grading homeworks. Provided code review, debugging guidance, and algorithmic support.",
      tags: ["Teaching", "DSA", "Python", "Java"],
      color: "#AA367C",
      featured: false
    },
    {
      id: 6,
      title: "UGA WAVE Lab",
      category: "Robotics",
      description: "Air-pump controlled worm for plant root growth analysis",
      fullDescription: "Programmed a silicone air-pumped soft robotic worm in C++ on a Raspberry Pi to analyze root growth and plant health. Created visualization tools and statistical models used in published research.",
      tags: ["C++", "Robotics", "Raspberry Pi", "Research"],
      color: "#4A2FBD",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Featured Projects</h2>
                  <p>Highlighting my most impactful work across machine learning, full-stack development, and innovative platforms</p>

                  {/* Featured Projects Grid */}
                  <div className="featured-projects-grid">
                    {featuredProjects.map((project) => (
                      <div
                        key={project.id}
                        className="project-card-featured"
                        onMouseEnter={() => setHoveredId(project.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                      >
                        <div className="project-card-header">
                          <h3>{project.title}</h3>
                          <span className="project-category">{project.category}</span>
                        </div>
                        
                        <p className="project-description">{project.description}</p>

                        <div className="project-tags">
                          {project.tags.map((tag, idx) => (
                            <span key={idx} className="tag">{tag}</span>
                          ))}
                        </div>

                        {selectedProject === project.id && (
                          <div className="project-expanded">
                            <p className="full-description">{project.fullDescription}</p>
                          </div>
                        )}

                        <div className="project-card-footer">
                          <ArrowUpRight size={20} className={hoveredId === project.id ? "active" : ""} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Other Projects */}
                  <div className="other-projects-section">
                    <h3>Other Notable Work</h3>
                    <div className="other-projects-list">
                      {otherProjects.map((project) => (
                        <div
                          key={project.id}
                          className="project-item-minimal"
                          onMouseEnter={() => setHoveredId(project.id)}
                          onMouseLeave={() => setHoveredId(null)}
                        >
                          <div className="project-item-left">
                            <h4>{project.title}</h4>
                            <p>{project.description}</p>
                            <div className="project-tags-mini">
                              {project.tags.slice(0, 3).map((tag, idx) => (
                                <span key={idx} className="tag-mini">{tag}</span>
                              ))}
                            </div>
                          </div>
                          <div className="project-item-right">
                            <span className="category-badge">{project.category}</span>
                            <ArrowUpRight size={20} className={hoveredId === project.id ? "active" : ""} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background" />
    </section>
  );
};
