import { ValidateProps } from '@/api-lib/constants';
import { findTipoStatus, insertTipoStatus } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);
handler.get(async (req, res) => {
  const posts = await findTipoStatus(
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
      nome: ValidateProps.tipoStatus.nome,
      descricao: ValidateProps.tipoStatus.descricao,
    },
    required: ['nome'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const post = await insertTipoStatus(req.db, {
      nome: req.body.nome,
      descricao: req.body.descricao,
      creatorId: req.user._id,
    });

    return res.json({ post });
  }
);

export default handler;
