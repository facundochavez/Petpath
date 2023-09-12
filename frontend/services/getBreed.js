const availableBreeds = [];
const THE_CAT_API_ENDPOINT = 'https://api.thecatapi.com/v1';

export default async function getBreed() {
  try {
    // FIRST BREEDS FETCHING
    if (availableBreeds.length === 0) {
      const response = await fetch(`${THE_CAT_API_ENDPOINT}/breeds`, {
        headers: {
          'x-api-key':
            'live_lnQuYxTbHPNxcVNbaQhbjqnJyLDBNVaCR5VnexkoAKePK2hEdqju23593jVaMMpB',
        },
      });
      const data = await response.json();
      availableBreeds.push(...data);
    }

    // GETING RANDOM BREED
    const randomIndex = Math.floor(Math.random() * availableBreeds.length);
    const breed = availableBreeds[randomIndex];
    /*   const breed = availableBreeds.sort(
      (a, b) => b.name.length - a.name.length
    )[0]; */

    // UPDATING AVAILABLE BREEDS
    availableBreeds.splice(randomIndex, 1);

    // IMAGE FETCHING
    const imagesResponse = await fetch(
      `${THE_CAT_API_ENDPOINT}/images/search?limit=10&breed_ids=${breed.id}`,
      {
        headers: {
          'x-api-key':
            'live_lnQuYxTbHPNxcVNbaQhbjqnJyLDBNVaCR5VnexkoAKePK2hEdqju23593jVaMMpB',
        },
      }
    );
    const imagesData = await imagesResponse.json();

    // CREATING RETURNING DATA
    const newBreed = {
      id: breed.id,
      name: breed.name ? breed.name : 'ESTO DA ERROR',
      images: [...imagesData],
      description: breed.description,
      fav: false,
      selectedLevel: null,
      selectedAction: null,
      levels: {
        affection_level: {
          points: breed.affection_level,
          plus_ability: true,
          equal_ability: true,
          less_ability: true,
        },
        adaptability: {
          points: breed.adaptability,
          plus_ability: true,
          equal_ability: true,
          less_ability: true,
        },
        energy_level: {
          points: breed.energy_level,
          plus_ability: true,
          equal_ability: true,
          less_ability: true,
        },
        intelligence: {
          points: breed.intelligence,
          plus_ability: true,
          equal_ability: true,
          less_ability: true,
        },
        vocalisation: {
          points: breed.vocalisation,
          plus_ability: true,
          equal_ability: true,
          less_ability: true,
        },
        social_needs: {
          points: breed.social_needs,
          plus_ability: true,
          equal_ability: true,
          less_ability: true,
        },
      },
      extra_levels: {
        stranger_friendly: {
          points: breed.stranger_friendly,
        },
        child_friendly: {
          points: breed.child_friendly,
        },
        dog_friendly: {
          points: breed.dog_friendly,
        },
        grooming: {
          points: breed.grooming,
        },
        health_issues: {
          points: breed.health_issues,
        },
        shedding_level: {
          points: breed.shedding_level,
        },
      },
    };
    return newBreed;
  } catch (error) {
    console.error(error);
    return null;
  }
}
