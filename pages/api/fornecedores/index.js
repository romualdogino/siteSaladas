import { ValidateProps } from '@/api-lib/constants';
import { findFornecedores, insertFornecedor } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);
handler.get(async (req, res) => {
  const posts = await findFornecedores(
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
      nome: ValidateProps.fornecedor.nome,
      email: ValidateProps.fornecedor.email,
      fone: ValidateProps.fornecedor.fone,
      endereco: ValidateProps.fornecedor.endereco,
      responsavel: ValidateProps.fornecedor.responsavel,
      obs: ValidateProps.fornecedor.obs,
    },
    required: ['nome'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const post = await insertFornecedor(req.db, {
      nome: req.body.nome,
      email: req.body.email,
      fone: req.body.fone,
      endereco: req.body.endereco,
      responsavel: req.body.responsavel,
      obs: req.body.obs,
      ativo: false,
      creatorId: req.user._id,
    });

    return res.json({ post });
  }
);

export default handler;
