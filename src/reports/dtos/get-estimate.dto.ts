import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";
import { Transform } from "class-transformer";


export class GetEstimateDto{
    @IsString()
    make: string;
    
    @IsString()
    model: string;

    @Transform(({value}) => parseInt(value))
    @IsNumber()
    @Min(1990)
    @Max(2025)
    year: number;

    @Transform(({value}) => parseFloat(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number

    @Transform(({value}) => parseFloat(value))
    @IsLongitude()
    @IsNumber()
    lng: number;

    @IsNumber()
    @IsLatitude()
    lat: number;

}