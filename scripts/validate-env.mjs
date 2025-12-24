import fs from "fs";
import path from "path";

const required = [
  "ALCHEMY_API_URL",
  "ALCHEMY_WALLET_API_KEY",
  "ALCHEMY_WALLET_APP_ID",
  "ALCHEMY_BUNDLER_API_KEY",
  "ALCHEMY_GAS_MANAGER_POLICY_ID",
  "ALCHEMY_DATA_API_KEY",
  "MARZ_JWT_SECRET",
  "MARZ_ENCRYPTION_KEY",
  "MARZ_SESSION_KEY_SECRET"
];

const envPath = path.resolve(process.cwd(), ".env.local");
if (!fs.existsSync(envPath)) {
  console.error("❌ .env.local is missing");
  process.exit(1);
}

const env = fs.readFileSync(envPath, "utf8");
const missing = required.filter((key) => !env.includes(key));

if (missing.length > 0) {
  console.error("❌ Missing required environment variables:");
  missing.forEach((k) => console.error(" - " + k));
  process.exit(1);
}

console.log("✅ All required environment variables are present.");
