const DT = {
  NONE: 1,
  REGULAR: 2,
  GREATER: 3,
};

Hooks.once("ready", async function () {
  if (game.user.isGM) {
    Hooks.on("preCreateRegion", async (regionDocument) => {
      const behaviors = [];
      switch (regionDocument?.flags?.pf2e?.origin?.slug) {
        // Regular DT, Ground Only
        case "500-toads":
        case "antlion-trap":
        case "bramble-bush":
        case "cave-fangs":
        case "earthworks":
        case "entangling-flora":
        case "field-of-razors":
        case "mud-pit":
        case "mushroom-patch":
        case "natures-reprisal":
        case "oneiric-mire":
        case "phantom-crowd":
        case "pillar-of-water":
        case "rime-slick":
        case "roses-thorns":
        case "scatter-scree":
        case "sea-of-thought":
        case "shifting-sand":
        case "swamp-of-sloth":
        case "swampcall":
        case "telekinetic-bombardment":
        case "untwisting-iron-roots":
        case "verdant-sprout":
        case "warped-terrain":
        case "web":
          behaviors.push(
            getDifficultTerrain({
              walk: DT.REGULAR,
            }),
          );
          break;

        // Fly Regular DT
        case "ash-cloud":
        case "blast-of-the-bellows":
        case "flame-vortex":
        case "volcanic-eruption":
          behaviors.push(
            getDifficultTerrain({
              fly: DT.REGULAR,
            }),
          );
          break;

        // Fly Greater DT
        case "wrathful-storm":
          behaviors.push(
            getDifficultTerrain({
              fly: DT.GREATER,
            }),
          );
          break;

        // Burrow Regular DT
        case "burrow-ward":
          behaviors.push(
            getDifficultTerrain({
              burrow: DT.REGULAR,
            }),
          );
          break;

        case "cyclone-rondo":
        case "freezing-rain":
        case "gluttonous-growth":
        case "howling-blizzard":
        case "solid-fog":
        case "stifling-stillness":
          behaviors.push(
            getDifficultTerrain({
              walk: DT.REGULAR,
              fly: DT.REGULAR,
            }),
          );
          break;

        case "corrosive-muck":
          behaviors.push(
            getDifficultTerrain({
              walk: DT.GREATER,
              swim: DT.GREATER,
            }),
          );
          break;

        case "coral-eruption":
        case "etheric-shards":
        case "ice-storm":
        case "rainbow-fumarole":
        case "sawtooth-terrain":
        case "spike-stones":
        case "whirlpool":
        case "whirlwind":
          behaviors.push(
            getDifficultTerrain({
              walk: DT.REGULAR,
              fly: DT.REGULAR,
              swim: DT.REGULAR,
            }),
          );
          break;

        case "punishing-winds":
          behaviors.push(
            getDifficultTerrain({
              fly: DT.GREATER,
              walk: DT.REGULAR,
            }),
          );
          break;
        default:
          return;
      }

      if (behaviors.length > 0) {
        regionDocument.createEmbeddedDocuments("RegionBehavior", behaviors);
      }
    });
  }
});

function getDifficultTerrain({
  walk = DT.NONE,
  fly = DT.NONE,
  swim = DT.NONE,
  burrow = DT.NONE,
  deploy = DT.NONE,
  travel = DT.NONE,
}) {
  return {
    name: "Difficult Terrain",
    type: "modifyMovementCost",
    system: {
      difficulties: {
        walk,
        fly,
        swim,
        burrow,
        deploy,
        travel,
      },
    },
    disabled: false,
  };
}
