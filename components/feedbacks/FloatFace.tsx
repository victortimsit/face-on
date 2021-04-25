import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { useHotkeys } from "react-hotkeys-hook";
import Webcam from "react-webcam";
import Button from "../buttons/Button";

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
  const [controls, setControls] = useState(true);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [magnet, setMagnet] = useState(true);
  const [position, setPosition] = useState({
    x: Position.x.left,
    y: Position.y.bottom,
  });
  let oldPos = useRef({ x: Position.x.left, y: Position.y.bottom });

  const handlePosition = (e: any, position: { x?: string; y?: string }) => {
    e.preventDefault();

    setMagnet(true);
    setDragPosition({ x: 0, y: 0 });
    setPosition({
      x: position.x ? position.x : oldPos.current.x,
      y: position.y ? position.y : oldPos.current.y,
    });
    if (position.x) oldPos.current.x = position.x;
    if (position.y) oldPos.current.y = position.y;
  };

  const handleDrag = (e: MouseEvent, data: any) => {
    setDragPosition({ x: data.x, y: data.y });
  };

  useHotkeys("cmd+left", (e) => handlePosition(e, { x: Position.x.left }));
  useHotkeys("cmd+right", (e) => handlePosition(e, { x: Position.x.right }));
  useHotkeys("cmd+up", (e) => handlePosition(e, { y: Position.y.top }));
  useHotkeys("cmd+down", (e) => handlePosition(e, { y: Position.y.bottom }));
  return (
    <Draggable
      defaultClassName="cursor-grab"
      defaultClassNameDragging="cursor-grabbing"
      position={dragPosition}
      onDrag={handleDrag}
      onStop={() => setMagnet(false)}
    >
      <div
        className={`${position.x} ${position.y} fixed`}
        onMouseEnter={() => setControls(true)}
        onMouseLeave={() => setControls(false)}
      >
        <Webcam
          className="rounded-full shadow-2xl m-2"
          videoConstraints={{ width: 200, height: 200 }}
        />
        <div
          className={`flex items-center justify-center transition-opacity ${
            controls ? "opacity-1" : "opacity-0"
          } `}
        >
          <Button
            size="small"
            className={`
        ${position.y == Position.y.top && magnet ? "opacity-50" : "opacity-1"} 
        transition-opacity absolute -top-8`}
            icon={<ChevronUpIcon />}
            onClick={(e) => handlePosition(e, { y: Position.y.top })}
          />
          <Button
            size="small"
            className={`
          ${
            position.x == Position.x.left && magnet ? "opacity-50" : "opacity-1"
          }
          transition-opacity absolute -left-8 top-1/2 transform -translate-y-1/2`}
            icon={<ChevronLeftIcon />}
            onClick={(e) => handlePosition(e, { x: Position.x.left })}
          />
          <Button
            size="small"
            className={`
            ${
              position.x == Position.x.right && magnet
                ? "opacity-50"
                : "opacity-1"
            }
            transition-opacity absolute top-1/2 -right-8 transform -translate-y-1/2`}
            icon={<ChevronRightIcon />}
            onClick={(e) => handlePosition(e, { x: Position.x.right })}
          />
          <Button
            size="small"
            className={`
          ${
            position.y == Position.y.bottom && magnet
              ? "opacity-50"
              : "opacity-1"
          }
          transition-opacity absolute -bottom-8`}
            icon={<ChevronDownIcon />}
            onClick={(e) => handlePosition(e, { y: Position.y.bottom })}
          />
        </div>
      </div>
    </Draggable>
  );
}
