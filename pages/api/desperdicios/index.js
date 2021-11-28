import { ValidateProps } from '@/api-lib/constants';
import { findDesperdicios, insertDesperdicio } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);
handler.get(async (req, res) => {
  const posts = await findDesperdicios(
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
      Item: ValidateProps.desperdicio.Item,
      qtd: ValidateProps.desperdicio.qtd,
      Motivo: ValidateProps.desperdicio.Motivo,
      obs: ValidateProps.desperdicio.obs,
    },
    required: [ 'qtd', 'Item', 'Motivo' ],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const post = await insertDesperdicio(req.db, {
      Item: req.body.Item,
      qtd: req.body.qtd,
      Motivo: req.body.Motivo,
      obs: req.body.obs,
      creatorId: req.user._id,
      ativo: false,
    });
    
    return res.json({ post });
  }
);

export default handler;
