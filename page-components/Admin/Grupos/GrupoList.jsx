import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Text } from '@/components/Text';
import { Grupo } from '@/components/Grupo';
import { useGrupoPages } from '@/lib/grupo';
import Link from 'next/link';
import styles from './grupoList.module.css';

const GrupoList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = useGrupoPages();
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
            href={`/admin/grupos/${post._id}`}
            passHref
          >
            <div className={styles.wrap}>
              <Grupo className={styles.post} post={post} />
            </div>
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
              Load more
            </Button>
          )}
        </Container>
      </Wrapper>
    </div>
  );
};

export default GrupoList;
