import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png";

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Technical Skills</h2>
                        <p>Expertise across full-stack development, machine learning, cloud infrastructure, and distributed systems</p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={meter1} alt="Python" />
                                <h5>Python</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="Machine Learning" />
                                <h5>Machine Learning</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="PyTorch & TensorFlow" />
                                <h5>PyTorch & TensorFlow</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="React.js & React Native" />
                                <h5>React.js & React Native</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="Node.js & Express" />
                                <h5>Node.js & Express</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="C++ & Go" />
                                <h5>C++ & Go</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="AWS & Cloud Infrastructure" />
                                <h5>AWS & Cloud</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="Docker & CI/CD" />
                                <h5>Docker & CI/CD</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="Data Structures & Algorithms" />
                                <h5>Data Structures & Algorithms</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="Linear Algebra & Probability" />
                                <h5>Linear Algebra & Probability</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="MongoDB & PostgreSQL" />
                                <h5>MongoDB & PostgreSQL</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="GPU-Based Training" />
                                <h5>GPU Training</h5>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Background Pattern" />
    </section>
  )
}
