import { Canvas } from '@react-three/fiber';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';
import React from 'react';

import { ControllerButton, ControllerButtonLabel } from './ControllerButtonLabel';

const StageContent = () => {
  return (
    <>
      <ambientLight intensity={5} />
      <pointLight position={[10, 10, 10]} />

      <ControllerButtonLabel handedness="right" button={ControllerButton.A} label="A" />
      <ControllerButtonLabel handedness="right" button={ControllerButton.B} label="B" />
      <ControllerButtonLabel handedness="right" button={ControllerButton.Trigger} label="Trigger" />
    </>
  );
};

export const Stage = () => {
  return (
    <>
      <VRButton />
      <Canvas className="fixed left-0 right-0 top-0 bottom-0">
        <XR>
          <Controllers />
          <Hands />
          <StageContent />
        </XR>
      </Canvas>
    </>
  );
};
