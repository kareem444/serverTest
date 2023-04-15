import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/helpers/db/entity.repository';


@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
    constructor(
        @InjectModel(User.name)
        userModel: Model<UserDocument>
    ) {
        super(userModel);
    }
}
