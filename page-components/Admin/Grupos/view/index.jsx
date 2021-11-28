import { Spacer, Wrapper } from '@/components/Layout';
import { Grupo as PostGrupo } from '@/components/Views';
import Link from 'next/link';

export const ViewGrupo = ({ post, link }) => {
  return (
    <Wrapper>
      <Link href={`/admin/${link}`}>Grupos</Link>
      <Spacer size={2} axis="vertical" />
      <PostGrupo post={post} />
    </Wrapper>
  );
};
