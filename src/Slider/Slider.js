import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useEventListener, targetWithin, getInvertedY } from '../helper';

const Container = styled.div`
  border: 1px solid black;
  background-color: #E60F45;
  position: relative;

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

const Counter = styled.p`
  color: white;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
  user-select: none;
`;

const Slider = ({ width, height, ...props }) => {
  const canvasRef = useRef();
  const [x, setX] = useState(400);
  const [y, setY] = useState(200);
  const [status, setStatus] = useState(0);
  const [reais, setReais] = useState(0);
  const [cents, setCents] = useState(0);


  const yUnit = height / 10;
  const xUnit = width / 10;

  const [start, setStart] = useState(false);

  const startDrag = (evt) => targetWithin(evt.target, [canvasRef.current]) && setStart(true);

  const drag = (evt) => {
    if (start && targetWithin(evt.target, [canvasRef.current])) {
      var e = canvasRef.current;
      var dim = e.getBoundingClientRect();
      var x = evt.clientX - dim.left;
      var y = evt.clientY - dim.top;
      if (status === 0) {
        setReais(`${getInvertedY(Math.round(y / yUnit))}${Math.round(x / xUnit)}`);
      } else {
        setCents(`${Math.round(x / (xUnit))}${getInvertedY(Math.round(y / yUnit))}`);
      }
      setX(x);
      setY(y);
    }
  }
  const endDrag = (evt) => {
    setStart(false);
    status === 0 && setStatus(1);
    status === 1 && setStatus(0);
  }

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
      <Counter>{`R$ ${reais},${cents}`}</Counter>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        {...props}
      >
        <g id="slider-group">
          <StyledPath d={getPath()} />
        </g>
      </svg>
    </Container>
  );
};

export default Slider;
