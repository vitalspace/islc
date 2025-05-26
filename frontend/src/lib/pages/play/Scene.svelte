<script lang="ts">
  import { Sky } from "@threlte/extras";
  import { WS } from "../../constants/constants";
  import Player from "./componets/player/Player.svelte";
  import RemotePlayer from "./componets/player/RemotePlayer.svelte";
  import { initKeyboard } from "./stores/keyStores";
  import type { Player as PlayerType } from "./types/types";
  import { WebsocketService } from "./websockets/WebsocketServices";
  import Water from "./componets/world/Water.svelte";
  import SpaceStation from "./componets/world/spaceStation/SpaceStation.svelte";
  import MainIsland from "./componets/world/mainIsland/MainIsland.svelte";
  import Warzone from "./componets/world/warzone/Warzone.svelte";
  import Parkour from "./componets/world/parkour/Parkour.svelte";

  import type { DinamicObject } from "./types/types";

  let playerId = $state("");
  let player = $state<PlayerType>();
  let players = $state<PlayerType[]>([]);
  let spaceShip = $state<DinamicObject>();

  const websockets = new WebsocketService(WS);
  let websocketStatus = $state<"connecting" | "open" | "closed" | "error">(
    "closed"
  );
  websockets.status.subscribe((status) => (websocketStatus = status));

  websockets.messages.subscribe((message) => {
    if (!message?.type) return;

    switch (message.type) {
      case "playerId": {
        playerId = message.id;
        break;
      }
      case "currentPlayers": {
        Object.keys(message.players).forEach((_id) => {
          const { id, position, rotation, health, currentRoom } =
            message.players[_id];

          if (_id === playerId) {
            player = {
              id,
              position,
              rotation,
              health,
              currentRoom,
            };
          } else {
            players = [
              ...players,
              { id, position, rotation, health, currentRoom },
            ];
          }
        });

        break;
      }

      case "newPlayer": {
        players = [...players, message.player];
        break;
      }

      case "playerDisconnected": {
        players = players.filter((player) => player.id !== message.id);
        break;
      }

      // case "spawnSpaceShip": {
      //   spaceShip = message.spaceShip;
      //   break;
      // }

      // case "spaceShipUpdate": {

      //   // console.log(message.position.y);

      //   // console.log(message.spaceShip.position.y);

      //   spaceShip = message
      //   break;
      // }

      case "playerMove": {
        players.forEach((player) => {
          if (player.id === message.player.id) {
            player.position = message.player.position;
            player.rotation = message.player.rotation;
          }
        });
        break;
      }

      case "playerHealth": {
        players.forEach((py) => {
          if (py.id === message.id) {
            py.health = message.health;
            // player.health = message.health;
            // console.log(player)
          }

          if (playerId === message.id) {
            //@ts-ignore
            player.health = message.health;
          }
        });
        break;
      }
    }
  });

  $effect(() => {
    const destroy = initKeyboard();
    return destroy;
  });
</script>

<Sky elevation={0.5} azimuth={130} />
<MainIsland />
<Warzone />
<Water />
<Parkour />

{#if websocketStatus && player}
  <Player playerInfo={player} webSocket={websockets} />

  {#if players.length > 0}
    {#each players as player (player.id)}
      <RemotePlayer playerInfo={player} />
    {/each}
  {/if}

  <SpaceStation webSocket={websockets} />
{/if}

<!-- <T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0);
  }}
/> -->

<!-- <T.DirectionalLight position={[0, 10, 10]} castShadow /> -->

<!-- <T.Mesh position={[0, 1, 0]}>
  <T.BoxGeometry args={[1, 2, 1]} />
  <T.MeshStandardMaterial color="blue" />
</T.Mesh> -->
