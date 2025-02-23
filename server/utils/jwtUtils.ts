export const getJwtSecret = (): string => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET token nije postavljen u .env fajlu');
  }
  return JWT_SECRET;
};
