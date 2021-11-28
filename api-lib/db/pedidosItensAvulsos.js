import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findPedidosItensAvulsosById(db, id) {
    const fornecedores = await db
      .collection('pedidosItensAvulsos')
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
  
  export async function findPedidosItensAvulsos(db, before, by, limit = 10) {
    return db
      .collection('pedidosItensAvulsos')
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
  
  export async function insertPedidoItensAvulsos(db, { 
      nome, ref, add, creatorId 
    }) {
    const pedidosItensAvulsos = {
      nome,
      ref,
      add,
      ativo: false,
      creatorId,
      createdAt: new Date(),
    };
    const { insertedId } = await db.collection('pedidosItensAvulsos').insertOne(pedidosItensAvulsos);
    pedidosItensAvulsos._id = insertedId;
    return pedidosItensAvulsos;
  }
  