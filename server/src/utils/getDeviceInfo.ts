import { UAParser } from 'ua-parser-js';

export function getDeviceInfo(userAgent: string) {
  const parser = new UAParser(userAgent);
  const os = parser.getOS().name || 'unknown';
  const deviceType = parser.getDevice().type || 'desktop';
  const browser = parser.getBrowser().name || 'unknown';

  return { os, deviceType, browser };
}
