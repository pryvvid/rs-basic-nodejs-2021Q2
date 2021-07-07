const validateToken = (token: string): true | false => {
  if (!token) return false;
  const bearerToken = token.split(' ');
  if (bearerToken[0] === 'Bearer') return true;
  return false;
};

export { validateToken };
