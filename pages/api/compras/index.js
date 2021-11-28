import { ValidateProps } from '@/api-lib/constants';
import { findCompras, insertCompra } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);
handler.get(async (req, res) => {
  const posts = await findCompras(
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
      ItemID: ValidateProps.compra.ItemID,
      FornecedorID: ValidateProps.compra.FornecedorID,
      valor: ValidateProps.compra.valorCompra,
      qtd: ValidateProps.compra.qtdCompra,
      data: ValidateProps.compra.dataCompra,
      obs: ValidateProps.compra.obsCompra,
    },
    required: ['nome'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const post = await insertCompra(req.db, {
      ItemID: req.body.ItemID,
      FornecedorID: req.body.FornecedorID,
      valor: req.body.valor,
      qtd: req.body.qtd,
      data: req.body.data,
      obs: req.body.obs,
      descricao: req.body.descricao,
      creatorId: req.user._id,
      ativo: false
    });

    return res.json({ post });
  }
);

export default handler;
