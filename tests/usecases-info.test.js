
import { usecases } from '@/constants';
const url = usecases.INFO_FILE_URL;
import https from 'https';
import { createCheckers } from "ts-interface-checker";
import { spawnSync } from 'child_process';

const ucInfoTypePath = 'src/types/usecases.ts';

let usecasesInfo = {};



function fetchUsecases() {
  return new Promise(resolve => {
    https.get(url, (res) => {
      let body = "";
  
      res.on("data", (chunk) => {
        body += chunk;
      });
  
      res.on("end", () => {
        try {
          const json = JSON.parse(body);
          resolve(json);
        } catch (error) {
          console.error(error.message);
        };
      });
    }).on("error", (error) => {
      console.error(error.message);
    });
  });
}

test('usecases is available', async () => {
  usecasesInfo = await fetchUsecases();
  expect(usecasesInfo.length).toBeGreaterThan(0);
});



function generateValidators() {
  spawnSync( 'npx', [ 'ts-interface-builder', ucInfoTypePath ]);
}

function validateUsecasesInfo() {
  const validatorFile = `${ucInfoTypePath.replace('usecases', 'usecases-ti')}`;
  const validatorPath = `${process.cwd()}/${validatorFile}`;
  const UsecasesInfoTI  = require(validatorPath);
  const { UsecaseFileInterface } = createCheckers(UsecasesInfoTI.default);

  const someError = usecasesInfo.some(uc => {
    try {
      UsecaseFileInterface.check(uc);
    } catch(e) {
      console.error('Checking', uc.id);
      console.error(e.message);
      return true;
    }
  });
  return someError;
}

test('usecases has the right format', () => {
  generateValidators();
  const hasError = validateUsecasesInfo();
  expect(hasError).toBe(false);
});
