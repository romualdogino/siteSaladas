import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';
export async function alteraGrupo(db, { nome, descricao }, id) {
  const bodyDb = {
    nome,
    descricao
  };

  console.log('bodyDb')
  console.log(bodyDb)
  const Grupos = await db
    .collection('grupos')
    .updateOne(
      { _id: ObjectId(id) },
      {
        $set: bodyDb
      }
    )
  return await Grupos
}
export async function findGrupoById(db, id) {
  const grupos = await db
    .collection('grupos')
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
  if (!grupos[0]) return null;
  return grupos[0];
}

export async function findGrupos(db, before, by, limit = 10) {
  return db
    .collection('grupos')
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

export async function insertGrupo(db, { nome, descricao, creatorId }) {
  const grupo = {
    nome,
    descricao,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('grupos').insertOne(grupo);
  grupo._id = insertedId;
  return grupo;
}

