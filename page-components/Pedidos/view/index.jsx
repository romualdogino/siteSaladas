import { Spacer, Wrapper } from '@/components/Layout';
import { Pedido as PostPedido } from '@/components/Views';
import Link from 'next/link';

export const ViewPedido = ({ post, link }) => {
    console.log(post)
    console.log(link)
  return (
    <Wrapper>
      <Link href={`/${link}`}>Pedidos</Link>
      <Spacer size={2} axis="vertical" />

      <PostPedido post={post} />
    </Wrapper>
  );
};
