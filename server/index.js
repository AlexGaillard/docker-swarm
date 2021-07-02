const express = require('express')
const { Client } = require('pg')
const app = express()
const port = 3000


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const client = new Client({
  user: 'postgres',
  password: 'mysecretpassword',
  host: 'db',
  database: 'swarm',
  port: 5432
});

async function ConnectToDb() {
  let retries = 5;
  while (retries) {
    try {
      await client.connect()
      console.log(`Succesfully connected to database`)
      break;
    } catch (err) {
      console.log('error: ', err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 10000));
    }
  }
}

ConnectToDb();

app.get('/', async (req, res) => {
  try {
    const ret = await getMsg();
    res.send(ret.rows[0].swarm_message);
  }
  catch (err) {
    console.log(err);
  }
})

const getMsg = async () => {
  let dbRes = await client.query('SELECT * FROM example;');
  return dbRes;
}