import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Contact, ContactDocument } from '../schemas/contact.schema';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/helpers/db/entity.repository';


@Injectable()
export class ContactRepository extends EntityRepository<ContactDocument> {
    constructor(
        @InjectModel(Contact.name)
        contactModel: Model<ContactDocument>
    ) {
        super(contactModel);
    }
}
