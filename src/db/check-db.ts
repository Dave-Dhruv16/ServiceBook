
import { db } from "./index";
import { users } from "./schema";
import { sql } from "drizzle-orm";

async function main() {
  try {
    console.log("⏳ Testing database connection...");
    
    // Simple query to check connection
    const result = await db.execute(sql`SELECT NOW()`);
    console.log("✅ Connection successful:", result.rows[0]);

    // Check if tables exist
    const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log("📊 Found tables:", tables.rows.map((r: any) => r.table_name));
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

main();
