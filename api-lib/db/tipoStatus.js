import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findTipoStatusById(db, id) {
    const fornecedores = await db
      .collection('tipoStatus')
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
    if (!tipoStatus[0]) return null;
    return tipoStatus[0];
  }
  
  export async function findTipoStatus(db, before, by, limit = 10) {
    return db
      .collection('tipoStatus')
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
  
  export async function insertTipoStatus(db, { 
      nome, descricao , creatorId 
    }) {
    const tipoStatus = {
      nome,
      descricao,
      creatorId,
      createdAt: new Date(),
    };
    const { insertedId } = await db.collection('tipoStatus').insertOne(tipoStatus);
    tipoStatus._id = insertedId;
    return tipoStatus;
  }
  