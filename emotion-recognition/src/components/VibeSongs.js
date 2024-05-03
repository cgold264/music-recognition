import React, { useState } from "react";
import PortfolioItem from "./PortfolioItem";
import Popup from 'reactjs-popup';
import Accordion from "./Accordion";
import 'reactjs-popup/dist/index.css';

export default function Portfolio(){
    const [open, setOpen] = useState(null);  
    const closeModal = () => setOpen(null);

    const mathClasses = [
        {
            title: "Discrete Structures",
            description:
              "A study of propositional logic, set theory, functions, algorithms, divisibility, introductory number theory, elementary proof techniques, counting techniques, recursive definitions, mathematical induction, and graph theory.",
        },
        {
            title: "Stats for Experimentalists",
            description:
              "An applied statistics course for those with calculus preparation. Descriptive statistics, probability theory, discrete and continuous random variables, and methods of inferential statistics including interval estimation, hypothesis testing, and regression.",
        },
        {
          title: "Calculus III",
          description:
            "A treatment of multi-variable calculus and the calculus of vector fields. Topics include: vectors and vector-valued functions, partial derivatives, multiple integration, curl and divergence, line integrals, Green’s theorem, Stokes’ theorem, and the Divergence theorem. ",
        },
        {
          title: "Calculus II",
          description:
            "A continuation of Calc I. Topics covered are: techniques of integration, applications of the integral, improper integrals, sequences and infinite series with an introduction to convergence tests, parametric equations, and polar coordinates.",
        },
        {
          title: "Calculus I",
          description:
            "An introduction to calculus for engineering, science and mathematics students, with an emphasis on conceptual understanding, problem solving, and modeling. Topics covered include: limits, continuity, derivatives of algebraic, trigonometric, and transcendental functions, applications of the derivative including optimization problems and linear approximations, antiderivatives, introduction to the definite integral, and the Fundamental Theorem of Calculus. ",
        },
      ];

    const cybersecurity = [
        {
            title: "Spokane Mayors Cup",
            description: "A regional cybersecurity event focused on developing cybersecurity talent in Washington. Competed with peers to penetrate various virtual machines and challenges.",
            link: "https://spokanectf.github.io/",
            linkDes: "SMC Github"
        },
        {
            title: "Hack the Box Penetration Test",
            description: 'Final Project Report for Gonzaga course "Cyber Security Project Lab" where I was tasked to compromise a virtual macine of my choice. ',
            // link: "../assets/connor.goldschmidt_final.pdf",
            // linkDes: "Report"
        }
    ];

    return (
        <section id="portfolio" class="portfolio section-bg bg-light">
        <div class="container" data-aos="fade-up">
            <div class="section-title">
            <h2>What's the Vibe?</h2>
            </div>
                <div class="row">
                    <div class="col-lg-4 text-center my-3">
                        <div class="rounded-circle" alt="Generic placeholder image" width="140" height="140"><i class="bx bx-lg bx-happy"></i></div>
                        <h2><b>Tweaking Out</b></h2>
                        <p>When the hangxiety is too much</p>
                        <button class="btn btn-secondary" onClick={() => setOpen("Security")}>View details »</button>
                        <Popup 
                            contentStyle={{
                                borderRadius: "5px",
                                minWidth: "90%",
                            }}
                            closeOnDocumentClick
                            onClose={closeModal}
                            modal
                            lockScroll={true}
                            repositionOnResize={true}
                            open={open === "Security"}
                            >
                                <PortfolioItem closeFunc={closeModal}>
                                <section id="cybersecurity" class="skills section-bg bg-light">
                                    <div class="container" data-aos="fade-up">
                                            <div class="section-title">
                                                <h2>Cybersecurity</h2>
                                                <p>
                                                My journey in cybersecurity has equipped me with specialized skills in penetration testing, networking, and industry standards, empowering me to safeguard systems and networks effectively.
                                                </p>
                                            </div>
                                            <div className="row my-3 skills-content">
                                                <div className="accordion-container">
                                                    <Accordion items={cybersecurity} />
                                                </div>
                                            </div>
                                            <div class="row skills-content">    
                                                <div class="col-lg-6">
                                                </div>
                                                <div class="col-lg-6">
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </section>
                                </PortfolioItem> 
                        </Popup>
                    </div>
                    <div class="col-lg-4 text-center my-3">
                        <div class="rounded-circle" alt="Generic placeholder image" width="140" height="140"><i class="bx bx-lg bx-sad"></i></div>
                        <h2><b>Sad</b></h2>
                        <p>Songs to keep you depressed.</p>
                        <p><button class="btn btn-secondary" onClick={() => setOpen("Software")}>View details »</button></p>
                        <Popup 
                            contentStyle={{
                                borderRadius: "5px",
                                width: "90%",
                                maxHeight: "100%",
                            }}
                            closeOnDocumentClick
                            onClose={closeModal}
                            modal
                            lockScroll={true}
                            repositionOnResize={true}
                            open={open === "Software"}
                            >
                                <PortfolioItem closeFunc={closeModal}>
                                <section id="Software" class="skills section-bg bg-light">
                                    <div class="container" data-aos="fade-up">
                                            <div class="section-title">
                                                <h2>Software Development</h2>
                                                <p>
                                                With a focus on software development, I've cultivated proficiencies in agile development methodologies, a wide array of programming languages, and advanced knowledge of data structures and algorithms, enabling me to create robust and efficient software solutions.
                                                </p>
                                            </div>

                                            
                                            <div class="row skills-content">    
                                                <div class="col-lg-6">
                                                    
                                                </div>
                                                <div class="col-lg-6">
                                                    
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </section>
                                </PortfolioItem>
                        </Popup>
                    </div>
                    <div class="col-lg-4 text-center my-3">
                        <div className="rounded-circle" alt="Generic placeholder image" width="140" height="140"><i class="bx bx-lg bx-leaf"></i></div>
                        <h2><b>Vibing</b></h2>
                        <p>Songs for when you're in funland.</p>
                        <p><button class="btn btn-secondary" onClick={() => setOpen("Math")}>View details »</button></p>
                        <Popup 
                            contentStyle={{
                                borderRadius: "5px",
                                width: "90%",
                                maxHeight: "100%",
                            }}
                            open={open === "Math"}
                            closeOnDocumentClick
                            onClose={closeModal}
                            modal
                            lockScroll={true}
                            repositionOnResize={true}
                            >
                                <PortfolioItem closeFunc={closeModal}>
                                <section id="mathematics" class="portfolio-container bg-light col-12">
                                    <div class="portfolio-container" data-aos="fade-up">
                                            <div class="section-title">
                                            <h2>Math</h2>
                                            <p>
                                            My education has provided me with a strong foundation in mathematics, and my minor in the subject has further deepened my proficiency, equipping me with advanced analytical and problem-solving skills that I apply effectively in various areas of computer science, including software development and cybersecurity.
                                                </p>
                                            </div>
                                            <div class="accordion-container">
                                                <Accordion items={mathClasses} />
                                            </div>
                                        </div>
                                    </section>
                                </PortfolioItem>
                        </Popup>
                    </div>  
            </div>
        </div>
        </section>
    );
}