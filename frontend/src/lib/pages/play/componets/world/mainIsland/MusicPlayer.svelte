<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { FakeGlowMaterial, PositionalAudio, HTML } from "@threlte/extras";
  import { AutoColliders } from "@threlte/rapier";
  import { keys } from "../../../stores/keyStores";
  import { z } from "zod";

  const schema = z.string().url();

  let isOnCheckPoint = $state(false);
  let url = $state("");
  let songUrl = $state("");
  // let play = $state(false);
  let showInput = $state(false);

  const getSong = async (vidId: string) => {
    const req = await fetch(
      `https://youtube-mp36.p.rapidapi.com/dl?id=${vidId}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "48e60ef6a3mshb775fd72f7e53ffp14a39fjsn5b29ac2c9268",
          "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
        },
      }
    );

    const result = await req.json();

    return result.link;
  };

  const hadleCollision = async () => {
    isOnCheckPoint = true;
    // play = true;
  };

  const cleanUrl = (url: string) => {
    const urlObject = new URL(url);
    return urlObject.searchParams.get("v");
  };

  const play = async () => {
    if (!url) return;

    const result = schema.safeParse(url);
    if (!result.success) return;

    const songId = cleanUrl(url);


    if (!songId) return;

    const song = await getSong(songId);
    url = "";
    showInput = false;
    songUrl = song;
  };

  useTask(() => {
    if (isOnCheckPoint && $keys.e.isPressed) {
      showInput = true;
      console.log("me cumplo");
    }
  });
</script>

<T.Group position={[18, 0.3, 0.1]}>
  <AutoColliders
    shape="cuboid"
    sensor={true}
    onsensorenter={hadleCollision}
    onsensorexit={() => {
      isOnCheckPoint = false;
      //   play = false;
    }}
  >
    <T.Mesh>
      <T.CylinderGeometry args={[0.4, 0.4, 0.5]} />
      <FakeGlowMaterial
        glowColor="green"
        falloff={1}
        glowInternalRadius={1}
        glowSharpness={5}
        depthTest={true}
      />
    </T.Mesh>
  </AutoColliders>
</T.Group>

{#if songUrl}
  <T.Group position={[20.5, 0.3, 0.1]}>
      <PositionalAudio autoplay src={songUrl} refDistance={2} />
  </T.Group>
{/if}

<T.Group position={[18, .7, 0.1]} rotation={[0, Math.PI / -2, 0]}>
  <HTML transform occlude={false}>
    <div class="text-center">
      <p class="text-white text-[8px] w-full">Press E</p>
    </div>
  </HTML>
</T.Group>

{#if showInput}
  <T.Group
    position={[19.5, 1.2, 0]}
    rotation={[0, Math.PI / -2, 0]}
    scale={0.5}
  >
    <HTML transform occlude={false}>
      <div
        class="bg-white text-black text-xs p-2 flex justify-center justify-items-center gap-2 rounded-md"
      >
        <img class="w-5 h-5" src="youtube.svg" alt="" />

        <input
          class="px-2 w-full outline-none border border-black rounded-md"
          type="url"
          name=""
          id=""
          placeholder="Url"
          onkeydown={(e) => e.stopPropagation()}
          bind:value={url}
        />

        <button
          onclick={() => play()}
          class="bg-black text-white px-2 rounded-md cursor-pointer"
          >Play</button
        >
      </div>
    </HTML>
  </T.Group>
{/if}
