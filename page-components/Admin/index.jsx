
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { useCurrentUser } from '@/lib/user';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './admin.module.css';
import Link from 'next/link';
import { Text, TextLink } from '@/components/Text';

export const Admin = () => {
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
          <p>
            <Link href="admin/grupos"  >
            <TextLink color="link" variant="highlight">
              Grupos
            </TextLink>
          </Link>
          </p>
          <p>
            <Link href="admin/fornecedores"  >
            <TextLink color="link" variant="highlight">
              Fornecedores
            </TextLink>
          </Link>
          </p>
          <p>
            <Link href="admin/tipoStatus"  >
            <TextLink color="link" variant="highlight">
              TipoStatus
            </TextLink>
          </Link>
          </p>
          <p>
            <Link href="admin/status"  >
            <TextLink color="link" variant="highlight">
              Status
            </TextLink>
          </Link>
          </p>
          
          <hr />
          <p>
            <Link href="admin/itens"  >
            <TextLink color="link" variant="highlight">
              Itens
            </TextLink>
          </Link>
          </p>
          <p>
            <Link href="admin/compras"  >
            <TextLink color="link" variant="highlight">
              Compras
            </TextLink>
          </Link>
          </p>
         
          <p>
            <Link href="admin/desperdicios"  >
            <TextLink color="link" variant="highlight">
              Desperdicios
            </TextLink>
          </Link>
          </p>
         
         
          <p>
            <Link href="admin/produtos"  >
            <TextLink color="link" variant="highlight">
              Produtos
            </TextLink>
          </Link>
          </p>
          <p>
            <Link href="admin/combos"  >
            <TextLink color="link" variant="highlight">
              Combos
            </TextLink>
          </Link>
          </p>
          <p>
            <Link href="admin/pedidos"  >
            <TextLink color="link" variant="highlight">
              Pedidos
            </TextLink>
          </Link>
          </p>
          <hr />
          <p>
          <Link href="admin/pedidosItensAvulsos"  >
            <TextLink color="link" variant="highlight">
              Pedidos Itens Avulsos
            </TextLink>
          </Link>
          </p>
          <p>
          <Link href="admin/pedidosAvulsos"  >
            <TextLink color="link" variant="highlight">
              Pedidos Avulsos
            </TextLink>
          </Link>
          </p>
          <hr />
          
        </>
      ) : null}
    </Wrapper>
  );
};