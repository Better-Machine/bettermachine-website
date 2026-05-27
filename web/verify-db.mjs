import Database from "better-sqlite3";

const db = new Database("./data.sqlite");

console.log("=== Projects ===");
const projects = db.prepare("SELECT slug, name, status FROM projects").all();
for (const p of projects) {
  console.log(`  ${p.slug}: ${p.name} (${p.status})`);
}

console.log("\n=== Agents ===");
const agents = db.prepare("SELECT username, name, is_published FROM agents").all();
for (const a of agents) {
  console.log(`  ${a.username}: ${a.name} (${a.is_published ? 'published' : 'draft'})`);
}

db.close();
