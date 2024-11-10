'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const pg = require('pg');
const config = require('./config.js');

const DB_DATA_SCRIPT = path.join(process.cwd(), './db/data.sql');

const execute = async (client, sql) => {
  try {
    await client.query(sql);
  } catch (err) {
    console.error(err);
  }
};

const notEmpty = (s) => s.trim() !== '';

const executeFile = async (client) => {
  const sql = await fsp.readFile(DB_DATA_SCRIPT, 'utf8');
  const commands = sql.split(';\n').filter(notEmpty);
  for (const command of commands) {
    await execute(client, command);
  }
};

(async () => {
  console.log('Setting up environment');
  const db = new pg.Client(config.db);
  await db.connect();
  await executeFile(db);
  await db.end();
  console.log('Environment is ready');
})().catch((err) => {
  console.error(err);
});
