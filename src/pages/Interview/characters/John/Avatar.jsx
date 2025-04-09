/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/67bb1886de5d7f6fc12ed3fd.glb -o src/components/Avatar.jsx -r public 
*/

import React from 'react'
import { useGraph, useLoader, useFrame } from '@react-three/fiber'
import { SkeletonUtils } from 'three-stdlib'
// import { useControls } from 'leva'
import { useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFBX, useAnimations, useGLTF } from '@react-three/drei'
import { useRef } from 'react'

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
}
export function Avatar(props) {
  // const audioRef = useRef(props.audio);
  // const libsyncRef = useRef(props.libsync);

  const { nodes, materials } = useGLTF('/models/67bb1886de5d7f6fc12ed3fd.glb')
  const { animations: danceAnimation } = useFBX("/animations/Dance.fbx");
  const { animations: idleAnimation } = useFBX("/animations/Idle.fbx");
  const { animations: greetingAnimation } = useFBX("/animations/Greeting.fbx");


  danceAnimation[0].name = "Dance";
  idleAnimation[0].name = "Idle";
  greetingAnimation[0].name = "Greeting";

  const [animation, setAnimation] = useState("Idle");
  // setTimeout(() => {
  //   setAnimation("Idle");
  // }
  //   , 10000);
  const group = useRef();
  const { actions } = useAnimations([danceAnimation[0], idleAnimation[0], greetingAnimation[0]], group);
  useEffect(() => {
    if (actions && actions[animation]) {
      actions[animation].reset().fadeIn(0.5).play();
    }
  }, [animation, actions]);

  // useEffect(() => {
  //   if (props.audio) {
  //     audioRef.current = props.audio;
  //   }
  // }, [props.audio]);

  // useEffect(() => {
  //   if (props.libsync) {
  //     libsyncRef.current = props.libsync;
  //   }
  // }, [props.libsync]);

  useFrame(() => {

    if (!props.audioRef.current || !props.libsyncRef.current) return;

    const currentAudioTime = props.audioRef.current.currentTime;
    Object.values(corresponding).forEach((value) => {
      nodes.Wolf3D_Head.morphTargetInfluences[
        nodes.Wolf3D_Head.morphTargetDictionary[value]
      ] = 0;
      nodes.Wolf3D_Teeth.morphTargetInfluences[
        nodes.Wolf3D_Teeth.morphTargetDictionary[value]
      ] = 0;
    });
    for (let i = 0; i < props.libsyncRef.current.mouthCues.length; i++) {
      const mouthCue = props.libsyncRef.current.mouthCues[i];
      if (
        currentAudioTime >= mouthCue.start &&
        currentAudioTime <= mouthCue.end
      ) {
        nodes.Wolf3D_Head.morphTargetInfluences[
          nodes.Wolf3D_Head.morphTargetDictionary[corresponding[mouthCue.value]]
        ] = 1;
        nodes.Wolf3D_Teeth.morphTargetInfluences[
          nodes.Wolf3D_Teeth.morphTargetDictionary[corresponding[mouthCue.value]]
        ] = 1;
      }
    }
  });


  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Glasses.geometry} material={materials.Wolf3D_Glasses} skeleton={nodes.Wolf3D_Glasses.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
    </group>
  )
}

useGLTF.preload('/models/67bb1886de5d7f6fc12ed3fd.glb')
