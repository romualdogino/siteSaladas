import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Text } from '@/components/Text';
import { Item } from '@/components/Item';
import { useItemPages } from '@/lib/item';
import Link from 'next/link';
import styles from './admin.module.css';

const ItemList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = useItemPages();
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
            href={`/adm/item/${post._id}`}
            passHref
          >
            <div className={styles.wrap}>
              <Item className={styles.post} post={post} />
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

export default ItemList;
