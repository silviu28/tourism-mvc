process.env.TEST = "1";
import { execSync } from "child_process";
import dotenv from "dotenv";
import { resetTestDatabase } from "../controllers/tests";

dotenv.config({ quiet: true });

const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.PASSWORD ? `-p"${process.env.PASSWORD}"` : "";
const host = process.env.HOST ? `-h "${process.env.HOST}"` : "";
const prodDb = process.env.DB_NAME || "tourism";
const testDb = process.env.DB_NAME_TEST || `${prodDb}_test`;

console.log(`Setting up test database '${testDb}'...`);

async function setup() {
  try {
    execSync(`mariadb -u ${dbUser} ${dbPassword} ${host} -e "CREATE DATABASE IF NOT EXISTS ${testDb};"`);

    await resetTestDatabase();

    console.log(`Successfully setup test database '${testDb}' with initial admin account!`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to setup test database:", error);
    process.exit(1);
  }
}

setup();
