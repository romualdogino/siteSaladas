import { findPedidosAvulsos, insertPedidoAvulso } from '@/api-lib/db';
import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);
handler.get(async (req, res) => {
  const posts = await findPedidosAvulsos(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 100) : undefined
  );
  res.json({ posts });
});
handler.post(
  ...auths,
  async (req, res) => {
    const post = await insertPedidoAvulso(req.db, {
      valor: req.body.valor,
      taxaEntrega: req.body.taxaEntrega,
      nome: req.body.nome,
      fone: req.body.fone,
      endereco: req.body.endereco,
      ref: req.body.ref,
      obs: req.body.obs,
      formaPagamento: req.body.formaPagamento,
      folhas: req.body.folhas,
      ingredientes: req.body.ingredientes,
      frutas: req.body.frutas,
      proteinas: req.body.proteinas,
      fibras: req.body.fibras,
      molhos: req.body.molhos,
      extras: req.body.extras,
      ativo: false,
      //creatorId: req.user._id,
    });
    return res.json({ post });
  }
);

export default handler;
