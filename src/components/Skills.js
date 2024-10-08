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
                        <h2>Skills</h2>
                        <p>Here are some of the skills I have developed over the years through various projects, jobs, and being a student.</p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={meter1} alt="Web Development Skill" />
                                <h5>Web Development</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="Backend Development Skill" />
                                <h5>Backend Development</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="Machine Learning Skill" />
                                <h5>Machine Learning Development</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="Data Structures and Algorithms Skill" />
                                <h5>Data Structures and Algorithms</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="Teaching Skill" />
                                <h5>Teaching</h5>
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
