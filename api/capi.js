module.exports = async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    if (!body || Object.keys(body).length === 0) {
      body = await new Promise((resolve) => {
        let data = '';
        req.on('data', chunk => { data += chunk; });
        req.on('end', () => {
          try { resolve(JSON.parse(data)); } catch (e) { resolve({}); }
        });
        req.on('error', () => resolve({}));
      });
    }
    body = body || {};

    const {
      eventName = 'PageView',
      eventId,
      eventSourceUrl,
      fbp,
      fbc,
      customData
    } = body;

    const pixelId = '1483052710597159';
    const accessToken = process.env.META_ACCESS_TOKEN || 'EAAedLpYiTYMBS0SgpRUXiLfhvIjC5C1ZCukUNdS4eu8As70XFaTZCqSrktOWlja17inLi9Ogd3LL9U1psLDpjmuMIb4CYJQFZCjwvlUdKYUUjhKuAsbTHw65YFAHCmjHLn3adGW2lcBOBzZBrY7FuqRHVWGkNCZA2TZC8gWZBqZCoYPZAcWLGhp4I3zcjEj0OKl01OQZDZD';

    // Extract IP address from request headers
    const forwarded = req.headers['x-forwarded-for'];
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : (req.headers['x-real-ip'] || req.socket?.remoteAddress || '');
    const userAgent = req.headers['user-agent'] || '';

    const userData = {
      client_ip_address: clientIp,
      client_user_agent: userAgent
    };

    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    const eventPayload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: eventSourceUrl || req.headers.referer || 'https://natalemfeltro.vercel.app/',
      user_data: userData
    };

    if (eventId) {
      eventPayload.event_id = eventId;
    }

    if (customData) {
      eventPayload.custom_data = customData;
    }

    const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [eventPayload]
      })
    });

    const result = await response.json();
    return res.status(response.status).json(result);
  } catch (err) {
    console.error('Meta CAPI Error:', err);
    return res.status(500).json({ error: err.message });
  }
};
