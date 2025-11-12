import { RAPIDAPI_KEY} from '$env/static/private';
import { shapeTracks } from '$lib/server/spotify';

export async function GET(){

    const spotifyTrackID = "5t7TMXjn6g5hVbTf8ncFyf"
    const url = `https://track-analysis.p.rapidapi.com/pktx/spotify/${spotifyTrackID}`;
    
    const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': 'track-analysis.p.rapidapi.com'
        }
      };
    
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
    
      // Return the JSON to the browser when you visit /api/whatever
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }