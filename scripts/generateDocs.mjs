import { processDocFiles } from '@aurodesignsystem/auro-library/scripts/build/generateDocs.mjs';

processDocFiles().catch((error) => {
  console.log(error);
});