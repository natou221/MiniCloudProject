import * as http from 'http';
import { createServer } from './server';

let server: http.Server;
const PORT = 9999;
const BASE_URL = `http://localhost:${PORT}`;

beforeAll((done) => {
  server = createServer();
  server.listen(PORT, done);
});

afterAll((done) => {
  server.close(done);
});

function get(path: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve({ status: res.statusCode ?? 0, body }));
    }).on('error', reject);
  });
}

describe('GET /api/v1/sysinfo', () => {
  it('retourne 200 et du JSON valide', async () => {
    const { status, body } = await get('/api/v1/sysinfo');
    expect(status).toBe(200);
    const json = JSON.parse(body);
    expect(json).toHaveProperty('cpu');
    expect(json).toHaveProperty('mem');
    expect(json).toHaveProperty('os');
  });
});

describe('Routes inconnues', () => {
  it('retourne 404 pour /', async () => {
    const { status } = await get('/');
    expect(status).toBe(404);
  });

  it('retourne 404 pour un chemin inexistant', async () => {
    const { status } = await get('/api/v2/sysinfo');
    expect(status).toBe(404);
  });
});