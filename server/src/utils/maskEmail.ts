export const maskEmail = (email: string): string => {
  const [name, domain] = email.split('@');
  if (!name || !domain) return email;

  const visiblePart = name.slice(0, 2);
  const maskedName = `${visiblePart}${'*'.repeat(Math.max(0, name.length - 2))}`;

  const [provider, tld] = domain.split('.');
  const maskedProvider = `${provider.slice(0, 1)}${'*'.repeat(Math.max(0, provider.length - 1))}`;

  return `${maskedName}@${maskedProvider}.${tld}`;
};
