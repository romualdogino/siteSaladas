import { Pedidos } from '@/page-components/Admin/Pedidos';
import Head from 'next/head';

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Pedidos</title>
      </Head>
      <Pedidos />
    </>
  );
};

export default AdminPage;