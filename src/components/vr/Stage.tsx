import { Canvas } from '@react-three/fiber';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';
import React from 'react';

import { ControllerButtonLabel } from './ControllerButtonLabel';

const StageContent = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />

      <ControllerButtonLabel handness="right" button={'button1'} label="A" />
      <ControllerButtonLabel handness="right" button={'button2'} label="B" />
      <ControllerButtonLabel handness="right" button={'buttonMenu'} label="System" />
      <ControllerButtonLabel handness="right" button={'thumbstick'} label="Thumbstick" />
      <ControllerButtonLabel handness="right" button={'trigger'} label="Trigger" />
      <ControllerButtonLabel handness="right" button={'grip'} label="Grip" />

      <ControllerButtonLabel handness="left" button={'button1'} label="A" />
      <ControllerButtonLabel handness="left" button={'button2'} label="B" />
      <ControllerButtonLabel handness="left" button={'buttonMenu'} label="System" />
      <ControllerButtonLabel handness="left" button={'thumbstick'} label="Thumbstick" />
      <ControllerButtonLabel handness="left" button={'trigger'} label="Trigger" />
      <ControllerButtonLabel handness="left" button={'grip'} label="Grip" />
    </>
  );
};

export const Stage = () => {
  return (
    <>
      <VRButton />
      <Canvas flat className="fixed left-0 right-0 top-0 bottom-0">
        <color attach="background" args={[0.8, 0.8, 0.8]} />
        <XR>
          <Controllers />
          <Hands />
          <StageContent />
        </XR>
      </Canvas>
    </>
  );
};
