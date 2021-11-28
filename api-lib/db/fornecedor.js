import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findFornecedorById(db, id) {
    const fornecedores = await db
      .collection('fornecedores')
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
    if (!fornecedores[0]) return null;
    return fornecedores[0];
  }
  
  export async function findFornecedores(db, before, by, limit = 10) {
    return db
      .collection('fornecedores')
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
  
  export async function insertFornecedor(db, { 
      nome, email, fone, endereco, responsavel, obs, creatorId 
    }) {
    const fornecedor = {
      nome,
      email,
      fone,
      endereco,
      responsavel,
      obs,
      creatorId,
      createdAt: new Date(),
    };
    const { insertedId } = await db.collection('fornecedores').insertOne(fornecedor);
    fornecedor._id = insertedId;
    return fornecedor;
  }
  