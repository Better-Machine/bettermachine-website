const Database = require("better-sqlite3");
const db = new Database("./data.sqlite");

const alters = [
  "ALTER TABLE projects ADD COLUMN owner_agent TEXT REFERENCES agents(username)",
  "ALTER TABLE projects ADD COLUMN parent_project_id INTEGER",
  "ALTER TABLE projects ADD COLUMN last_activity_at INTEGER",
  "ALTER TABLE projects ADD COLUMN is_public INTEGER NOT NULL DEFAULT 1",
];
for (const sql of alters) {
  try {
    db.exec(sql);
    console.log("OK:", sql);
  } catch (e) {
    console.log("skip:", sql, "—", e.message);
  }
}

db.exec(`CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  changes TEXT,
  ip TEXT,
  created_at INTEGER NOT NULL
)`);
console.log("OK: audit_log created");

db.exec("CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity, entity_id)");
db.exec("CREATE INDEX IF NOT EXISTS idx_audit_log_created ON audit_log(created_at)");
db.exec("CREATE INDEX IF NOT EXISTS idx_projects_owner ON projects(owner_agent)");
db.exec("CREATE INDEX IF NOT EXISTS idx_projects_parent ON projects(parent_project_id)");
console.log("OK: indices created");

// Verify schema
const cols = db.prepare("PRAGMA table_info(projects)").all();
console.log("\nprojects columns:");
for (const c of cols) console.log(`  ${c.name} (${c.type})`);
