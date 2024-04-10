// pages/api/proxy.js
export default async function handler(req, res) {
    let apiUrl = 'https://schedular.fly.dev/'; // Default API URL
  
    if (req.method === 'POST') {
      // Change URL for POST requests
      apiUrl = 'https://schedular.fly.dev/data';
  
      // Proxy the POST request
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Forward any other headers your API requires
          },
          body: JSON.stringify(req.body),
        });
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    } else if (req.method === 'GET') {
      // Keep the default URL for GET requests
      apiUrl = 'https://schedular.fly.dev/run/0.93';
      // Proxy the GET request
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    } else {
      // Respond with method not allowed for other types of requests
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  