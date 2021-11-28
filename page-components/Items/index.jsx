import { Spacer, Wrapper } from '@/components/Layout';
import { Post as PostItem } from '@/components/Views';
import Link from 'next/link';

export const Items = ({ post, link }) => {
  return (
    <Wrapper>
      <Link href={`/admin/${link}`}>Grupos</Link>
      <Spacer size={2} axis="vertical" />
      <PostItem post={post} />
    </Wrapper>
  );
};
