import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import alHudaIMG from "../assets/img/alhudaimg.png";
import collafusions from "../assets/img/collafusions.jpg";
import dataStructures from "../assets/img/Data-Structure-and-Algorithm.jpg";
import waveLab from "../assets/img/waveLab.png";
import SKAPS from "../assets/img/SKAPS.jpg";
import smapp from "../assets/img/smapp.jpg";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("first");

  const projectDescriptions = {
    "Al Huda Islamic Center": "Led the software engineering team consisting of undergraduate and high school students that developed a website for our local mosque, which allows community members to donate money, contant the board members, and recieve newsletters on a weekly basis.",
    "CS 1332": "Served as a TA for Data Structures and Algorithms, otherwise known as CS 1332, providing guidance and support to students, through TA led lectures twice a week, office hours, and creating/grading homeworks which involves implementations of data structures and certain algorithms.",
    "Collafusions": "Interned at Collafusions where I contributed to the development of a website analytics service, where we utilized A/B testing and other methods to track user behaviour and inputs.",
    "UGA WAVE Lab": "Worked as a Robotics Intern at UGA WAVE Lab, where I assisted in the development of a air-pump controlled worm that tracked under ground plant growth, automated by C++.",
    "SKAPS": "Participated in a software engineering internship at SKAPS, focusing on implementing new features inside the materials database along with a team as wlel as ran integration and unit tests to ensure any updates ran smoothly.",
    "Social Media App": "Led the development of a social media app that focuses on showcasing a user's projects and ideas in a scrollable form, an AI powered project idea tool, and a collaboration tool where multiple users can form together to create projects and showcase them to the internet."
  };

  const projects = [
    { title: "Al Huda Islamic Center", description: "Software Engineer Lead", imgUrl: alHudaIMG },
    { title: "CS 1332", description: "Data Structures and Algorithms TA", imgUrl: dataStructures },
    { title: "Collafusions", description: "Software Engineer Intern", imgUrl: collafusions },
    { title: "UGA WAVE Lab", description: "Robotics Intern", imgUrl: waveLab },
    { title: "SKAPS", description: "Software Engineer Intern", imgUrl: SKAPS },
    { title: "Social Media App", description: "Software Engineering Lead", imgUrl: smapp },
  ];

  const handleSelect = (eventKey) => {
    setSelectedProject(eventKey);
  };

  const handleCardClick = (projectTitle) => {
    setSelectedProject(projectTitle);
    setActiveTab("second"); // Switch to the Summary tab
  };

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <p>Here are some of the projects/jobs that I have done over the past years.</p>
                  <Tab.Container id="projects-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Projects</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Summary</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Reflection</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {projects.map((project, index) => (
                            <ProjectCard
                              key={index}
                              {...project}
                              onClick={() => handleCardClick(project.title)}
                            />
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <DropdownButton
                          className="dropdown"
                          variant="dark"
                          data-bs-theme="dark"
                          title={selectedProject ? selectedProject : "Select Project"}
                          id="bg-nested-dropdown"
                          onSelect={handleSelect}
                        >
                          {Object.keys(projectDescriptions).map((project, index) => (
                            <Dropdown.Item eventKey={project} key={index}>{project}</Dropdown.Item>
                          ))}
                        </DropdownButton>
                        <div>
                          {selectedProject && (
                            <p>{projectDescriptions[selectedProject]}</p>
                          )}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p>Lorem ipsum dolor sit amet...</p>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
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
