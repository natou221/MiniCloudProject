import { createServer } from './server';

const PORT = 8000;

const server = createServer();
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Sysinfo:        http://localhost:${PORT}/api/v1/sysinfo`);
});