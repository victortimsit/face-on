import React, { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Webcam from "react-webcam";

const Position = {
  x: {
    left: "left-8",
    right: "right-8",
  },
  y: {
    top: "top-8",
    bottom: "bottom-8",
  },
};

export default function Floatface(props) {
  const [position, setPosition] = useState({
    x: Position.x.left,
    y: Position.y.bottom,
  });
  let oldPos = { x: null, y: null };

  useHotkeys("cmd+left", (e) => {
    e.preventDefault();
    setPosition({ x: Position.x.left, y: oldPos.y });
    oldPos.x = Position.x.left;
  });
  useHotkeys("cmd+right", (e) => {
    e.preventDefault();
    setPosition({ x: Position.x.right, y: oldPos.y });
    oldPos.x = Position.x.right;
  });
  useHotkeys("cmd+up", (e) => {
    e.preventDefault();
    setPosition({ x: oldPos.x, y: Position.y.top });
    oldPos.y = Position.y.top;
  });
  useHotkeys("cmd+down", (e) => {
    e.preventDefault();
    setPosition({ x: oldPos.x, y: Position.y.bottom });
    oldPos.y = Position.y.bottom;
  });
  return (
    <Webcam
      className={`${position.x} ${position.y} rounded-full shadow-2xl fixed transition-all`}
      videoConstraints={{ width: 200, height: 200 }}
    />
  );
}
