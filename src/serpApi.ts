import SerpApiSearch from 'serpapi'

interface FlightSearchParams {
  origin: string
  destination: string
  date?: string
  preferences?: string
}

interface HotelSearchParams {
  location: string
  checkInDate?: string
  checkOutDate?: string
}

export async function searchFlights({ origin, destination, date, preferences }: FlightSearchParams): Promise<any> {
  const client = new SerpApiSearch(process.env.SERPAPI_KEY!)
  const params: Record<string, unknown> = {
    engine: 'google_flights',
    origin,
    destination
  }
  if (date) params.date = date
  if (preferences) params.preferences = preferences
  const result = await client.json(params)
  return result
}

export async function searchHotels({ location, checkInDate, checkOutDate }: HotelSearchParams): Promise<any> {
  const client = new SerpApiSearch(process.env.SERPAPI_KEY!)
  const params: Record<string, unknown> = {
    engine: 'google_hotels',
    location
  }
  if (checkInDate) params.checkin = checkInDate
  if (checkOutDate) params.checkout = checkOutDate
  const result = await client.json(params)
  return result
}
