const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'node_modules', '@alchemy', 'aa-core', 'dist', 'esm', 'index.js');
if (!fs.existsSync(target)) {
  console.log('patch-alchemy: target not found, skipping');
  process.exit(0);
}
let src = fs.readFileSync(target, 'utf8');
if (src.includes('SmartAccountProviderOptsSchema')) {
  console.log('patch-alchemy: alias already present');
  process.exit(0);
}
const alias = '\nexport { SmartAccountClientOptsSchema as SmartAccountProviderOptsSchema } from "./client/schema.js";\n';
fs.appendFileSync(target, alias);
console.log('patch-alchemy: appended alias to aa-core index.js');
