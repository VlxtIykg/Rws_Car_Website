const { v4: uuidv4 } = require('uuid');
require('dotenv').config()
const compareAsc = require('date-fns').compareAsc;
const format = require('date-fns').format;
var Buffer = require('buffer').Buffer
global.window.getUuid = uuidv4();
// import { v4 as uuidv4 } from '/home/kami/node_modules/uuid/wrapper.mjs';
// import { compareAsc, format } from '/home/kami/node_modules/date-fns/index.js';
// import * as dotenv from '/home/kami/node_modules/dotenv/lib/main.js';

