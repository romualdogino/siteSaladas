import { Login } from '@/page-components/Auth';
import Head from 'next/head';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Entrar</title>
      </Head>
      <Login />
    </>
  );
};

export default LoginPage;
