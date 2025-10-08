import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeoService {
  private readonly logger = new Logger(GeoService.name);

  async getCountryByIp(ip: string): Promise<string | null> {
    try {
      const response = await axios.get(`https://ipapi.co/${ip}/json/`, {
        timeout: 4000,
      });
      return response.data.country_name || null;
    } catch (error) {
      this.logger.warn(`Failed to get country for IP ${ip}: ${error.message}`);
      return null;
    }
  }
}
