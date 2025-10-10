export const generateTrackingNumber = () => {
  const prefix = 'TRK';
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${randomPart}`;
};
