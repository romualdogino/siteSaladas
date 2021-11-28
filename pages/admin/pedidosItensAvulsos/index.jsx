import { PedidosItensAvulsos } from '@/page-components/Admin/PedidosItensAvulsos';
import Head from 'next/head';

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Pedidos</title>
      </Head>
      <PedidosItensAvulsos />
    </>
  );
};

export default AdminPage;
