import React from "react";
import ProgressBar from "./Progress";
import image from "../assets/img/image.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Skills (){
    
    return (
      <section id="skills" class="skills section-bg bg-light">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Skills</h2>
            <p>Feeling Camera Shy? Choose an emotion below:</p>
          </div>
          <div class="row skills-content">
            <div className="text-center col-lg-5  pt-lg-0 m-3 content">
              <h3>Our Recommendation</h3>
              <div className="row">
                <div className="col-12 text-center px-5">
                  <Card style={{ width: "100%" }}>
                    <Card.Img
                      style={{ maxHeight: "300px" }}
                      variant="top"
                      src={image}
                    />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
                <label class="form-check-label" for="inlineRadio1">1</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
                <label class="form-check-label" for="inlineRadio2">2</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled></input>
                <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
    
}