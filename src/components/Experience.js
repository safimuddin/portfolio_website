import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import colorSharp from "../assets/img/color-sharp.png";

export const Experience = () => {
  const experiences = [
    {
      company: "NCR Voyix",
      position: "Mobile and Backend Engineering Intern",
      location: "Atlanta, GA",
      period: "May 2025 - Aug 2025",
      achievements: [
        "Built high performance APIs for financial transaction services that reduced latency and lowered failure rates for mobile clients.",
        "Debugged device side networking and optimized backend data flows to improve reliability and overall transaction success.",
        "Collaborated with engineering and design teams in Agile sprints to align backend architecture with secure and scalable mobile systems."
      ]
    },
    {
      company: "Molecular Evolution Core Laboratory",
      position: "Software Engineer - Mobile and Cloud Integration",
      location: "Atlanta, GA",
      period: "Jan 2025 - Present",
      achievements: [
        "Developed React Native interfaces for real time lab analytics that improved accessibility and increased engagement from research staff.",
        "Integrated OAuth and JWT authentication with cloud hosted APIs, reducing request failures and strengthening security.",
        "Optimized data processing and rendering pipelines for mobile devices, improving load time and responsiveness in scientific dashboards."
      ]
    },
    {
      company: "Georgia Institute of Technology",
      position: "Teaching Assistant - CS 1332 & CS 3600",
      location: "Atlanta, GA",
      period: "May 2024 - Present",
      achievements: [
        "Led discussions on algorithm design, complexity analysis, object oriented programming, and AI fundamentals for more than 100 students.",
        "Provided code review, debugging guidance, and algorithmic support that improved student comprehension and code quality.",
        "Supported development of course tooling and grading systems to improve instructional scalability and student engagement."
      ]
    },
    {
      company: "University of Georgia",
      position: "Robotics Researcher",
      location: "Athens, GA",
      period: "Jun 2022 - Jun 2023",
      achievements: [
        "Programmed a silicone air pumped soft robotic worm in C++ on a Raspberry Pi to analyze root growth and plant health using sensor driven data.",
        "Created visualization tools, preprocessing utilities, and statistical models used in published research on soft robotics and plant phenotyping.",
        "Implemented real time control logic and data logging systems that increased reliability and measurement accuracy."
      ]
    }
  ];

  return (
    <section className="experience" id="experience">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Professional Experience</h2>
                  <p>Building scalable systems and advancing technology across multiple domains</p>
                  <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                      <div key={index} className="experience-item">
                        <div className="experience-header">
                          <h4>{exp.company}</h4>
                          <span className="experience-period">{exp.period}</span>
                        </div>
                        <p className="experience-position">{exp.position}</p>
                        <p className="experience-location">{exp.location}</p>
                        <ul className="experience-achievements">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
