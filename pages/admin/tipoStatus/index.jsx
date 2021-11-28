import { TipoStatus } from '@/page-components/Admin/TipoStatus';
import Head from 'next/head';

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Tipo Status</title>
      </Head>
      <TipoStatus />
    </>
  );
};

export default AdminPage;
