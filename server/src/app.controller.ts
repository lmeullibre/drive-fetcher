import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiQuery } from '@nestjs/swagger';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('api/excel-files')
  @ApiOperation({ summary: 'Fetch Excel files from Google Drive' })
  async fetchExcelFiles(@Query('token') token: string): Promise<any> {
    return await this.appService.listExcelFiles(token);
  }
}
