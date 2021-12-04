// import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Text } from '@/components/Text';
import { Pedido } from '@/components/Pedido';
import { usePedidosAvulsoPages } from '@/lib/pedidosAvulso';
import Link from 'next/link';
import styles from './admin.module.css';
import { Button } from '@/components/Button';

const PedidoList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePedidosAvulsoPages();
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];
  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        {posts.map((post) => (

          <Link
            key={post._id}
            href={`/pedidos/${post._id}`}
            passHref
          >
            <a target="_blank">
              <div className={styles.wrap}>
                <Pedido className={styles.post} post={post} />
              </div>
            </a>
          </Link>
        ))}
        <Container justifyContent="center">
          {isReachingEnd ? (
            <Text color="secondary">No more posts are found</Text>
          ) : (
            <Button
              variant="ghost"
              type="success"
              loading={isLoadingMore}
              onClick={() => setSize(size + 1)}
            >
              mais
            </Button>
          )}
        </Container>
      </Wrapper>
    </div>
  );
};

export default PedidoList;
