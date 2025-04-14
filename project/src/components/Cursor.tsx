"use client";
import React, { useEffect } from "react";

const Cursor: React.FC = () => {
  useEffect(() => {
    const links = document.querySelectorAll<HTMLElement>(".hover-this");
    const cursor = document.querySelector<HTMLElement>(".cursor");

    const animateit = function (this: HTMLElement, e: MouseEvent) {
      const hoverAnim = this.querySelector<HTMLElement>(".hover-anim");
      if (!hoverAnim) return;

      const { offsetX: x, offsetY: y } = e;
      const { offsetWidth: width, offsetHeight: height } = this;
      const move = 25;
      const xMove = (x / width) * (move * 2) - move;
      const yMove = (y / height) * (move * 2) - move;

      hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
      if (e.type === "mouseleave") hoverAnim.style.transform = "";
    };

    const editCursor = (e: MouseEvent) => {
      if (!cursor) return;
      const { clientX: x, clientY: y } = e;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };

    links.forEach((el) => {
      el.addEventListener("mousemove", animateit);
      el.addEventListener("mouseleave", animateit);
    });

    window.addEventListener("mousemove", editCursor);

    document
      .querySelectorAll<HTMLElement>("a, .cursor-pointer")
      .forEach((el) => {
        el.addEventListener("mousemove", () => {
          cursor?.classList.add("cursor-active");
        });
        el.addEventListener("mouseleave", () => {
          cursor?.classList.remove("cursor-active");
        });
      });

    // Optional cleanup:
    return () => {
      links.forEach((el) => {
        el.removeEventListener("mousemove", animateit);
        el.removeEventListener("mouseleave", animateit);
      });
      window.removeEventListener("mousemove", editCursor);
    };
  }, []);

  return <div className="cursor"></div>;
};

export default Cursor;
