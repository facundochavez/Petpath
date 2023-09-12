const allBreeds = [];
const imageNeedBreeds = [];
const THE_CAT_API_ENDPOINT = 'https://api.thecatapi.com/v1';

export default async function getAllBreeds() {
  try {
    const response = await fetch(`${THE_CAT_API_ENDPOINT}/breeds`, {
      headers: {
        'x-api-key':
          'live_lnQuYxTbHPNxcVNbaQhbjqnJyLDBNVaCR5VnexkoAKePK2hEdqju23593jVaMMpB',
      },
    });
    const data = await response.json();
    allBreeds.push(...data);

    allBreeds.map(async (breed) => {
      const imagesResponse = await fetch(
        `${THE_CAT_API_ENDPOINT}/images/search?limit=3&breed_ids=${breed.id}`,
        {
          headers: {
            'x-api-key':
              'live_lnQuYxTbHPNxcVNbaQhbjqnJyLDBNVaCR5VnexkoAKePK2hEdqju23593jVaMMpB',
          },
        }
      );
      const imagesData = await imagesResponse.json();
      if (imagesData.length < 3) {
        imageNeedBreeds.push([breed.name, breed.id, 3 - imagesData.length]);
      }
    });

    console.log(imageNeedBreeds);
  } catch (error) {
    console.error(error);
    return null;
  }
}

// SI SIGUE EL PROBLEMA DEL NAME NULL, PODRÍAMOS DECIR IF TYPEOF ... != NULL

// Dropdown:
// Sign in / Dogs -> Tour/ Cats -> Tour


// OK, at first we'll give you a random breed...
// These are the breed levels. Here you can learn a lot about the animal behavior and its traits.
// By selecting any level, you can make a request to explore new breeds.
// We'll give you a new breed with that request and try to keep the others levels close enough.
// Here you can mark your favorite breeds and watch the path you've made. There is a suprise if you find all breeds...
// You can register to save your path too!
// Let's start now with a random breed! 
// Congrats! you have discovered all breeds! 🐶🐱💗
