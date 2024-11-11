import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const colors: Array<[number, number, number]> = [
  [62, 35, 255],
  [60, 255, 60],
  [255, 35, 98],
  [45, 175, 230],
  [255, 0, 255],
  [255, 128, 0],
];

const gradientSpeed = 0.002;

const GradientDiv = styled.div.attrs<{ $color1: string; $color2: string }>((props) => ({
  style: {
    background: `linear-gradient(to right, ${props.$color1}, ${props.$color2})`,
  },
}))<{ $color1: string; $color2: string }>`
  width: 100%;
  height: 960px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface GradientProps {
  children?: React.ReactNode;
}

const Gradient: React.FC<GradientProps> = ({ children }) => {
  const [step, setStep] = useState(0);
  const [colorIndices, setColorIndices] = useState([0, 1, 2, 3]);
  const [gradientColors, setGradientColors] = useState({ color1: '', color2: '' });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const c0_0 = colors[colorIndices[0]];
      const c0_1 = colors[colorIndices[1]];
      const c1_0 = colors[colorIndices[2]];
      const c1_1 = colors[colorIndices[3]];

      const istep = 1 - step;
      const color1 = `rgb(${Math.round(istep * c0_0[0] + step * c0_1[0])}, ${Math.round(istep * c0_0[1] + step * c0_1[1])}, ${Math.round(istep * c0_0[2] + step * c0_1[2])})`;
      const color2 = `rgb(${Math.round(istep * c1_0[0] + step * c1_1[0])}, ${Math.round(istep * c1_0[1] + step * c1_1[1])}, ${Math.round(istep * c1_0[2] + step * c1_1[2])})`;

      let newStep = step + gradientSpeed;
      if (newStep >= 1) {
        newStep %= 1;
        const newColorIndices = [...colorIndices];
        newColorIndices[0] = colorIndices[1];
        newColorIndices[2] = colorIndices[3];
        newColorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        newColorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        setColorIndices(newColorIndices);
      }

      setStep(newStep);
      setGradientColors({ color1, color2 });
    }, 10);

    return () => clearInterval(intervalId);
  }, [step, colorIndices]);

  return <GradientDiv $color1={gradientColors.color1} $color2={gradientColors.color2}>{children}</GradientDiv>;
};

export default Gradient;