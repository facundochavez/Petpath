const availableBreeds = [];
const THE_CAT_API_ENDPOINT = 'https://api.thecatapi.com/v1';

export default async function getBreed({
  from_id = 'none',
  from_level = 'none',
  from_requeriment = 'none',
  tour = false,
}) {
  try {

    // FETCHING
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
    const randomIndex = Math.floor(Math.random() * availableBreeds.length);

    // TOUR OR RANDOM
    const breed = !tour
      ? availableBreeds[randomIndex]
      : availableBreeds.sort(
          (a, b) => a.affection_level - b.affection_level
        )[0];

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
      levels: {
        affection_level: {
          score: breed.affection_level,
          plus_ability: !tour? true : true,
          equal_ability: !tour? true : false,
          less_ability: !tour? true : false,
        },
        adaptability: {
          score: breed.adaptability,
          plus_ability: true,
          equal_ability: true,
          less_ability: true,
        },
        energy_level: {
          score: breed.energy_level,
          plus_ability: true,
          equal_ability: true,
          less_ability: true,
        },
        intelligence: {
          score: breed.intelligence,
          plus_ability: true,
          equal_ability: true,
          less_ability: true,
        },
        vocalisation: {
          score: breed.vocalisation,
          plus_ability: true,
          equal_ability: true,
          less_ability: true,
        },
        social_needs: {
          score: breed.social_needs,
          plus_ability: true,
          equal_ability: true,
          less_ability: true,
        },
      },
      extra_levels: {
        stranger_friendly: {
          score: breed.stranger_friendly,
        },
        child_friendly: {
          score: breed.child_friendly,
        },
        dog_friendly: {
          score: breed.dog_friendly,
        },
        grooming: {
          score: breed.grooming,
        },
        health_issues: {
          score: breed.health_issues,
        },
        shedding_level: {
          score: breed.shedding_level,
        },
      },
      from_id: from_id,
      from_level: from_level,
      from_requeriment: from_requeriment,
    };
    return newBreed;
  } catch (error) {
    console.error(error);
    return null;
  }
}
