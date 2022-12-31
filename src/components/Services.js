import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";
import { FoodCard } from "./FoodCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Services = () => {

  const projects = [
    {
      title: "Jollof Rice",
      description: "Design & Development",
      imgUrl: projImg1,
    },
    {
      title: "Egusi Soup",
      description: "Design & Development",
      imgUrl: projImg2,
    },
    {
      title: "Yam and Egg",
      description: "Design & Development",
      imgUrl: projImg3,
    },
  ];

  return (
    <section className="project" id="services">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Services</h2>
                  <p>We offer a wide range of services as seen below: </p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Food Bot Recipe Finder</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Recipe Marketplace</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Speak with a Dietician</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="fourth">Recipe API</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fifth">Meal Game</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="sixth">Foodie Community</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <p>With our FoodBot Recipe Finder, You have access to a lot of recipes for free by
                          chatting with Ghosa, your Chef Bot Friend. Examples include: </p>
                        <Row>
                          {/* {
                            projects.map((project, index) => {
                              return (
                                <FoodCard
                                  key={index}
                                  {...project}
                                />
                              )
                            })
                          } */}
                          <Link to="/chat">
                            <Button variant="outline-secondary" size="lg" className="vvd">
                              <span>Chat with Ghosa  <ArrowRightCircle size={25} /></span>
                            </Button>
                          </Link>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <p>With our Recipe Marketplace, You can buy the exact recipe you need
                          to prepare a meal at the required quantity you require: </p>
                        <Link to="/coming-soon">
                          <Button variant="outline-secondary" size="lg" className="vvd">
                            <span>Visit Recipe Marketplace  <ArrowRightCircle size={25} /></span>
                          </Button>
                        </Link>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p>Food choices can affect your health condition,  A registered dietitian can 
                          help tailor an eating and exercise plan for burning more calories than you take in.
                          You can speak with a registered dietician here: </p>
                        <Link to="/coming-soon">
                          <Button variant="outline-secondary" size="lg" className="vvd">
                            <span>Speak with a Dietician  <ArrowRightCircle size={25} /></span>
                          </Button>
                        </Link>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <p>With our Recipe API, You can have access to our recipes on your platform
                          with our simple to integrate APIs. Discuss with us today: </p>
                        <Link to="/coming-soon">
                          <Button variant="outline-secondary" size="lg" className="vvd">
                            <span>See API Documentation  <ArrowRightCircle size={25} /></span>
                          </Button>
                        </Link>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fifth">
                        <p>Play meal games around making a meal calender or making Ghosa decide what you going to eat for the day..</p>
                        <Link to="/coming-soon">
                          <Button variant="outline-secondary" size="lg" className="vvd">
                            <span>Play Meal Games  <ArrowRightCircle size={25} /></span>
                          </Button>
                        </Link>
                      </Tab.Pane>
                      <Tab.Pane eventKey="sixth">
                        <p>Interact with our Community of foodies. Carry out games on best cooks,
                          best recipes and outcomes. Have fun. </p>
                        <Link to="/coming-soon">
                          <Button variant="outline-secondary" size="lg" className="vvd">
                            <span>Join the Community  <ArrowRightCircle size={25} /></span>
                          </Button>
                        </Link>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img alt="" className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
