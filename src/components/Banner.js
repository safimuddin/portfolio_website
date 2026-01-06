import { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import DS from "../assets/img/colorfulimg.png";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);

  const toRotate = useMemo(() => ["ML Engineer", "Full-Stack Developer", "Computer Scientist", "Roboticist"], []);
  const period = 2000;

  const tick = useCallback(() => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  }, [loopNum, toRotate, isDeleting, text, period]);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [delta, tick]);

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline">This is my Portfolio</span>
            <h1>{'Hi, I\'m Safi Uddin'}</h1>
            <h2>{'ML-focused CS major && '}<span className="wrap">{text}</span></h2>
            <p>Building intelligent systems | Full-stack development | Distributed learning systems</p>
            <div className="social-links">
              <a href="tel:706-340-5999" className="social-link">📞 706-340-5999</a>
              <a href="mailto:safimuddin2005@gmail.com" className="social-link">📧 safimuddin2005@gmail.com</a>
              <a href="https://linkedin.com/in/safi-uddin-239860274/" target="_blank" rel="noopener noreferrer" className="social-link">💼 LinkedIn</a>
              <a href="https://github.com/safimuddin" target="_blank" rel="noopener noreferrer" className="social-link">🔗 GitHub</a>
              <a href="https://safimuddin.netlify.app" target="_blank" rel="noopener noreferrer" className="social-link">🌐 Website</a>
            </div>
            <button onClick={() => console.log('connect')}>Let's connect! <ArrowRightCircle size={25}/></button>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img src={DS} alt="Header Img"/>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
