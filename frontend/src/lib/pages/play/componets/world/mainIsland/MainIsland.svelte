<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@3.0.1 .\MainIsland.glb -T --draco /draco/\
-->

<script lang="ts">
  import { T } from "@threlte/core";
  import { useGltf, useDraco } from "@threlte/extras";
  import { AutoColliders, Collider } from "@threlte/rapier";
  import { handleJump } from "../../utils/utils";
  import MusicPlayer from "./MusicPlayer.svelte";

  let {
    fallback = () => {},
    error = () => {},
    children = () => {},
    ref = $bindable(),
    ...props
  } = $props();

  const gltf = useGltf("/MainIsland-transformed.glb", {
    dracoLoader: useDraco(),
  });
</script>

<MusicPlayer />

<T.Group bind:ref dispose={false} {...props}>
  {#await gltf}
    {@render fallback?.()}
  {:then gltf}
    <T.Group position={[29.68, 2.4, -22.64]} rotation={[Math.PI / 2, 0, -0.56]}>
      <AutoColliders shape="trimesh" oncollisionenter={handleJump}>
        <T.Mesh
          geometry={gltf.nodes.Pedestrian_bridge1_1.geometry}
          material={gltf.materials["FrontColor.013"]}
        />
        <T.Mesh
          geometry={gltf.nodes.Pedestrian_bridge1_2.geometry}
          material={gltf.materials["Material.031"]}
        />
      </AutoColliders>
    </T.Group>
    <T.Mesh
      geometry={gltf.nodes.ADD.geometry}
      material={gltf.nodes.ADD.material}
      position={[0, 0.3, 0]}
      scale={0.29}
    />
    <T.Mesh
      geometry={gltf.nodes.Sui.geometry}
      material={gltf.materials.SVGMat}
      position={[-0.03, 1.92, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={9.21}
    />
    <AutoColliders shape="cuboid" oncollisionenter={handleJump}>
      <T.Mesh
        geometry={gltf.nodes.Ground.geometry}
        material={gltf.materials["Material.001"]}
        position={[-1.74, -0.51, -0.83]}
        scale={[10, 5, 10]}
      />
    </AutoColliders>
    <T.Mesh
      geometry={gltf.nodes.Home1.geometry}
      material={gltf.nodes.Home1.material}
      position={[-14.16, 2.34, -9.84]}
      rotation={[0, 0.84, 0]}
      scale={[2, 1, 2]}
    />
    <T.Group position={[-10.04, 3.05, -11.55]}>
      <T.Mesh
        geometry={gltf.nodes.Cylinder001_1.geometry}
        material={gltf.materials["Material.001"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cylinder001_2.geometry}
        material={gltf.materials["Material.003"]}
      />
    </T.Group>
    <T.Group
      position={[14.65, 3.05, -6.13]}
      rotation={[Math.PI, -1.48, Math.PI]}
    >
      <T.Mesh
        geometry={gltf.nodes.Cylinder004_1.geometry}
        material={gltf.materials["Material.001"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cylinder004_2.geometry}
        material={gltf.materials["Material.003"]}
      />
    </T.Group>
    <T.Group
      position={[-10.8, 1.54, -11.68]}
      rotation={[0, 0, 0.46]}
      scale={0.58}
    >
      <T.Mesh
        geometry={gltf.nodes.Cylinder006_1.geometry}
        material={gltf.materials["Material.001"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cylinder006_2.geometry}
        material={gltf.materials["Material.003"]}
      />
    </T.Group>
    <T.Group
      position={[-9.14, 1.62, -12.13]}
      rotation={[3.01, 1.01, -2.49]}
      scale={[0.14, 0.27, 0.54]}
    >
      <T.Mesh
        geometry={gltf.nodes.Plane033.geometry}
        material={gltf.materials["Material.003"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane033_1.geometry}
        material={gltf.materials["Material.001"]}
      />
    </T.Group>
    <T.Mesh
      geometry={gltf.nodes.Cube003.geometry}
      material={gltf.materials["Material.016"]}
      position={[17.12, -0.06, 16.79]}
      rotation={[0, -0.18, 0]}
      scale={0.6}
    />
    <T.Mesh
      geometry={gltf.nodes.Cube005.geometry}
      material={gltf.materials["Material.016"]}
      position={[21.79, -0.04, 17.17]}
      rotation={[-0.55, -0.97, 0.7]}
      scale={0.19}
    />
    <T.Mesh
      geometry={gltf.nodes.Cube006.geometry}
      material={gltf.materials["Material.016"]}
      position={[20.17, 0.25, 15.09]}
      rotation={[0, -1.44, 0]}
      scale={0.22}
    />
    <T.Mesh
      geometry={gltf.nodes.Cube007.geometry}
      material={gltf.materials["Material.016"]}
      position={[19.73, 0.09, 15.15]}
      rotation={[-2.65, -0.9, -1.58]}
      scale={0.19}
    />
    <T.Mesh
      geometry={gltf.nodes.Cube008.geometry}
      material={gltf.materials["Material.016"]}
      position={[21.6, -0.03, 17.59]}
      rotation={[-2.83, -0.28, -1.89]}
      scale={0.13}
    />
    <T.Mesh
      geometry={gltf.nodes.PuenteGrande.geometry}
      material={gltf.materials["Material.030"]}
      position={[0, -0.09, 33.13]}
      scale={[0.4, 1.01, 0.4]}
    />
    <T.Group
      position={[-16.72, 8.77, -22.48]}
      rotation={[0, 0, 0.09]}
      scale={[0.2, 2.5, 0.2]}
    >
      <T.Mesh
        geometry={gltf.nodes.Cube040.geometry}
        material={gltf.materials["Material.038"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cube040_1.geometry}
        material={gltf.materials["Material.037"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cube040_2.geometry}
        material={gltf.materials["Material.022"]}
      />
    </T.Group>
    <T.Mesh
      geometry={gltf.nodes.Cube021.geometry}
      material={gltf.materials["Material.039"]}
      position={[-17.97, 6.96, -22.48]}
      scale={0.2}
    />
    <T.Group
      position={[-17.47, 2.49, -21.91]}
      rotation={[0, -0.29, 0]}
      scale={3.16}
    >
      <T.Mesh
        geometry={gltf.nodes.bigStone_1.geometry}
        material={gltf.materials["Material.001"]}
      />
      <T.Mesh
        geometry={gltf.nodes.bigStone_2.geometry}
        material={gltf.materials["Material.008"]}
      />
      <T.Mesh
        geometry={gltf.nodes.bigStone_3.geometry}
        material={gltf.materials["Material.014"]}
      />
    </T.Group>
    <T.Group
      position={[-23.79, 10.06, -21.13]}
      rotation={[-3.09, 0.72, -2.65]}
      scale={[0.16, 0.31, 0.63]}
    >
      <T.Mesh
        geometry={gltf.nodes.PalmStation004.geometry}
        material={gltf.materials["Material.003"]}
      />
      <T.Mesh
        geometry={gltf.nodes.PalmStation004_1.geometry}
        material={gltf.materials["Material.001"]}
      />
    </T.Group>
    <T.Group position={[19.62, 2.15, 17.21]} rotation={[Math.PI / 2, 0, 2.53]}>
      <T.Mesh
        geometry={gltf.nodes.Untitled001_1.geometry}
        material={gltf.materials["FrontColor.013"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Untitled001_2.geometry}
        material={gltf.materials["Material.031"]}
      />
    </T.Group>
    <T.Group
      position={[4.7, 0.66, -16.38]}
      rotation={[Math.PI / 2, 0, Math.PI / 2]}
    >
      <T.Mesh
        geometry={gltf.nodes.Trash001_1.geometry}
        material={gltf.materials["FrontColor.013"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Trash001_2.geometry}
        material={gltf.materials["Material.009"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Trash001_3.geometry}
        material={gltf.materials["Material.010"]}
      />
    </T.Group>
    <T.Group position={[19.46, 1.52, 0.1]} rotation={[Math.PI / 2, 0, Math.PI]}>
      <T.Mesh
        geometry={gltf.nodes.MusicSpot_1.geometry}
        material={gltf.materials["Material.038"]}
      />
      <T.Mesh
        geometry={gltf.nodes.MusicSpot_2.geometry}
        material={gltf.materials["Material.031"]}
      />
    </T.Group>
    <T.Group
      position={[19.48, 1.55, 0.22]}
      rotation={[Math.PI / 2, 0, Math.PI]}
    >
      <T.Mesh
        geometry={gltf.nodes.MusicSpot001_1.geometry}
        material={gltf.materials["Material.038"]}
      />
      <T.Mesh
        geometry={gltf.nodes.MusicSpot001_2.geometry}
        material={gltf.materials["Material.031"]}
      />
    </T.Group>
    <T.Mesh
      geometry={gltf.nodes.Cube001.geometry}
      material={gltf.materials["Material.017"]}
      position={[21.68, -0.26, 13.89]}
      rotation={[Math.PI, -1.56, Math.PI]}
      scale={0.6}
    />
    <T.Group
      position={[22.03, 1.97, 13.72]}
      rotation={[0.58, 0.35, -0.21]}
      scale={[0.16, 0.32, 0.64]}
    >
      <T.Mesh
        geometry={gltf.nodes.Plane006_1.geometry}
        material={gltf.materials["Material.003"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane006_2.geometry}
        material={gltf.materials["Material.001"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane006_3.geometry}
        material={gltf.materials["Material.017"]}
      />
    </T.Group>
    <T.Group
      position={[15.98, 5.94, 21.86]}
      rotation={[0, 0, 0.09]}
      scale={[0.2, 2.5, 0.2]}
    >
      <T.Mesh
        geometry={gltf.nodes.Cube006_1.geometry}
        material={gltf.materials["Material.038"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cube006_2.geometry}
        material={gltf.materials["Material.037"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cube006_3.geometry}
        material={gltf.materials["Material.022"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cube006_4.geometry}
        material={gltf.materials["Material.039"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cube006_5.geometry}
        material={gltf.materials["Material.030"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cube006_6.geometry}
        material={gltf.materials["Material.030"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cube006_7.geometry}
        material={gltf.materials["Material.030"]}
      />
    </T.Group>
    <T.Group
      position={[-12.48, 2.17, 20.37]}
      rotation={[-0.82, 0.18, 0.36]}
      scale={[0.16, 0.32, 0.64]}
    >
      <T.Mesh
        geometry={gltf.nodes.Plane040.geometry}
        material={gltf.materials["Material.003"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane040_1.geometry}
        material={gltf.materials["Material.001"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane040_2.geometry}
        material={gltf.materials["Material.017"]}
      />
    </T.Group>
    <T.Group position={[0, 0.94, 33.04]} scale={[0.4, 1.01, 0.4]}>
      <T.Mesh
        geometry={gltf.nodes.PuenteGrande001_1.geometry}
        material={gltf.materials["Material.018"]}
      />
      <T.Mesh
        geometry={gltf.nodes.PuenteGrande001_2.geometry}
        material={gltf.materials["Material.018"]}
      />
      <T.Mesh
        geometry={gltf.nodes.PuenteGrande001_3.geometry}
        material={gltf.materials["Material.018"]}
      />
    </T.Group>
    <T.Group position={[-0.84, 2.51, -15.4]} rotation={[Math.PI / 2, 0, 0]}>
      <T.Mesh
        geometry={gltf.nodes.Station001_1.geometry}
        material={gltf.materials["FrontColor.013"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Station001_2.geometry}
        material={gltf.materials["Material.031"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Station001_3.geometry}
        material={gltf.materials["Material.025"]}
      />
    </T.Group>
    <T.Group
      position={[-24.48, 4.52, 9.78]}
      rotation={[0, -1.01, 0.15]}
      scale={2.24}
    >
      <T.Mesh
        geometry={gltf.nodes.Cylinder009_1.geometry}
        material={gltf.materials["Material.044"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cylinder009_2.geometry}
        material={gltf.materials["Material.017"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cylinder009_3.geometry}
        material={gltf.materials["Material.043"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cylinder009_4.geometry}
        material={gltf.materials["Material.050"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cylinder009_5.geometry}
        material={gltf.materials["Material.051"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cylinder009_6.geometry}
        material={gltf.materials["Material.059"]}
      />
    </T.Group>
    <T.Group
      position={[12.12, 4.19, -21]}
      rotation={[Math.PI, -0.59, Math.PI]}
      scale={[1, 3, 1]}
    >
      <T.Mesh
        geometry={gltf.nodes.Cylinder021_1.geometry}
        material={gltf.materials["Material.050"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cylinder021_2.geometry}
        material={gltf.materials["Material.051"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cylinder021_3.geometry}
        material={gltf.materials["Material.017"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cylinder021_4.geometry}
        material={gltf.materials["Material.043"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cylinder021_5.geometry}
        material={gltf.materials["Material.044"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Cylinder021_6.geometry}
        material={gltf.materials["Material.059"]}
      />
    </T.Group>
    <T.Group position={[-4.6, 3, 29.45]} scale={1.5}>
      <T.Mesh
        geometry={gltf.nodes.Plane042.geometry}
        material={gltf.materials["Material.038"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_1.geometry}
        material={gltf.materials["Material.063"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_2.geometry}
        material={gltf.materials["border oro.001"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_3.geometry}
        material={gltf.materials["Material.064"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_4.geometry}
        material={gltf.materials["Material.031"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_5.geometry}
        material={gltf.materials["Material.066"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_6.geometry}
        material={gltf.materials["Material.067"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_7.geometry}
        material={gltf.materials["Material.068"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_8.geometry}
        material={gltf.materials["Material.069"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_9.geometry}
        material={gltf.materials["Material.063"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_10.geometry}
        material={gltf.materials["Material.070"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_11.geometry}
        material={gltf.materials["Material.031"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_12.geometry}
        material={gltf.materials["Material.075"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_13.geometry}
        material={gltf.materials["Material.076"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_14.geometry}
        material={gltf.materials["Material.063"]}
      />
      <T.Mesh
        geometry={gltf.nodes.Plane042_15.geometry}
        material={gltf.materials["Material.063"]}
      />
    </T.Group>
  {:catch err}
    {@render error?.({ error: err })}
  {/await}

  {@render children?.({ ref })}
</T.Group>
