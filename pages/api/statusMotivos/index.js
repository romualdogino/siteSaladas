import { ValidateProps } from '@/api-lib/constants';
import { findStatusMotivos, insertStatus } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);
handler.get(async (req, res) => {
  const posts = await findStatusMotivos(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );
    // console.log(posts)
  res.json({ posts });
});
handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      nome: ValidateProps.status.nome,
      descricao: ValidateProps.status.descricao,
      tipoStatus: ValidateProps.status.tipoStatus,
    },
    required: ['nome'],
    required: ['tipoStatus'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const post = await insertStatus(req.db, {
      nome: req.body.nome,
      descricao: req.body.descricao,
      tipoStatus: req.body.tipoStatus,
      creatorId: req.user._id,
    });

    return res.json({ post });
  }
);


export default handler;