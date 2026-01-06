import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import navIcon1 from '../assets/img/nav-icon1.svg';

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const handleNavClick = (target) => {
    onUpdateActiveLink(target);
    
    // If target is 'globe', navigate to globe page
    if (target === 'globe') {
      navigate('/globe');
    } 
    // If target is 'home', navigate to home page
    else if (target === 'home') {
      navigate('/');
    }
    // For other targets, scroll to the section
    else {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>Home</Nav.Link>
            <Nav.Link className={activeLink === 'education' ? 'active navbar-link' : 'navbar-link'} onClick={() => handleNavClick('education')} style={{ cursor: 'pointer' }}>Education</Nav.Link>
            <Nav.Link className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => handleNavClick('skills')} style={{ cursor: 'pointer' }}>Skills</Nav.Link>
            <Nav.Link className={activeLink === 'experience' ? 'active navbar-link' : 'navbar-link'} onClick={() => handleNavClick('experience')} style={{ cursor: 'pointer' }}>Experience</Nav.Link>
            <Nav.Link className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => handleNavClick('projects')} style={{ cursor: 'pointer' }}>Projects</Nav.Link>
            <Nav.Link className={activeLink === 'globe' ? 'active navbar-link' : 'navbar-link'} onClick={() => handleNavClick('globe')} style={{ cursor: 'pointer' }}>Global</Nav.Link>
            <Nav.Link className={activeLink === 'ask-me' ? 'active navbar-link' : 'navbar-link'} onClick={() => handleNavClick('ask-me')} style={{ cursor: 'pointer' }}>Ask Me</Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/safi-uddin-239860274/" target="_blank" rel="noopener noreferrer">
                <img src={navIcon1} alt="LinkedIn" />
              </a>
            </div>
            <button className="vvd" onClick={() => handleNavClick('ask-me')}><span>Let's Connect</span></button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
