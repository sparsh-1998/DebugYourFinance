/**
 * Netlify Serverless Function - Instagram Feed
 * Fetches recent media from Instagram Basic Display API
 */

exports.handler = async function(event, context) {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get Instagram access token from environment variables
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Instagram access token not configured',
        message: 'Please set INSTAGRAM_ACCESS_TOKEN in your environment variables'
      })
    };
  }

  try {
    // Fetch user's media from Instagram Basic Display API
    // Fields: id, caption, media_type, media_url, thumbnail_url, permalink, timestamp
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}&limit=8`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();

    // Filter only VIDEO and CAROUSEL_ALBUM (which may contain videos)
    const videos = data.data
      .filter(item => item.media_type === 'VIDEO' || item.media_type === 'CAROUSEL_ALBUM')
      .slice(0, 4) // Limit to 4 videos for display
      .map(item => ({
        id: item.id,
        title: item.caption ? item.caption.split('\n')[0].substring(0, 50) : 'Watch on Instagram',
        thumbnail: item.thumbnail_url || item.media_url,
        videoUrl: item.media_url,
        permalink: item.permalink,
        timestamp: item.timestamp,
        mediaType: item.media_type
      }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate'
      },
      body: JSON.stringify({
        success: true,
        count: videos.length,
        videos: videos
      })
    };

  } catch (error) {
    console.error('Instagram API Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Failed to fetch Instagram feed',
        message: error.message
      })
    };
  }
};
