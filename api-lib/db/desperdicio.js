import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findDesperdicioById(db, id) {
    const desperdicios = await db
        .collection('desperdicios')
        .aggregate([
            { $match: { _id: new ObjectId(id) } },
            { $limit: 1 },
            {
                $lookup: {
                    from: 'users',
                    localField: 'creatorId',
                    foreignField: '_id',
                    as: 'creator',
                },
            },
            { $unwind: '$creator' },
            { $project: dbProjectionUsers('creator.') },
        ])
        .toArray();
    if (!desperdicios[0]) return null;
    return desperdicios[0];
}

export async function findDesperdicios(db, before, by, limit = 10) {
    return db
        .collection('desperdicios')
        .aggregate([
            {
                $match: {
                    ...(by && { creatorId: new ObjectId(by) }),
                    ...(before && { createdAt: { $lte: before } }),
                },
            },
            { $sort: { _id: -1 } },
            { $limit: limit },
            {
                $lookup: {
                    from: 'users',
                    localField: 'creatorId',
                    foreignField: '_id',
                    as: 'creator',
                },
            },
            { $unwind: '$creator' },
            { $project: dbProjectionUsers('creator.') },
        ])
        .toArray();
}

export async function insertDesperdicio(db, { Item, qtd, Motivo, obs, creatorId}) {
    const desperdicios = {
        Item,
        qtd,
        Motivo,
        obs,
        creatorId,
        createdAt: new Date(),
    };
    const { insertedId } = await db.collection('desperdicios').insertOne(desperdicios);
    desperdicios._id = insertedId;
    return desperdicios;
}
