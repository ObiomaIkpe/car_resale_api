import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {}

    create(reportDto : CreateReportDto){
        const report = this.reportRepository.create(reportDto);

        return this.reportRepository.save(report)
    }
}
