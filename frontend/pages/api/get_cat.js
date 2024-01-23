import catsMissedImages from '../../data/cats-missed-images.json';

let allCats = [];
let availableCats = [];
let sentCats = [];
const LEVELS = [
  'affection_level',
  'adaptability',
  'energy_level',
  'intelligence',
  'vocalisation',
  'social_needs',
];
const EXTRA_LEVELS = [
  'stranger_friendly',
  'child_friendly',
  'dog_friendly',
  'grooming',
  'health_issues',
  'shedding_level',
];
const THE_CAT_API_ENDPOINT = 'https://api.thecatapi.com/v1';
const HEADERS = {
  'x-api-key': process.env.THE_CAT_API_KEY,
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // GETTING ARGUMENTS
      const reset = req.query.reset;
      const getLength = req.query.get_length;
      const updateCats = req.query.update_cats;
      const selectedIndex = req.query.selected_index;
      const selectedLevel = req.query.selected_level;
      const selectedAction = req.query.selected_action;

      // FETCHING ALL CATS AT FIRST TIME
      if (allCats.length === 0) {
        const response = await fetch(`${THE_CAT_API_ENDPOINT}/breeds`, {
          headers: HEADERS,
        });
        const data = await response.json();
        allCats = data;
        availableCats = [...allCats];
      }

      // RESET FUNCTION
      if (reset === 'true') {
        availableCats = [...allCats];
        sentCats = [];
        return res.send();
      }

      // SEND ALL CATS LENGTH
      if (getLength === 'true') {
        return res.send(allCats.length.toString());
      }

      // UPDATING AVAILABLE CATS WHEN LOGIN
      if (updateCats) {
        const updateCatsList = updateCats.split(',');
        sentCats = [];
        for (const id of updateCatsList) {
          const addCat = allCats.find((cat) => cat.id === id);
          sentCats.push(addCat);
        }
        availableCats = allCats.filter((cat) => !sentCats.includes(cat));
        return res.send();
      }

      let cat;

      // LOOKING FOR RANDOM CAT WITH A LOW SCORE IF SELECTED INDEX IS UNDEFINED (FIRST CALL)
      if (selectedIndex === 'undefined') {
        const lowScoring = (cat) =>
          LEVELS.reduce((score, level) => score + cat[level], 0);
        const sortedCats = allCats.sort(
          (a, b) => lowScoring(a) - lowScoring(b)
        );
        const lowestScores = sortedCats.slice(0, 15);
        const randomIndex = Math.floor(Math.random() * lowestScores.length);
        cat = lowestScores[randomIndex];
      }
      // LOOKING FOR MAX-SCORED CAT IF SELECTED INDEX IS DEFINED
      else {
        const selectedIndexInt = parseInt(selectedIndex);
        const selectedLevelName = LEVELS[parseInt(selectedLevel) - 1];

        //// UPDATING SENDED_CATS IF THE ORIGIN CAT IS NOT THE LAST SENDED
        if (selectedIndexInt + 1 < sentCats.length) {
          sentCats = sentCats.slice(0, selectedIndexInt + 1);
          availableCats = allCats.filter((cat) => !sentCats.includes(cat));
        }

        //// GETTING CATS THAT MEET THE REQUERIMENT
        let matchCats;
        if (selectedAction === '=') {
          matchCats = availableCats.filter(
            (cat) =>
              cat[selectedLevelName] ===
              sentCats[selectedIndexInt][selectedLevelName]
          );
        } else if (selectedAction === '-') {
          matchCats = availableCats.filter(
            (cat) =>
              cat[selectedLevelName] <
              sentCats[selectedIndexInt][selectedLevelName]
          );
        } else {
          matchCats = availableCats.filter(
            (cat) =>
              cat[selectedLevelName] >
              sentCats[selectedIndexInt][selectedLevelName]
          );
        }

        //// GETTING MAX-SCORED CAT
        const scoring = (cat) =>
          LEVELS.reduce(
            (score, level) =>
              score +
              (5 - Math.abs(sentCats[selectedIndexInt][level] - cat[level])),
            0
          );
        cat = matchCats.reduce(
          (maxCat, currentCat) =>
            scoring(currentCat) > scoring(maxCat) ? currentCat : maxCat,
          matchCats[0]
        );
      }

      // UPDATING SENDED AND AVAILABLE CATS
      sentCats.push(cat);
      availableCats = availableCats.filter((c) => c !== cat);

      // FETCHING IMAGES
      const imagesResponse = await fetch(
        `${THE_CAT_API_ENDPOINT}/images/search?limit=5&breed_ids=${cat.id}`,
        { headers: HEADERS }
      );
      const imagesData = await imagesResponse.json();

      // ADDING MISSED IMAGES IF CAT IS IN 'CATS_MISSED_IMAGES'
      for (const missedCat of catsMissedImages) {
        if (missedCat.id === cat.id) {
          imagesData.push(...missedCat.images);
        }
      }

      // BUILDING NEW CAT TO RETURN
      const newCat = {
        id: cat.id,
        name: cat.name,
        images: imagesData.map((image) => ({ id: image.id, url: image.url })),
        description: cat.description,
        fav: false,
        selected_level: null,
        selected_action: null,
        levels: {},
        extra_levels: {},
      };

      // ADDING LEVELS AND ACTION ABILITIES TO NEW CAT
      for (const level of LEVELS) {
        newCat.levels[level] = {
          points: cat[level],
          plus_ability: availableCats.some(
            (availableCat) => availableCat[level] > cat[level]
          ),
          equal_ability: availableCats.some(
            (availableCat) => availableCat[level] === cat[level]
          ),
          less_ability: availableCats.some(
            (availableCat) => availableCat[level] < cat[level]
          ),
        };
      }
      // ADDING EXTRA LEVELS TO NEW CAT
      for (const extraLevel of EXTRA_LEVELS) {
        newCat.extra_levels[extraLevel] = {
          points: cat[extraLevel],
        };
      }

      return res.status(200).json(newCat);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error: ' + error);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;