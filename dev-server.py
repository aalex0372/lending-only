#!/usr/bin/env python3
"""
Local dev server for dropzona-landing.
- Serves static files from the project root.
- On 404, returns the brand 404.html (matching Vercel production behavior).
Run: python3 dev-server.py [port]
"""
import http.server
import socketserver
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get('PORT', 3000))
ROOT = os.path.dirname(os.path.abspath(__file__))


class DropzonaHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            path = os.path.join(ROOT, '404.html')
            try:
                with open(path, 'rb') as f:
                    body = f.read()
                self.send_response(404)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.send_header('Content-Length', str(len(body)))
                self.send_header('Cache-Control', 'no-store')
                self.end_headers()
                if self.command != 'HEAD':
                    self.wfile.write(body)
                return
            except OSError:
                pass
        super().send_error(code, message, explain)


if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('', PORT), DropzonaHandler) as httpd:
        print(f"Serving http://localhost:{PORT}  (404 → 404.html)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
