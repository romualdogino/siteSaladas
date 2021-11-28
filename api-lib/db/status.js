import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';
const IDMOTIVOS = '61917e68ea7f9be72c78bbab'

export async function findTipoStatusById(db, id) {
    const statuss = await db
      .collection('status')
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
    if (!statuss[0]) return null;
    return statuss[0];
  }
  export async function findStatusMotivos(db, before, by, limit = 10) {
    return db
      .collection('status')
      .find( { tipoStatus: ObjectId(IDMOTIVOS) })
      .toArray();
  }
  export async function findStatus(db, before, by, limit = 10) {
    return db
      .collection('status')
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
  
  export async function insertStatus(db, { 
      nome, descricao, tipoStatus, creatorId 
    }) {
    const Status = {
      nome,
      descricao,
      tipoStatus: new ObjectId(tipoStatus),
      creatorId,
      createdAt: new Date(),
    };
    const { insertedId } = await db.collection('status').insertOne(Status);
    Status._id = insertedId;
    return Status;
  }

  