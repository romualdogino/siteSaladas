import { ValidateProps } from '@/api-lib/constants';
import { findItem, insertItem } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);
handler.get(async (req, res) => {
  const posts = await findItem(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ posts });
});
handler.post(
  
  ...auths,
  
  validateBody({
    type: 'object',
    properties: {
      nome: ValidateProps.item.nome,
      grupoID: ValidateProps.item.GrupoID,
      pesoPorcao: ValidateProps.item.pesoPorcao,
      pesoRendimento: ValidateProps.item.pesoRendimento,
      // qtdEstoque: ValidateProps.item.qtdEstoque,
      // qtdMinimo: ValidateProps.item.qtdMinimo,
      // qtdPedido: ValidateProps.item.qtdPedido,
      // valorUnidade: ValidateProps.item.valorUnidade,
      validadeDia: ValidateProps.item.validadeDia,
      valorEnergitico: ValidateProps.item.valorEnergitico,
      carboidrato: ValidateProps.item.carboidrato,
      proteina: ValidateProps.item.proteina,
      gorduraSaturada: ValidateProps.item.gorduraSaturada,
      gorduraTotal: ValidateProps.item.gorduraTotal,
      fibraAlimentar: ValidateProps.item.fibraAlimentar,
      sodio: ValidateProps.item.sodio,
      gluten: ValidateProps.item.gluten,
      conservante: ValidateProps.item.conservante,
      lactose: ValidateProps.item.lactose,
      ovo: ValidateProps.item.ovo,
      soja: ValidateProps.item.soja,
      mar: ValidateProps.item.mar,
      amendoa: ValidateProps.item.amendoa,
      obs: ValidateProps.item.obs,
    },
    required: {['nome'],['grupoID']},
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const post = await insertItem(req.db, {
      nome: req.body.nome,
      grupoID: req.body.GrupoID,
      pesoPorcao: req.body.pesoPorcao,
      pesoRendimento: req.body.pesoRendimento,
      qtdEstoque: req.body.qtdEstoque,
      qtdMinimo: req.body.qtdMinimo,
      qtdPedido: req.body.qtdPedido,
      valorUnidade: req.body.valorUnidade,
      validadeDia: req.body.validadeDia,
      valorEnergitico: req.body.valorEnergitico,
      carboidrato: req.body.carboidrato,
      proteina: req.body.proteina,
      gorduraSaturada: req.body.gorduraSaturada,
      gorduraTotal: req.body.gorduraTotal,
      fibraAlimentar: req.body.fibraAlimentar,
      sodio: req.body.sodio,
      gluten: req.body.gluten,
      conservante: req.body.conservante,
      lactose: req.body.lactose,
      ovo: req.body.ovo,
      soja: req.body.soja,
      mar: req.body.mar,
      amendoa: req.body.amendoa,
      obs: req.body.obs,
      creatorId: req.user._id,
      ativo: false,
      comprar: true,
    });

    return res.json({ post });
  }
);

export default handler;
