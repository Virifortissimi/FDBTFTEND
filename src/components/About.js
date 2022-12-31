import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';

export const About = () => {
  return (
    <section className="contact" id="about">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <h2 className={"animate__animated animate__zoomIn"}>ABOUT US</h2>
          </Col>
          <Col size={12} md={6}>
            <p className={"animate__animated animate__zoomIn"}>Have fun deciding what to eat, getting the recipes and preparing your meals with Ivie and in one app...
            Have fun deciding what to eat, getting the recipes and preparing your meals with Ivie and in one app...</p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
