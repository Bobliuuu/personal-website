import { useEffect, useRef } from 'react';
import Typewriter from 't-writer.js';
import SunAnimation from '@/components/atoms/sunAnimation';

export default function Intro() {
  const target = useRef<HTMLSpanElement>(null);

  // Note: fixed react typewriter issue by turning off React StrictMode
  useEffect(() => {

    const options = {
      loop: true
    }

    const writer = new Typewriter(target.current, {
      loop: true,
      typeSpeed: 100,
      deleteSpeed: 20,
      typeColor: 'red'
    });

    writer
      .type('Full Stack Developer')
      .rest(500)
      .clear()
      .type('DevOps Practicioner')
      .rest(500)
      .clear()
      .type('AI Engineer')
      .rest(500)
      .clear()
      .type('Web3 Enthusiast')
      .rest(500)
      .clear()
      .start();

    return () => {
      writer.clear(); // Stop the typewriter animation when the component is unmounted
    };

  }, []);

  return (
    <div className="section flex h-screen" id="home">
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="my-auto text-center">
          <h1 className="font-bold text-black sm:text-[2.5vw] text-[1.3rem] overflow-hidden border-solid my-0 mx-auto">
            Hey, I'm Jerry Zhu 👋! I'm a 
          </h1>
          <span className="font-bold text-black sm:text-[2.5vw] text-[1.3rem] overflow-hidden border-solid my-0 mx-auto" ref={target}></span>
        </div>
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <SunAnimation />
      </div>
    </div>
  );
}