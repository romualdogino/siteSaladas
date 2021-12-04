import { alteraPedidoTaxa } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.patch(async (req, res) => {
  if (req.body.taxaEntrega) {
    const post = await alteraPedidoTaxa(req.db, req.query.id, {
      taxaEntrega: req.body.taxaEntrega,
      status: req.body.status,
      total: req.body.total,
    });
    return res.json({ post });
  }
});

export default handler;
