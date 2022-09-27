import { Text, Line } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useController } from '@react-three/xr';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Group, Mesh, Object3D, Vector3 } from 'three';

const scaleFactor = 0.002;
const scale = new Vector3(scaleFactor, scaleFactor, scaleFactor);

// eslint-disable-next-line no-shadow
export enum ControllerButton {
  A = 'A',
  B = 'B',
  Trigger = 'Trigger',
}

const ButtonPosition = {
  [ControllerButton.A]: new Vector3(-0.015730699198866646, 0.006583851335810607, -0.03431766005455645),
  [ControllerButton.B]: new Vector3(-0.022470246709102748, -0.002786519587520228, -0.04484441926477035),
  [ControllerButton.Trigger]: new Vector3(-0.010930707493265038, -0.03131088808592811, -0.04490346267948289),
};

export interface ControllerButtonLabelProps {
  handedness: XRHandedness;
  button: ControllerButton;
  label: string;
  lineLength?: number;
}

export const ControllerButtonLabel: FC<ControllerButtonLabelProps> = ({
  handedness,
  button,
  label,
  lineLength = 0.1,
}) => {
  const { camera } = useThree();
  const controller = useController(handedness);
  const [lineEndPoint, setLineEndPoint] = useState(new Vector3());
  const [textPosition, setTextPosition] = useState(new Vector3());

  const groupRef = useRef<Group>(null);
  const textRef = useRef<Text>(null);

  useEffect(() => {
    if (controller && groupRef.current) {
      const parent = controller.children[1].children[0];
      parent.add(groupRef.current);

      const position = ButtonPosition[button];
      const direction = position.clone().normalize();
      setLineEndPoint(direction.clone().multiplyScalar(lineLength));
      setTextPosition(direction.clone().multiplyScalar(lineLength * 1.1));
    }
  }, [controller]);

  useFrame(() => {
    if (textRef.current) {
      (textRef.current as unknown as Object3D).lookAt(camera.position);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={ButtonPosition[button]} scale={scale}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshBasicMaterial color="yellow" />
      </mesh>

      <Line points={[[0, 0, 0], lineEndPoint]} color="black" linewidth={2} />

      <Text ref={textRef} position={textPosition} color="black" fontSize={0.01} anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
};
