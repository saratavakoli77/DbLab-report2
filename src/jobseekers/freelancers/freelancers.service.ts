import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import BidEntity from 'src/db/bid.entity';
import FreelancerEntity from 'src/db/freelancer.entity';
import BidDto from '../dto/bid.dto';
import FreelancerDto from '../dto/freelancer.dto';

@Injectable()
export class FreelancersService {
    async isFreelancerExist(id: number) {
        const foundedFreelancer = await FreelancerEntity.findOne(id);
        if (!foundedFreelancer?.id) {
            throw new HttpException('Freelancer Id Not Found', HttpStatus.BAD_REQUEST);
        }
        return foundedFreelancer;
    }

    async isBidExist(id: number) {
        const foundedBid = await BidEntity.findOne(id);
        if (!foundedBid?.id) {
            throw new HttpException('Bid Id Not Found', HttpStatus.BAD_REQUEST);
        }
        return foundedBid;
    }

    async validateBidOwnerAccess(bid: BidEntity, freelancerId: number) {
        if (bid.freelancer?.id != freelancerId) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    async areIdsEqual(firstId: number, secondId: number) {
        if (firstId != secondId) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
    }

    async insertFreelancer(newFreelancer: FreelancerDto): Promise<FreelancerEntity> {
        const { bidIds, ...freelancerInfo } = newFreelancer;
        const Freelancer = new FreelancerEntity();
        Object.keys(freelancerInfo).forEach((key) => {
            Freelancer[key] = freelancerInfo[key];
        });
        Freelancer.bids = [];
        if (bidIds) {
            for (let i = 0; i < bidIds.length; i++) {
                const bid = await BidEntity.findOne(bidIds[i]);
                Freelancer.bids.push(bid);
            }
        }
        await Freelancer.save();
        return Freelancer;
    }

    async getFreelancer(id: number): Promise<FreelancerEntity> {
        const foundFreelancer = await this.isFreelancerExist(id);
        return foundFreelancer;
    }

    async deleteFreelancer(id: number): Promise<any> {
        await this.isFreelancerExist(id);
        return await FreelancerEntity.delete({ id });
    }

    async updateFreelancer(id: number, newFreelancer: FreelancerDto): Promise<any> {
        await this.isFreelancerExist(id);
        let { bidIds, ...freelancerInfo } = newFreelancer;
        return FreelancerEntity.update({ id }, freelancerInfo);
    }

    async insertBid(freelancerId: number, newBid: BidDto,): Promise<BidEntity> {
        await this.isFreelancerExist(freelancerId);
        const { ...bidInfo } = newBid;
        const Bid = new BidEntity();
        Object.keys(bidInfo).forEach((key) => {
            Bid[key] = bidInfo[key];
        });
        Bid.freelancer = await FreelancerEntity.findOne(freelancerId);
        await Bid.save();
        return Bid;
    }

    // async getBids(freelancerId: number): Promise<BidEntity[]> {
    //     await this.isFreelancerExist(freelancerId);
    //     const Freelancer: FreelancerEntity = await FreelancerEntity.findOne({
    //         where: { id: freelancerId },
    //         relations: ['bids'],
    //     });
    //     return Freelancer.bids;
    // }

    // async getBid(freelancerId: number, bidId: number): Promise<any> {
    //     await this.isFreelancerExist(freelancerId);
    //     await this.isBidExist(bidId);
    //     const Bid: BidEntity = await BidEntity.findOne({
    //         where: { id: bidId },
    //         relations: ['freelancer'],
    //     });
    //     await this.validateBidOwnerAccess(Bid, freelancerId);
    //     const { freelancer, ...bidInfo } = Bid;
    //     if (Bid.freelancer?.id == freelancerId) {
    //         return bidInfo;
    //     }
    // }

    // async deleteBid(freelancerId: number, bidId: number): Promise<any> {
    //     await this.getBid(freelancerId, bidId);
    //     return await BidEntity.delete({ id: bidId });
    // }

    // async updateBid(bidFreelancerId: number, bidId: number, newBid: BidDto): Promise<any> {
    //     await this.getBid(bidFreelancerId, bidId);
    //     const { freelancerId, ...bidInfo } = newBid;
    //     return BidEntity.update({ id: bidId }, bidInfo);
    // }

}