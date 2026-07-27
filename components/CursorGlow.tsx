"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });


  useEffect(() => {

    const move = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };


    window.addEventListener(
      "mousemove",
      move
    );


    return () => {
      window.removeEventListener(
        "mousemove",
        move
      );
    };

  }, []);



  return (
    <div
      className="
        pointer-events-none
        fixed
        z-50
        w-[300px]
        h-[300px]
        rounded-full
        bg-glow/10
        blur-[120px]
        transition-transform
        duration-300
      "

      style={{
        transform:
          `translate(${position.x - 150}px, ${position.y - 150}px)`
      }}
    />
  );
}
