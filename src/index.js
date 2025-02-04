const cardsContainer = document.querySelector('.cards');

function createPokemonCard(pokemon) {
    const card = document.createElement('li');
    card.className = 'card';

    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const stats = {};
    pokemon.stats.forEach(stat => {
        stats[stat.stat.name] = stat.base_stat;
    });

    const games = pokemon.game_indices.map(game => {
        return game.version.name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    });

    card.innerHTML = `
        <h2 class="card--title">${pokemonName}</h2>
        <img
            width="256"
            class="card--img"
            src="${pokemon.sprites.other['official-artwork'].front_default}"
        />
        <ul class="card--text">
            <li>HP: ${stats.hp}</li>
            <li>ATTACK: ${stats.attack}</li>
            <li>DEFENSE: ${stats.defense}</li>
            <li>SPECIAL-ATTACK: ${stats['special-attack']}</li>
            <li>SPECIAL-DEFENSE: ${stats['special-defense']}</li>
            <li>SPEED: ${stats.speed}</li>
        </ul>
        <div class="card--games">
            <h3>Appears in:</h3>
            <ul class="games-list">
                ${games.map(game => `<li>${game}</li>`).join('')}
            </ul>
        </div>
    `;

    return card;
}

data.forEach(pokemon => {
    const pokemonCard = createPokemonCard(pokemon);
    cardsContainer.appendChild(pokemonCard);
});
