import random
import requests
from django.http import JsonResponse
from django.http import HttpResponse

all_breeds = []
available_breeds = []
sended_breeds = []
LEVELS = ['affection_level','adaptability','energy_level','intelligence','vocalisation','social_needs']
EXTRA_LEVELS = ['stranger_friendly','child_friendly','dog_friendly','grooming','health_issues','shedding_level']
THE_CAT_API_ENDPOINT = 'https://api.thecatapi.com/v1'
HEADERS = {'x-api-key': 'live_lnQuYxTbHPNxcVNbaQhbjqnJyLDBNVaCR5VnexkoAKePK2hEdqju23593jVaMMpB'}

def get_breed(request):
    global all_breeds
    global available_breeds
    global sended_breeds

    # GETTING ARGUMENTS
    reset = request.GET.get('reset')
    get_length = request.GET.get('get_length')
    update_breeds = request.GET.get('update_breeds')
    selected_index = request.GET.get('selected_index')
    selected_level = request.GET.get('selected_level')    
    selected_action = request.GET.get('selected_action')

    # FETCHING ALL BREEDS AT FIRST TIME
    if len(all_breeds) == 0:
        response = requests.get(f'{THE_CAT_API_ENDPOINT}/breeds', headers=HEADERS)
        data = response.json()
        all_breeds = data
        available_breeds = all_breeds.copy()

    # RESET FUNCTION
    if reset == 'true':
        available_breeds = []
        available_breeds = all_breeds.copy()
        sended_breeds = []
        return HttpResponse()

    # SEND ALL BREEDS LENGTH
    if get_length == 'true':
        return HttpResponse(len(all_breeds))
    
    # UPDATING AVAILABLE BREEDS WHEN LOGIN
    if update_breeds:
        update_breeds_list = update_breeds.split(',')
        sended_breeds = []
        for id in update_breeds_list:
            addBreed = next((breed for breed in all_breeds if breed['id'] == id), None)
            sended_breeds.append(addBreed)
        available_breeds = [breed for breed in all_breeds if breed not in sended_breeds]
        print (sended_breeds)
        return HttpResponse()

    # LOOKING FOR RANDOM BREED WITH A LOW SCORE IF SELECTED INDEX IS UNDEFINED (FIRST CALL) 
    if selected_index == 'undefined':
        def low_scoring(breed):
            score = 0
            for level in LEVELS: 
                score += breed.get(level)
            return score
        sorted_breeds = sorted(all_breeds, key=low_scoring)
        lowest_scores = sorted_breeds[:15]
        randomIndex = random.randint(0, len(lowest_scores) - 1)
        breed = lowest_scores[randomIndex]

    # LOOKING FOR MAX-SCORED BREED IF SELECTED INDEX IS DEFINED
    else:
        selected_index = int(selected_index)
        selected_level = LEVELS[int(selected_level) - 1]

        # UPDATING SENDED_BREEDS IF THE ORIGIN BREED IS NOT THE LAST SENDED 
        if selected_index + 1 < len(sended_breeds) :
            sended_breeds = sended_breeds[:selected_index + 1]
            available_breeds = [breed for breed in all_breeds if breed not in sended_breeds]

        # GETTING BREEDS THAT MEET THE REQUERIMENT
        if selected_action == '=': 
            match_breeds = [breed for breed in available_breeds if breed.get(selected_level) == sended_breeds[selected_index].get(selected_level)]
        elif selected_action == '-':
            match_breeds = [breed for breed in available_breeds if breed.get(selected_level) < sended_breeds[selected_index].get(selected_level)]
        else:
            match_breeds = [breed for breed in available_breeds if breed.get(selected_level) > sended_breeds[selected_index].get(selected_level)]

        # GETTING MAX-SCORED BREED
        def scoring(breed):
            score = 0
            for level in LEVELS:
                level_score = 5 - abs(sended_breeds[selected_index].get(level) - breed.get(level))
                score += level_score
            return score
        breed = max(match_breeds, key=scoring)

    # UPDATING SENDED AND AVAILABLE BREEDS
    sended_breeds.append(breed)
    available_breeds.remove(breed)

    # FETCHING IMAGES
    imagesResponse = requests.get(f'{THE_CAT_API_ENDPOINT}/images/search?limit=10&breed_ids={breed["id"]}', headers=HEADERS)
    imagesData = imagesResponse.json()

    # BUILDING BREED TO RETURN
    new_breed = {
        'id': breed['id'],
        'name': breed['name'],
        'images': [
        {
            "id": image["id"],
            "url": image["url"],
            "height": image["height"],
            "width": image["width"]
        } for image in imagesData],
        'description': breed['description'],
        'fav': False,
        'selected_level': None,
        'selected_action': None,
        'levels': {},
        'extra_levels': {}
    }

    # ADDING LEVELS AND ACTION ABILITIES TO BREED
    for level in LEVELS:
        new_breed['levels'][level] = {
            'points': breed[level],
            'plus_ability': any(available_breed.get(level) > breed.get(level) for available_breed in available_breeds),
            'equal_ability': any(available_breed.get(level) == breed.get(level) for available_breed in available_breeds),
            'less_ability': any(available_breed.get(level) < breed.get(level) for available_breed in available_breeds),
        }
    for extra_level in EXTRA_LEVELS:
        new_breed['extra_levels'][extra_level] = {
            'points': breed[extra_level],
        }

    print(new_breed['name'])
    return JsonResponse(new_breed)


