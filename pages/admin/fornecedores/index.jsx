import { Fornecedores } from '@/page-components/Admin/Fornecedores';
import Head from 'next/head';

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Fornecedores</title>
      </Head>
      <Fornecedores />
    </>
  );
};

export default AdminPage;