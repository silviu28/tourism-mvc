import express from "express";
import sequelize from "../sequelizeConfig";
import { User } from "../models/User";
import { Admin } from "../models/Admin";
const bcrypt = require("bcrypt");

const router = express.Router();

let resetPromise: Promise<any> | null = null;

export async function resetTestDatabase() {
  if (resetPromise) {
    return resetPromise;
  }

  resetPromise = (async () => {
    try {
      // Disable foreign key checks to safely truncate all tables
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

      const [tables]: any[] = await sequelize.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = DATABASE();"
      );

      for (const tableObj of tables) {
        const tableName = tableObj.TABLE_NAME || tableObj.table_name;
        await sequelize.query(`TRUNCATE TABLE \`${tableName}\`;`);
      }

      await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");

      const passwordHash = await bcrypt.hash("admin123", 10);

      const user = await User.create({
        username: "admin",
        passwordHash,
        email: "admin@example.com",
        birthdate: "2000-01-01",
        notify: false,
      });

      await Admin.create({
        userId: user.id,
      });

      return user;
    } finally {
      resetPromise = null;
    }
  })();

  return resetPromise;
}

router.post("/api/test/reset", async (_req, res) => {
  try {
    const adminUser = await resetTestDatabase();
    return res.status(200).json({
      message: "Database reset successfully",
      admin: {
        id: adminUser.id,
        username: adminUser.username,
      },
    });
  } catch (err) {
    console.error("Failed to reset test database:", err);
    return res.status(500).json({ error: "Failed to reset database" });
  }
});

(router as any).resetTestDatabase = resetTestDatabase;
module.exports = router;
