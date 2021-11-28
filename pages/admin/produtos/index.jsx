import { Produtos } from '@/page-components/Admin/Produtos';
import Head from 'next/head';

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <Produtos />
    </>
  );
};

export default AdminPage;
