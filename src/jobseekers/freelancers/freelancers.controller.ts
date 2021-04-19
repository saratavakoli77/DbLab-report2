import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import FreelancerDto from '../dto/freelancer.dto';
import BidDto from '../dto/bid.dto';
import { FreelancersService } from './freelancers.service';

@Controller('freelancers')
export class FreelancersController {
    constructor(private readonly freelancersService: FreelancersService) { }
    @Post()
    insertFreelancer(@Body() freelancer: FreelancerDto) {
        return this.freelancersService.insertFreelancer(freelancer);
    }

    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: 'Freelancer Id Not Found' })
    @Get(':id')
    getFreelancer(@Param('id') id: number) {
        return this.freelancersService.getFreelancer(id);
    }

    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: 'Freelancer Id Not Found' })
    @Delete(':id')
    deleteFreelancer(@Param('id') id: number) {
        return this.freelancersService.deleteFreelancer(id);
    }

    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: 'Freelancer Id Not Found' })
    @Put(':id')
    updateFreelancer(@Param('id') id: number, @Body() freelancer: FreelancerDto) {
        return this.freelancersService.updateFreelancer(id, freelancer);
    }

    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @Post(':id/projects/:pid/bids')
    insertBid(@Param('id') id: number, @Param('pid') pid: number, @Body() bid: BidDto) {
        this.freelancersService.areIdsEqual(id, bid.freelancerId);
        return this.freelancersService.insertBid(id, bid);
    }
}
