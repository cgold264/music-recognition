import React, { Component , useEffect} from "react";
import Typed from 'typed.js';

export default function Home(){
    const el = React.useRef(null);

    React.useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Feel Better", "Unwind", "Jam Out"],
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
                <h1>What's the vibe?</h1>
                <p><span class="typed" ref={el}></span></p>
                </div>
            </section>
        );
}