import { MeshProps } from '@react-three/fiber';
import React, { forwardRef, Ref } from 'react';
import { Mesh } from 'three';

function _Box(props: MeshProps, ref: Ref<Mesh>) {
  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export const Box = forwardRef(_Box);
