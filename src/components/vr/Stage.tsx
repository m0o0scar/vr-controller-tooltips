import { Canvas } from '@react-three/fiber';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';
import React from 'react';

import { ControllerButton, ControllerButtonLabel } from './ControllerButtonLabel';

const StageContent = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />

      <ControllerButtonLabel button={ControllerButton.A} label="A" />
      <ControllerButtonLabel button={ControllerButton.B} label="B" />
      <ControllerButtonLabel button={ControllerButton.System} label="System" />
      <ControllerButtonLabel button={ControllerButton.RightTrigger} label="Trigger" />
      <ControllerButtonLabel button={ControllerButton.RightGrip} label="Grip" />
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
