import { PedidosAvulsos } from '@/page-components/Admin/PedidosAvulsos';
import Head from 'next/head';

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Pedidos Avulsos</title>
      </Head>
      <PedidosAvulsos />
    </>
  );
};

export default AdminPage;