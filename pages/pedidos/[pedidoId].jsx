import { findPedidoAvulsoById } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import { ViewPedido } from '@/page-components/Pedidos/view';
import nc from 'next-connect';
import Head from 'next/head';
import { useMemo } from 'react';
import { format } from '@lukeed/ms';

export default function UserPostPage({ post }) {
  if (typeof post.createdAt !== 'string') {
    post.createdAt = new Date(post.createdAt);
  }
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return 'agora';
    return `${format(diff, true)} atrás`;
  }, [post.createdAt]);

  return (
    <>
      <Head>
        <title>
          {post.nome} pedido:({timestampTxt}): {post.content}
        </title>
      </Head>
      <ViewPedido post={post} link="pedidos" />
    </>
  );
}

export async function getServerSideProps(context) {
  await nc().use(database).run(context.req, context.res);
  const post = await findPedidoAvulsoById(
    context.req.db,
    context.params.pedidoId
  )
    .then((post) => {
      if (post.pedidosAvulsos2) {
        return (post = post.pedidosAvulsos2);
      } else {
        return post;
      }
    })
    .catch((err) => console.log(err));
  if (!post) {
    return {
      notFound: true,
    };
  }
  post._id = String(post._id);
  post.creatorId ? (post.creatorId = String(post.creatorId)) : '';
  if (post.creator) {
    post.creator._id = String(post.creator._id);
  }
  post.createdAt = post.createdAt.toJSON();

  return { props: { post } };
}
