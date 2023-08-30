import { Injectable } from '@nestjs/common';
import { google, drive_v3 } from 'googleapis';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async listExcelFiles(token: string): Promise<any> {
    try {
      console.log("Received token:", token);
      
      if (!token) {
        return 'Token is missing';
      }

      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: token });

      const drive = google.drive({ version: 'v3', auth });
      
      const response = await drive.files.list({
        q: `(mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' or mimeType='application/vnd.ms-excel')`,
        fields: 'files(id, name)'
      });
      console.log("Fetched files:", response.data.files);
      
      return response.data.files || [];
    } catch (error) {
      console.error('An error occurred:', error);
      return 'An error occurred while fetching Excel files';
    }
  }
}