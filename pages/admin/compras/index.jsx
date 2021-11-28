import { Compras } from '@/page-components/Admin/Compras';
import Head from 'next/head';

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Compras</title>
      </Head>
      <Compras />
    </>
  );
};

export default AdminPage;
