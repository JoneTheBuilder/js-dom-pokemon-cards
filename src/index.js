const cardsContainer = document.querySelector(".cards");

function getAllFrontDefaultSprites(sprites) {
  const allSprites = [];

  if (sprites.front_default) allSprites.push(sprites.front_default);

  if (sprites.other) {
    if (sprites.other["official-artwork"]?.front_default) {
      allSprites.push(sprites.other["official-artwork"].front_default);
    }
    if (sprites.other.dream_world?.front_default) {
      allSprites.push(sprites.other.dream_world.front_default);
    }
  }

  if (sprites.versions) {
    for (const generation in sprites.versions) {
      const genSprites = sprites.versions[generation];
      for (const version in genSprites) {
        if (version === "animated" && genSprites[version].front_default) {
          allSprites.push(genSprites[version].front_default);
        } else if (genSprites[version].front_default) {
          allSprites.push(genSprites[version].front_default);
        }
      }
    }
  }

  return allSprites.filter((url) => url !== null);
}

function createPokemonCard(pokemon) {
  const card = document.createElement("li");
  card.className = "card";

  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const stats = {};
  pokemon.stats.forEach((stat) => {
    stats[stat.stat.name] = stat.base_stat;
  });

  const games = pokemon.game_indices.map((game) => {
    return game.version.name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });

  const spriteUrls = getAllFrontDefaultSprites(pokemon.sprites);

  card.innerHTML = `
        <h2 class="card--title">${pokemonName}</h2>
        <img
            width="256"
            class="card--img"
            src="${spriteUrls[0]}"
            data-sprite-index="0"
            data-sprite-urls='${JSON.stringify(spriteUrls)}'
        />
        <ul class="card--text">
            <li>HP: ${stats.hp}</li>
            <li>ATTACK: ${stats.attack}</li>
            <li>DEFENSE: ${stats.defense}</li>
            <li>SPECIAL-ATTACK: ${stats["special-attack"]}</li>
            <li>SPECIAL-DEFENSE: ${stats["special-defense"]}</li>
            <li>SPEED: ${stats.speed}</li>
        </ul>
        <div class="card--games">
            <h3>Appears in:</h3>
            <ul class="games-list">
                ${games.map((game) => `<li>${game}</li>`).join("")}
            </ul>
        </div>
    `;

  const img = card.querySelector(".card--img");
  img.addEventListener("click", function () {
    const urls = JSON.parse(this.dataset.spriteUrls);
    let currentIndex = parseInt(this.dataset.spriteIndex);
    currentIndex = (currentIndex + 1) % urls.length;
    this.src = urls[currentIndex];
    this.dataset.spriteIndex = currentIndex;
  });

  return card;
}

data.forEach((pokemon) => {
  const pokemonCard = createPokemonCard(pokemon);
  cardsContainer.appendChild(pokemonCard);
});
