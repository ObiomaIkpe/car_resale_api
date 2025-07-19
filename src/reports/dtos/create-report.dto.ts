import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";


export class CreateReportDto{
    @IsString()
    make: string;
    
    @IsString()
    model: string;

    @IsNumber()
    @Min(1990)
    @Max(2025)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number

    @IsLongitude()
    @IsNumber()
    lng: number;

    @IsNumber()
    @IsLatitude()
    lat: number;

    @IsNumber()
    price: number
}