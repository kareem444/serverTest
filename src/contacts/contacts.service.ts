import { Injectable} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactRepository } from './repositories/contact.repository';
import { Contact } from './schemas/contact.schema';
import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { String } from 'aws-sdk/clients/acm';
@Injectable()
export class ContactsService {
  constructor(private readonly contactRepository: ContactRepository) { }

  async create(createContactDto: CreateContactDto):Promise<Contact> {
    try{
      return await this.contactRepository.create(createContactDto);
  } catch (error) {
    throw new NotAcceptableException();
    }
  }

 async findAll() :Promise<Contact[]> {
  try{
    return await this.contactRepository.findAll({})
} catch (error) {
  throw new InternalServerErrorException();
  }
}
  async findOne(id: String) :Promise<Contact | null> {
    try {
      return await this.contactRepository.findOneById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // update(id: number, updateContactDto: UpdateContactDto) {
  //   return `This action updates a #${id} contact`;
  // }

  async remove(id: String) {
    try {
      await this.contactRepository.findByIdAndDelete(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

}
