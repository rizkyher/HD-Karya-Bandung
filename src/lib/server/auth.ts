const encoder = new TextEncoder();
const PBKDF2_ITERATIONS = 600_000;
const LEGACY_PBKDF2_ITERATIONS = 100_000;

export type Role = 'SUPER_ADMIN' | 'EDITOR';
export type AdminUser = { id: string; name: string; email: string; role: Role; status: 'ACTIVE' | 'DISABLED' };

function base64(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(value: string) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

export async function sha256(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return base64(new Uint8Array(digest));
}

export async function passwordHash(password: string, salt = crypto.getRandomValues(new Uint8Array(16)), iterations = PBKDF2_ITERATIONS) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
  return { hash: base64(new Uint8Array(bits)), salt: base64(salt) };
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array) {
  let difference = left.length ^ right.length;
  for (let index = 0; index < Math.max(left.length, right.length); index += 1) difference |= (left[index] ?? 0) ^ (right[index] ?? 0);
  return difference === 0;
}

export async function verifyPassword(password: string, hash: string, salt: string, iterations = LEGACY_PBKDF2_ITERATIONS) {
  const candidate = await passwordHash(password, fromBase64(salt), iterations);
  return constantTimeEqual(encoder.encode(candidate.hash), encoder.encode(hash));
}

export async function currentUser(env: Env, token: string | undefined): Promise<AdminUser | null> {
  if (!token) return null;
  return env.DB.prepare("SELECT u.id, u.name, u.email, u.role, u.status FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > CURRENT_TIMESTAMP AND u.status = 'ACTIVE'")
    .bind(await sha256(token))
    .first<AdminUser>();
}

export async function authenticate(env: Env, email: string, password: string, fingerprint: string) {
  await env.DB.prepare("DELETE FROM login_attempts WHERE attempted_at < datetime('now', '-1 day')").run();
  const attempts = await env.DB.prepare("SELECT COUNT(*) AS total FROM login_attempts WHERE fingerprint = ? AND attempted_at > datetime('now', '-15 minutes')")
    .bind(await sha256(fingerprint))
    .first<{ total: number }>();
  if (Number(attempts?.total ?? 0) >= 10) return { status: 'RATE_LIMITED' as const };

  const user = await env.DB.prepare("SELECT * FROM users WHERE email = ? AND status = 'ACTIVE'")
    .bind(email.toLowerCase())
    .first<AdminUser & { password_hash: string; password_salt: string; password_iterations?: number }>();
  const iterations = Number(user?.password_iterations ?? LEGACY_PBKDF2_ITERATIONS);
  if (!user || !(await verifyPassword(password, user.password_hash, user.password_salt, iterations))) {
    await env.DB.prepare('INSERT INTO login_attempts (id, fingerprint) VALUES (?, ?)').bind(crypto.randomUUID(), await sha256(fingerprint)).run();
    return { status: 'INVALID' as const };
  }
  if (iterations < PBKDF2_ITERATIONS) {
    const credentials = await passwordHash(password);
    await env.DB.prepare('UPDATE users SET password_hash = ?, password_salt = ?, password_iterations = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(credentials.hash, credentials.salt, PBKDF2_ITERATIONS, user.id)
      .run();
  }
  return { status: 'OK' as const, user };
}

export async function createSession(env: Env, userId: string) {
  const token = `${crypto.randomUUID()}${crypto.randomUUID()}`;
  await env.DB.prepare("INSERT INTO sessions (id, user_id, token_hash, expires_at) VALUES (?, ?, ?, datetime('now', '+8 hours'))")
    .bind(crypto.randomUUID(), userId, await sha256(token))
    .run();
  await env.DB.prepare('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?').bind(userId).run();
  return token;
}

export async function audit(env: Env, actorId: string | null, action: string, entity: string, entityId: string | null, summary: string) {
  await env.DB.prepare('INSERT INTO audit_logs (id, actor_id, action, entity, entity_id, summary) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(crypto.randomUUID(), actorId, action, entity, entityId, summary.slice(0, 500))
    .run();
}
