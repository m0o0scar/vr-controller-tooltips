import { Text, Line } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useController } from '@react-three/xr';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Group, Object3D, Vector3 } from 'three';

import controllerProfilesJSON from './controllerProfiles.json';

export type ControllerButton = 'trigger' | 'grip' | 'thumbstick' | 'button1' | 'button2' | 'buttonMenu';

type ControllerButtonPosition = [number, number, number];
interface ControllerButtonPositions {
  pivot: ControllerButtonPosition;
  trigger: ControllerButtonPosition;
  grip: ControllerButtonPosition;
  thumbstick: ControllerButtonPosition;
  button1: ControllerButtonPosition;
  button2: ControllerButtonPosition;
  buttonMenu: ControllerButtonPosition;
}

interface ControllerLayoutProfile {
  right: ControllerButtonPositions;
  left: ControllerButtonPositions;
}

interface ControllerLayoutProfiles {
  [deviceType: string]: ControllerLayoutProfile | undefined;
}

const profiles = controllerProfilesJSON as unknown as ControllerLayoutProfiles;

export interface ControllerButtonLabelProps {
  handness: 'left' | 'right';
  button: ControllerButton;
  label: string;
  labelColor?: string;
  labelSize?: number;
  lineLength?: number;
  lineWidth?: number;
  lineColor?: string;
}

export const ControllerButtonLabel: FC<ControllerButtonLabelProps> = ({
  handness,
  button,
  label,
  labelColor = '#ffffff',
  labelSize = 0.01,
  lineLength = 0.05,
  lineWidth = 1,
  lineColor = '#dddddd',
}) => {
  const { camera } = useThree();
  const controller = useController(handness);
  const [profile, setProfile] = useState<ControllerLayoutProfile>();

  const [lineStartPoint, setLineStartPoint] = useState(new Vector3());
  const [lineEndPoint, setLineEndPoint] = useState(new Vector3());
  const [textPosition, setTextPosition] = useState(new Vector3());

  const groupRef = useRef<Group>(null);
  const textRef = useRef<Text>(null);

  // Get the controller profile for the current device type
  useEffect(() => {
    setProfile(controller ? profiles[controller.inputSource.profiles[0]] : undefined);
  }, [controller]);

  // Update the line and text positions when a profile is found
  useEffect(() => {
    if (profile && profile[handness]?.[button]) {
      const pivotPosition = new Vector3(...profile[handness].pivot);
      const buttonPosition = new Vector3(...profile[handness][button]);
      const direction = new Vector3().subVectors(buttonPosition, pivotPosition).normalize();

      setLineStartPoint(buttonPosition);
      setLineEndPoint(buttonPosition.clone().addScaledVector(direction, lineLength));
      setTextPosition(buttonPosition.clone().addScaledVector(direction, lineLength * 1.1));
    }
  }, [profile]);

  useFrame(() => {
    if (groupRef.current && controller) {
      // follow controller's position
      // DON'T MOVE THE GROUP INTO CONTROLLER AS CHILD, otherwise there will be error when exit VR
      const parent = controller.children[1];
      parent.getWorldQuaternion(groupRef.current.quaternion);
      parent.getWorldPosition(groupRef.current.position);
    }
    if (textRef.current) {
      // text should always face camera
      (textRef.current as unknown as Object3D).lookAt(camera.position);
    }
  });

  if (!profile) return null;

  return (
    <group ref={groupRef}>
      <Line points={[lineStartPoint, lineEndPoint]} color={lineColor} linewidth={lineWidth} />

      <Text ref={textRef} position={textPosition} color={labelColor} fontSize={labelSize}>
        {label}
      </Text>
    </group>
  );
};
