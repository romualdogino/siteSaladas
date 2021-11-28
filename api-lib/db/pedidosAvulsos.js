import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findPedidoAvulsoById(db, id) {

    const pedidosAvulsos = await db
      .collection('pedidosAvulsos')
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
    if (!pedidosAvulsos[0]) return null;
    return pedidosAvulsos[0];
  }
  
  export async function findPedidosAvulsos(db, before, by, limit = 10) {
    return db
      .collection('pedidosAvulsos')
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
  
  export async function insertPedidoAvulso(db, { 
    valor,
    taxaEntrega,
    nome,
    fone,
    endereco,
    ref,
    obs,
    formaPagamento,
    folhas,
    ingredientes,
    frutas,
    proteinas,
    fibras,
    molhos,
    extras,
    ativo,
    hora,
    // creatorId,
    
    }) {
    const pedidosAvulsos = {
      valor,
      taxaEntrega,
      nome,
      fone,
      endereco,
      ref,
      obs,
      formaPagamento,
      folhas,
      ingredientes,
      frutas,
      proteinas,
      fibras,
      molhos,
      extras,
      ativo,
      hora,
      // creatorId,
      createdAt: new Date(),
    };
    const { insertedId } = await db.collection('pedidosAvulsos').insertOne(pedidosAvulsos);
    pedidosAvulsos._id = insertedId;
    return pedidosAvulsos;
  }
