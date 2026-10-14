import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
};
http
  .createServer(async (request, response) => {
    try {
      let pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
      if (pathname.startsWith('/Estudo-para-Concurso/'))
        pathname = pathname.slice('/Estudo-para-Concurso'.length);
      if (pathname === '/') pathname = '/index.html';
      const file = resolve(dist, '.' + pathname);
      if (!file.startsWith(dist + '/')) {
        response.writeHead(403).end();
        return;
      }
      const body = await readFile(file);
      response.setHeader('Content-Type', mime[extname(file)] ?? 'application/octet-stream');
      response.end(body);
    } catch {
      response.writeHead(404).end();
    }
  })
  .listen(4173, '127.0.0.1');
