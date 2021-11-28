
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { useCurrentUser } from '@/lib/user';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import TipoStatusAdd from './TipoStatus.jsx';
import TipoStatusList from './TipoStatusList';
import styles from './admin.module.css';
export const TipoStatus = () => {
  const { data, error, mutate } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (!data && !error) return;
    if (!data.user || data.user.admin == false) {
      router.replace('/login');
    }
  }, [router, data, error]);
  return (
    <Wrapper className={styles.wrapper}>
      <Spacer size={2} axis="vertical" />
      {data?.user ? (
        <>
        <Link href="/admin">Admin</Link>
          <TipoStatusAdd />
          <TipoStatusList />
        </>
      ) : null}
    </Wrapper>
  );
};