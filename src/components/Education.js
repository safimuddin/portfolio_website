import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import colorSharp2 from "../assets/img/color-sharp2.png";

export const Education = () => {
  return (
    <section className="education" id="education">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Education</h2>
                  <div className="education-content">
                    <div className="education-item">
                      <div className="education-header">
                        <h3>Georgia Institute of Technology</h3>
                        <span className="education-period">Expected Dec 2026</span>
                      </div>
                      <p className="education-degree">Bachelor of Science in Computer Science</p>
                      <p className="education-specialization">Intelligence and Information Networks</p>
                      <p className="education-gpa">GPA: 3.83 / 4.00</p>
                      <p className="education-location">Atlanta, GA</p>
                      
                      <h5>Relevant Coursework:</h5>
                      <ul className="coursework-list">
                        <li>Data Structures and Algorithms</li>
                        <li>Systems and Networks</li>
                        <li>Object Oriented Programming</li>
                        <li>Analysis of Algorithms</li>
                        <li>Honors Linear Algebra with Proofs</li>
                        <li>Artificial Intelligence</li>
                        <li>Machine Learning</li>
                        <li>Distributed Systems</li>
                      </ul>
                    </div>
                  </div>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background Pattern" />
    </section>
  );
};
