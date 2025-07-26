from serpapi import GoogleSearch
import os

async def search_flights(origin: str, destination: str, date: str = None, preferences: str = None):
    params = {
        'engine': 'google_flights',
        'api_key': os.environ['SERPAPI_KEY'],
        'origin': origin,
        'destination': destination
    }
    if date:
        params['date'] = date
    if preferences:
        params['preferences'] = preferences
    search = GoogleSearch(params)
    return search.get_json()

async def search_hotels(location: str, check_in: str = None, check_out: str = None):
    params = {
        'engine': 'google_hotels',
        'api_key': os.environ['SERPAPI_KEY'],
        'location': location
    }
    if check_in:
        params['checkin'] = check_in
    if check_out:
        params['checkout'] = check_out
    search = GoogleSearch(params)
    return search.get_json()
