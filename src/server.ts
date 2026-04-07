import * as http from 'http';
import { getSystemInfo } from './sysinfo';

const API_PATH = '/api/v1/sysinfo';

export function createServer(): http.Server {
  return http.createServer(async (req, res) => {
    if (req.url === API_PATH && req.method === 'GET') {
      try {
        const info = await getSystemInfo();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(info));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  });
}