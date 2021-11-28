import { Itens } from '@/page-components/Admin/Itens';
import Head from 'next/head';

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Itens</title>
      </Head>
      <Itens />
    </>
  );
};

export default AdminPage;