import { findGrupoById } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import { Items } from '@/page-components/Items';
import nc from 'next-connect';
import Head from 'next/head';

export default function UserPostPage({ post }) {
  // console.log(post)
  if (typeof post.createdAt !== 'string') {
    post.createdAt = new Date(post.createdAt);
  }
  return (
    <>
      <Head>
        <title>
          {post.creator.name} ({post.creator.username}): {post.content}
        </title>
      </Head>
      <Items post={post} link="grupos" />
    </>
  );
}

export async function getServerSideProps(context) {
  // console.log(context.res)
  await nc().use(database).run(context.req, context.res);

  const post = await findGrupoById(context.req.db, context.params.grupoId);
  // console.log(context)
  if (!post) {
    return {
      notFound: true,
    };
  }
  post._id = String(post._id);
  post.creatorId = String(post.creatorId);
  post.creator._id = String(post.creator._id);
  post.createdAt = post.createdAt.toJSON();
  return { props: { post } };
}
