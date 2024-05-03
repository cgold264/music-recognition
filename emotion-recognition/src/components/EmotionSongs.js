import React from "react";
import image from "../assets/img/image.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Skills (){
    
    return (
      <section id="emotion" class="skills section-bg bg-light">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Skills</h2>
            <p>Feeling Camera Shy?</p>
          </div>
          <div class="row skills-content">
            <div className="text-center col-lg-5  p-0 m-3 content">
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
              <div className="row">
                <h3>Choose all the emotions that apply:</h3>
              </div>
              <div className="btn-group">
                <div className="row m-3">
                    <input
                      type="radio"
                      class="btn-check"
                      name="options"
                      id="option1"
                      autocomplete="off"
                    />
                    <label
                      class="btn btn-secondary"
                      for="option1"
                      data-mdb-ripple-init
                    >
                      Checked
                    </label>
                    <input
                      type="radio"
                      class="btn-check"
                      name="options"
                      id="option2"
                      autocomplete="off"
                    />
                    <label
                      class="btn btn-secondary"
                      for="option2"
                      data-mdb-ripple-init
                    >
                      Radio
                    </label>
                    <input
                      type="radio"
                      class="btn-check"
                      name="options"
                      id="option3"
                      autocomplete="off"
                    />
                    <label
                      class="btn btn-secondary"
                      for="option3"
                      data-mdb-ripple-init
                    >
                      Radio
                    </label>
                </div>
                <div className="row m-3">
                  <input
                    type="radio"
                    class="btn-check"
                    name="options"
                    id="option4"
                    autocomplete="off"
                  />
                  <label
                    class="btn btn-secondary"
                    for="option4"
                    data-mdb-ripple-init
                  >
                    Checked
                  </label>
                  <button
                  type="radio"
                  className="btn-check"
                  name="options"
                  id="option5">
                    test
                  </button>
                  <input
                    type="radio"
                    class="btn-check"
                    name="options"
                    id="option5"
                    autocomplete="off"
                  />
                  <label
                    class="btn btn-secondary"
                    for="option5"
                    data-mdb-ripple-init
                  >
                    Radio
                  </label>

                  <input
                    type="radio"
                    class="btn-check"
                    name="options"
                    id="option6"
                    autocomplete="off"
                  /> 
                  <label
                    class="btn btn-secondary"
                    for="option6"
                    data-mdb-ripple-init
                  >
                    Radio
                  </label>
                </div>
                <div className="row m-3">
                  <input
                    type="radio"
                    class="btn-check"
                    name="options"
                    id="option7"
                    autocomplete="off"
                  />
                  <label
                    class="btn btn-secondary"
                    for="option7"
                    data-mdb-ripple-init
                  >
                    Checked
                  </label>

                  <input
                    type="radio"
                    class="btn-check"
                    name="options"
                    id="option8"
                    autocomplete="off"
                  />
                  <label
                    class="btn btn-secondary"
                    for="option8"
                    data-mdb-ripple-init
                  >
                    Radio
                  </label>

                  <input
                    type="radio"
                    class="btn-check"
                    name="options"
                    id="option9"
                    autocomplete="off"
                  />
                  <label
                    class="btn btn-secondary"
                    for="option9"
                    data-mdb-ripple-init
                  >
                    Radio
                  </label>
                </div>
              </div>
              <div className="row mx-2">
                <div className="col-2">
                <button className="btn btn-primary" style={{width: "100%"}}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
    
}