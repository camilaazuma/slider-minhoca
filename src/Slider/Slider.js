import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useEventListener, targetWithin } from '../helper';

const Container = styled.div`
  border: 1px solid black;
  background-color: #E60F45;

  ${({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`;

const StyledPath = styled.path`
  fill: transparent;
  stroke: white;
  stroke-width: 3;
  stroke-dasharray: 10 2;
  z-index: -1;
`;

const Handler = styled.circle`
  fill: #e91e63;
`;

const Slider = ({ width, height, ...props }) => {
  const canvasRef = useRef();
  const handlerRef = useRef();
  const [x, setX] = useState(400);
  const [y, setY] = useState(200);

  const [start, setStart] = useState(false);

  const startDrag = (evt) => targetWithin(evt.target, [canvasRef.current]) && setStart(true);

  const drag = (evt) => {
    if (start) {
      var e = canvasRef.current;
      var dim = e.getBoundingClientRect();
      var x = evt.clientX - dim.left;
      var y = evt.clientY - dim.top;
      setX(x);
      setY(y);
    }
  }
  const endDrag = (evt) => setStart(false)

  useEventListener("mousedown", (event) => startDrag(event));
  useEventListener("mousemove", (event) => drag(event));
  useEventListener("mouseup", (event) => endDrag(event));
  useEventListener("mouseleave", (event) => endDrag(event));

  const getPath = () => {
    const moveto = `M 0 ${height}`;
    const curve = [
      `C ${x - 20} ${y},`,
      `${x + 20} ${y},`,
      `${width} ${height}`
    ].join(" ");

    return `${moveto} ${curve}`;
  };

  return (
    <Container ref={canvasRef} width={width} height={height}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        {...props}
      >
        <g id="slider-group">
          <StyledPath d={getPath()} />
          {/* <Handler ref={handlerRef} className="draggable" r="15" x={x} y={y} /> */}
        </g>
      </svg>
    </Container>
  );
};

export default Slider;
