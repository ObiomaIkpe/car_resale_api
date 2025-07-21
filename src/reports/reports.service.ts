import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {}

    create(reportDto: CreateReportDto, user: User){
        const report = this.reportRepository.create(reportDto);
        report.user = user;
        return this.reportRepository.save(report)
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.reportRepository.findOne({where: {id: parseInt(id) } });
        if(!report){
            throw new NotFoundException('report not found');
        }
        report.approved = approved
        return this.reportRepository.save(report)
    }

    createEstimate({make, model, lng, lat, year, mileage}: GetEstimateDto) {
        return this.reportRepository
        .createQueryBuilder()
        .select('AVG(price', 'price')
        .where("make = :make", {make}).
        andWhere('lng - :lng between -5 and 5', {lng})
        .andWhere('lat - :lat between -5 and 5', {lat})
        .andWhere('year - :year between -3 and 3', {year})
        .andWhere('approved IS TRUE')
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({mileage})
        .limit(3)
        .getRawMany()
    }
}
