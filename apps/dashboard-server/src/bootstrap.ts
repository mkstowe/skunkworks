import WebSocket from 'ws';
// @ts-expect-error: node ws doesn't fully match DOM WebSocket
global.WebSocket = WebSocket;

import './main.js';
