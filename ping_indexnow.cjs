const fs = require('fs');
const https = require('https');

const KEY = 'e8a5b2c7f41049cbb928d3a1f8602b9e';
const HOST = 'www.fludio.in';

// Read sitemap to get full URL list
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);

console.log(`Found ${urls.length} URLs in sitemap.xml to submit to IndexNow.`);

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: urls
});

function submitToIndexNow(endpointHost, endpointPath) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: endpointHost,
      port: 443,
      path: endpointPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`[${endpointHost}] Response Status: ${res.statusCode} ${res.statusMessage}`);
        if (data) console.log(`[${endpointHost}] Body: ${data}`);
        resolve({ host: endpointHost, status: res.statusCode });
      });
    });

    req.on('error', err => {
      console.error(`[${endpointHost}] Error: ${err.message}`);
      resolve({ host: endpointHost, error: err.message });
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log('Pinging IndexNow endpoints for instant crawler discovery...');
  await submitToIndexNow('api.indexnow.org', '/IndexNow');
  await submitToIndexNow('www.bing.com', '/indexnow');
  console.log('Submission complete. IndexNow distributes submitted URLs to Microsoft Bing, Yandex, Seznam, and Naver.');
}

main();
