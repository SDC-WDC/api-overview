import fs from 'fs';
import axios from 'axios';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import ProgressBar from 'progress';
import { execute } from '@getvim/execute';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = path.resolve(__dirname, 'dbexport.pgsql');

const downloadDB = async () => {
  const url = 'https://drive.google.com/uc?export=download&id=12RMZjTN89NFskXPlIf3OACSGZdEqLHA_&confirm=t';
  const writer = fs.createWriteStream(file);

  console.log('Connecting …');
  const { data, headers } = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });
  const totalLength = headers['content-length'];

  console.log('Starting download');
  const progressBar = new ProgressBar('-> downloading [:bar] :percent :etas', {
    width: 40,
    complete: '=',
    incomplete: ' ',
    renderThrottle: 1,
    total: parseInt(totalLength)
  });

  data.on('data', (chunk) => progressBar.tick(chunk.length))
  data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

(async () => {
  try {
    await downloadDB();
    console.log('Finished download!');
    // console.log('Importing database, please wait...');
    // await execute(`docker exec -i sdc-api-overview-db /bin/bash -c "psql -U ${process.env.USER} ${process.env.DB}" < ${file}`);
    // console.log('Finished import!');
    // console.log('Deleting backup file...');
    // fs.unlinkSync(file);
    // console.log('Done! The database is now ready to use.');
  } catch (err) {
    console.log('❌', err);
  }
})();
// `docker exec -i sdc-api-overview-db /bin/bash -c "psql -U docker products_db < dbexport.pgsql"`