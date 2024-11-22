import bcrypt from 'bcryptjs';

export async function hashCredentials(username, password) {
  const saltRounds = 0;

  const usernameHash = await bcrypt.hash(username, saltRounds);
  const passwordHash = await bcrypt.hash(password, saltRounds);

  return { usernameHash, passwordHash };
}