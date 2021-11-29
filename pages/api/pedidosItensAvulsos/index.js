import { findPedidosItensAvulsos,insertPedidoItensAvulsos } from '@/api-lib/db';
import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);
handler.get(async (req, res) => {
  const posts = await findPedidosItensAvulsos(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );
  res.json({ posts });
});

handler.post(
  
  ...auths,
  
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }
    const post = await insertPedidoItensAvulsos(
      req.db, {
        nome: req.body.nome,
        ref: req.body.ref,
        add: req.body.add,
        creatorId: req.user._id,
      });
    return res.json({ post });
  }
);

export default handler;
