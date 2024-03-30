import React, { Component , useEffect} from "react";
import Typed from 'typed.js';

export default function Home(){
    const el = React.useRef(null);

    React.useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Software Development", "Cybersecurity", "Mathematics"],
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
            });
            return () => {
                // Destroy Typed instance during cleanup to stop animation
                typed.destroy();
              };
            }, []);

        return (
            <section id="home" class="d-flex flex-column justify-content-center">
                <div class="container">
                <h1>Connor Goldschmidt</h1>
                <p><span class="typed" ref={el}></span></p>
                <div class="social-links">
                    <a href="mailto:cgoldschmidt04@gmail.com" class="gmail"><i class="bx bxl-gmail"></i></a>
                    <a href="https://www.linkedin.com/in/connor-goldschmidt/" class="linkedin" target="_blank"><i class="bx bxl-linkedin"></i></a>
                    <a href="https://github.com/cgold264" class="github" target="_blank"><i class="bx bxl-github"></i></a>
                </div>
                </div>
            </section>
        );
}