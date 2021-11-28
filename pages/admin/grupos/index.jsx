import { Grupo } from '@/page-components/Admin/Grupos';
import Head from 'next/head';

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Grupos</title>
      </Head>
      <Grupo />
    </>
  );
};

export default AdminPage;
