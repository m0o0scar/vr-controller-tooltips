import { Text, Line } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useController } from '@react-three/xr';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Group, Object3D, Vector3 } from 'three';

const textColor = '#ffffff';
const lineColor = '#dddddd';

// eslint-disable-next-line no-shadow
export enum ControllerButton {
  A,
  B,
  System,
  RightTrigger,
  RightGrip,
}

const ButtonHandedness = {
  [ControllerButton.A]: 'right',
  [ControllerButton.B]: 'right',
  [ControllerButton.System]: 'right',
  [ControllerButton.RightTrigger]: 'right',
  [ControllerButton.RightGrip]: 'right',
};

const ButtonPosition = {
  // [ControllerButton.A]: new Vector3(-0.015730699198866646, 0.006583851335810607, -0.03431766005455645),
  // [ControllerButton.B]: new Vector3(-0.022470246709102748, -0.002786519587520228, -0.04484441926477035),
  // [ControllerButton.RightTrigger]: new Vector3(-0.010930707493265038, -0.03131088808592811, -0.04490346267948289),
  [ControllerButton.A]: new Vector3(-0.004640465159155566, 0.008481654354815146, -0.01650656339905309),
  [ControllerButton.B]: new Vector3(-0.012062527982649495, -0.0008618575737104842, -0.02609458097061644),
  [ControllerButton.System]: new Vector3(0.014356727899876933, 0.010303275762782959, -0.013255750395561185),
  [ControllerButton.RightTrigger]: new Vector3(-0.004150597499489348, -0.03371376586774956, -0.027690306858668613),
  [ControllerButton.RightGrip]: new Vector3(-0.008524726268349585, -0.0074061690630879105, 0.01339096756780581),
};

export interface ControllerButtonLabelProps {
  button: ControllerButton;
  label: string;
  lineLength?: number;
}

export const ControllerButtonLabel: FC<ControllerButtonLabelProps> = ({ button, label, lineLength = 0.08 }) => {
  const { camera } = useThree();
  const controller = useController(ButtonHandedness[button] as XRHandedness);
  const [lineEndPoint, setLineEndPoint] = useState(new Vector3());
  const [textPosition, setTextPosition] = useState(new Vector3());

  const groupRef = useRef<Group>(null);
  const textRef = useRef<Text>(null);

  useEffect(() => {
    if (controller && groupRef.current) {
      console.log(controller.inputSource.profiles);
      const parent = controller.children[1].children[0];
      parent.add(groupRef.current);

      const position = ButtonPosition[button];
      const direction = position.clone().normalize();
      setLineEndPoint(direction.clone().multiplyScalar(lineLength));
      setTextPosition(direction.clone().multiplyScalar(lineLength * 1.1));
    }
  }, [controller]);

  useFrame(() => {
    if (controller && textRef.current) {
      (textRef.current as unknown as Object3D).lookAt(camera.position);
    }
  });

  if (!controller) return null;

  return (
    <group ref={groupRef}>
      <Line points={[[0, 0, 0], lineEndPoint]} color={lineColor} linewidth={2} />

      <Text ref={textRef} position={textPosition} color={textColor} fontSize={0.01} anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
};
