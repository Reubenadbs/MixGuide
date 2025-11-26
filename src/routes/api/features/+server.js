import { json } from '@sveltejs/kit';
import { RAPID_API_KEY } from '$env/static/private'

export async function GET({ url }) {
  const id = url.searchParams.get('id');

  if (!id) {
    return json({ error: 'Missing id parameter' }, { status: 400 });
  }

// Url van de endpoint maken en track id en meegeven met authrorization
  const endpointUrl = `https://track-analysis.p.rapidapi.com/pktx/spotify/${encodeURIComponent(id)}`;

// Een fetch naar de RapidAPI met key en host voor authorization
  try {
    const res = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'track-analysis.p.rapidapi.com'
      }
    });

    const bodyText = await res.text();

    if (!res.ok) {
      return json(
        {
          error: 'RapidAPI request failed',
          status: res.status,
          body: bodyText
        }
      );
    }

    let data;
    try {
      data = JSON.parse(bodyText);
    } catch {
      data = { raw: bodyText };
    }

    return json(data);
  } catch (err) {
    return json({ error: 'Server error calling RapidAPI' }, { status: 500 });
  }
}
