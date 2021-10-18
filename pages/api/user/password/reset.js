import { ValidateProps } from '@/api-lib/constants';
import {
  createToken,
  findAndDeleteTokenByIdAndType,
  findUserByEmail,
  UNSAFE_updateUserPassword,
} from '@/api-lib/db';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import normalizeEmail from 'validator/lib/normalizeEmail';

const handler = nc(ncOpts);

handler.use(database);

handler.post(
  validateBody({
    type: 'object',
    properties: {
      email: ValidateProps.user.email,
    },
    required: ['email'],
    additionalProperties: false,
  }),
  async (req, res) => {
    const email = normalizeEmail(req.body.email);
    const user = await findUserByEmail(req.db, email);
    if (!user) {
      res.status(400).json({
        error: { 
          message: 'Não foi possível encontrar esse email. Por favor, tente novamente.' 
        },
      });
      return;
    }

    const token = await createToken(req.db, {
      creatorId: user._id,
      type: 'passwordReset',
      expireAt: new Date(Date.now() + 1000 * 60 * 20),
    });

    await sendMail({
      to: email,
      from: MAIL_CONFIG.from,
      subject: 'Redefina sua senha.',
      html: `
      <div>
        <p>Olá, ${user.name}</p>
        <p>Por favor, você solicitou a redefinição da sua senha para o acesso ao site do Edisaladas</p>
        <p><a href="${process.env.WEB_URI}/forget-password/${token._id}">Click neste link Para redefinir Sua Senha</a> .</p>
         <p> E agradecemos por suas escolhas </p>
      </div>
      `,
    });

    res.status(204).end();
  }
);

handler.put(
  validateBody({
    type: 'object',
    properties: {
      password: ValidateProps.user.password,
      token: { type: 'string', minLength: 0 },
    },
    required: ['password', 'token'],
    additionalProperties: false,
  }),
  async (req, res) => {
    const deletedToken = await findAndDeleteTokenByIdAndType(
      req.db,
      req.body.token,
      'passwordReset'
    );
    if (!deletedToken) {
      res.status(403).end();
      return;
    }
    await UNSAFE_updateUserPassword(
      req.db,
      deletedToken.creatorId,
      req.body.password
    );
    res.status(204).end();
  }
);

export default handler;
