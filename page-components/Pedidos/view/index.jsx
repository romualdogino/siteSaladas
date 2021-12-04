import { Spacer, Wrapper } from '@/components/Layout';
import { Pedido as PostPedido } from '@/components/Views';
import Link from 'next/link';
import styles from './../admin.module.css';
import Commenter from './Commenter';
import CommentList from './CommentList';
import { Text, TextLink } from '@/components/Text';

export const ViewPedido = ({ post, link }) => {
  if (post.creator) {
    return (
      <Wrapper>
        <Link href={`/${link}`}>Pedidos</Link>
        <Spacer size={2} axis="vertical" />
        <PostPedido post={post} />
        <h3 className={styles.subtitle}>Comments</h3>
        <Commenter post={post} />
        <CommentList post={post} />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Link href={`/${link}`}>Pedidos</Link>
        <Spacer size={2} axis="vertical" />
        <PostPedido post={post} />
        <Text color="secondary">
          Para realizar mesagens {' '}
          <Link href="/sign-up" passHref>
            <TextLink color="link" variant="highlight">
              fazer o cadastro
            </TextLink>
          </Link>{' '}
        </Text>
      </Wrapper>
    );
  }
};
