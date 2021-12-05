import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function alteraPedidoTaxa(db, id, data) {
  // console.log(db)
 
  const post = await db
    .collection('pedidosAvulsos')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: 'after' }
    ).then(updatedDocument => {
      if (updatedDocument) {
        console.log(`Successfully updated document: ${updatedDocument}.`)
      } else {
        console.log("No document matches the provided query.")
      }
      return updatedDocument
    })
    .catch(err => console.error(`Failed to find and update document: ${err}`))
  // console.log(post.value)
  return post.value
}

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

  // console.log(pedidosAvulsos)
  if (!pedidosAvulsos[0]) {
    const pedidosAvulsos2 = await db.collection('pedidosAvulsos').findOne({ _id: new ObjectId(id) })
    // console.log({ 'sem': pedidosAvulsos2 })
    return {
      pedidosAvulsos2
    }
  };
  return pedidosAvulsos[0];
}

export async function findPedidosAvulsos(db, before, by, limit = 100) {
  return db
    .collection('pedidosAvulsos')
    .find()
    .sort( { createdAt: -1 } )
    .toArray()
    
  // .aggregate([
  //   {
  //     $match: {
  //       ...(by && { creatorId: new ObjectId(by) }),
  //       ...(before && { createdAt: { $lte: before } }),
  //     },
  //   },
  //   { $sort: { _id: 1 } },
  //   { $limit: limit },
  //   {
  //     $lookup: {
  //       from: 'users',
  //       localField: 'creatorId',
  //       foreignField: '_id',
  //       as: 'creator',
  //     },
  //   },
  //   { $unwind: '$creator' },
  //   { $project: dbProjectionUsers('creator.') },
  // ])
  // .toArray();
}
export async function findPedidosAvulsosUser(db, before, by, limit = 10) {
  const posts = await db
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
  if (!posts[0]) return null;
  return posts[0];
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
  creatorId,

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
    total: valor,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('pedidosAvulsos').insertOne(pedidosAvulsos);
  pedidosAvulsos._id = insertedId;
  return pedidosAvulsos;
}
