import { sql } from 'drizzle-orm';
import type { MigrationConfig } from 'drizzle-orm/migrator';
const migrations={journal:{version:'7',dialect:'sqlite',entries:[{idx:0,version:'6',when:1761500000000,tag:'0000_initial',breakpoints:true}]},migrations:{m0000:`CREATE TABLE \`products\` (
 \`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
 \`client_id\` text NOT NULL,
 \`owner_id\` text NOT NULL,
 \`name\` text NOT NULL,
 \`quantity\` integer NOT NULL,
 \`price\` integer NOT NULL,
 \`updated_at\` integer NOT NULL,
 \`synced_at\` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX \`products_client_id_unique\` ON \`products\` (\`client_id\`);`}};
export default migrations;
