ALTER TABLE users ADD COLUMN password_iterations INTEGER NOT NULL DEFAULT 100000;

CREATE TABLE IF NOT EXISTS inquiry_attempts (
  id TEXT PRIMARY KEY,
  fingerprint TEXT NOT NULL,
  attempted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inquiry_attempts_fingerprint ON inquiry_attempts(fingerprint, attempted_at);
