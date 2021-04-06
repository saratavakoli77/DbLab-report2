"use strict";
// import { Length , IsOptional, Min, IsNumber } from 'class-validator'; 
// export class PersonDto { 
//     @Length(3, 10) 
//     name: string;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PersonDto = void 0;
//     @IsNumber() 
//     @IsOptional() 
//     @Min(1960) 
//     year: number; 
// } 
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var PersonDto = /** @class */ (function () {
    function PersonDto() {
    }
    __decorate([
        class_validator_1.Length(3, 10),
        swagger_1.ApiProperty({ description: 'Enter Your Name > ', minLength: 3, "default": 'Ali', maxLength: 10 })
    ], PersonDto.prototype, "name");
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsOptional(),
        class_validator_1.Min(1960),
        swagger_1.ApiPropertyOptional({ description: 'Optional', "default": 1998, minimum: 1960 })
    ], PersonDto.prototype, "year");
    return PersonDto;
}());
exports.PersonDto = PersonDto;
