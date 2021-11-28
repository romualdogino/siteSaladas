import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findItemById(db, id) {
    const item = await db
      .collection('item')
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
    if (!item[0]) return null;
    return item[0];
  }
  
  export async function findItem(db, before, by, limit = 10) {
    return db
      .collection('item')
      // .sort( { nome } )
      .aggregate([
        {
          $match: {
            ...(by && { creatorId: new ObjectId(by) }),
            ...(before && { createdAt: { $lte: before } }),
          },
        },
        { $sort: { nome: 1 } },
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
  
  export async function insertItem(db, { 
      nome, 
      GrupoID,
      pesoPorcao,
      pesoRendimento,
      qtdEstoque,
      qtdMinimo,
      qtdPedido,
      valorUnidade,
      validadeDia,
      valorEnergitico,
      carboidrato,
      proteina,
      gorduraSaturada,
      gorduraTotal,
      fibraAlimentar,
      sodio,
      
      gluten,
      conservante,
      lactose,
      ovo,
      soja,
      mar,
      amendoa,
      obs,
      creatorId,
    }) {
    const item = {
      nome,
      GrupoID: new ObjectId(GrupoID),
      pesoPorcao,
      pesoRendimento,
      qtdEstoque: 0,
      qtdMinimo: 0,
      qtdPedido: 0,
      valorUnidade: 0,
      validadeDia,

      valorEnergitico,
      carboidrato,
      proteina,
      gorduraSaturada,
      gorduraTotal,
      fibraAlimentar,
      sodio,
      
      gluten,
      conservante,
      lactose,
      ovo,
      soja,
      mar,
      amendoa,
      obs,
      creatorId,
      createdAt: new Date(),
    };
    const { insertedId } = await db.collection('item').insertOne(item);
    item._id = insertedId;
    return item;
  }
  