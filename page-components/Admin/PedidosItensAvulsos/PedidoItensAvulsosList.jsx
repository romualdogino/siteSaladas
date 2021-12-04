import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Text } from '@/components/Text';
import { PedidoItensAvulso } from '@/components/PedidoItensAvulso';
import { usePedidosItensAvulsosPages } from '@/lib/pedidosItensAvulsos';

import styles from './admin.module.css';
const alteraExistencia = (id)=>{
  // console.log("okkk")
  // console.log(id)
}

const PedidoItemAvulsoList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePedidosItensAvulsosPages();
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];
  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        {posts.map((post,index) => (

            <div className={styles.wrap}  key={index}>
              <PedidoItensAvulso className={styles.post} post={post} Key={index} />
            </div>

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
              Load more
            </Button>
          )}
        </Container>
      </Wrapper>
    </div>
  );
};

export default PedidoItemAvulsoList;
