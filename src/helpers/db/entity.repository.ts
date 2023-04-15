import {
    Document,
    FilterQuery,
    Model,
    QueryOptions,
    UpdateQuery,
    UpdateWriteOpResult,
} from 'mongoose';


export abstract class EntityRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) { }

    async findOne(
        entityFilterQuery: FilterQuery<T>,
        projection?: any,
        options?: QueryOptions,
    ): Promise<T | null> {
        return await this.entityModel
            .findOne(entityFilterQuery, { __v: 0, ...projection }, options)
            .exec();
    }

    async findOneById(
        _id: string,
        projection?: any,
        options?: QueryOptions,
    ): Promise<T | null> {
        return await this.entityModel
            .findOne({ _id }, { __v: 0, ...projection }, options)
            .exec();
    }

    async findAll(
        entityFilterQuery: FilterQuery<T> = {},
        projection?: any,
        options?: QueryOptions,
    ): Promise<T[]> {
        return await this.entityModel
            .find(entityFilterQuery, { __v: 0, ...projection }, options)
            .exec();
    }

    async count(
        entityFilterQuery: FilterQuery<T> = {},
        projection?: any,
        options?: QueryOptions,
    ): Promise<number> {
        return await this.entityModel
            .find(entityFilterQuery, { __v: 0, ...projection }, options)
            .count();
    }

    async create(entity: unknown): Promise<T> {
        const createdEntity = new this.entityModel(entity);
        return await createdEntity.save();
    }

    async findOneAndUpdate(
        entityFilterQuery: FilterQuery<T>,
        updatedEntity: UpdateQuery<T>,
        options?: QueryOptions,
    ): Promise<T> {
        return await this.entityModel
            .findOneAndUpdate(entityFilterQuery, updatedEntity, {
                new: true,
                ...options,
            })
            .exec();
    }

    async findByIdAndUpdate(
        entityId: string,
        updatedEntity: UpdateQuery<T>,
        options?: QueryOptions,
    ): Promise<T> {
        return await this.entityModel
            .findByIdAndUpdate(entityId, updatedEntity, { new: true, ...options })
            .exec();
    }

    async updateOne(
        entityFilterQuery: FilterQuery<T>,
        updatedEntity: UpdateQuery<T>,
        options?: QueryOptions,
    ): Promise<UpdateWriteOpResult> {
        return await this.entityModel
            .updateOne(entityFilterQuery, updatedEntity, { ...options })
            .exec();
    }

    async findOneAndDelete(
        entityFilterQuery: FilterQuery<T>,
        options?: QueryOptions,
    ): Promise<T> {
        return await this.entityModel.findOneAndDelete(entityFilterQuery, options).exec();
    }

    async findByIdAndDelete(entityId: string, options?: QueryOptions): Promise<T> {
        return await this.entityModel.findByIdAndDelete(entityId, { ...options }).exec();
    }

    async deleteOne(
        entityFilterQuery: FilterQuery<T>,
        options?: QueryOptions,
    ): Promise<boolean> {
        const deleteResult = await this.entityModel.deleteOne(entityFilterQuery, {
            ...options,
        });
        return deleteResult.deletedCount >= 1;
    }
}
