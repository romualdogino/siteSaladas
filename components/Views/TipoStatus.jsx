import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import Link from 'next/link';
import { useCallback, useMemo, useRef, useState } from 'react';
import styles from './Post.module.css';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';
import { fetcher } from '@/lib/fetch';
import Router from 'next/router';

const TipoStatus = ({ post, className }) => {
  const nomeGrupo = useRef();
  const descricaoGrupo = useRef();
  // const { mutate } = UserPostPage();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(async e => {
    e.preventDefault();
    { console.log(post._id) }
    try {
      await fetcher(`/api/grupos?id=${post._id}`,
        {
          method: 'PATCH',
          crossDomain: true,
          xhrFields: {
            withCredentials: true,
          },
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            '_method': 'PATCH',
            'Authorization': '',
          },
          body: JSON.stringify({
            nome: nomeGrupo.current.value,
            descricao: descricaoGrupo.current.value,
          }),
        }
      )
        .then(req => {
          Router.reload(window.location.pathname);
        })
        .catch(err => console.error(err));
      toast.success('sucesso ao add um novo grupo');
      nomeGrupo.current.value = '';
      descricaoGrupo.current.value = '';
      // refresh post lists
    } catch (error) {
      toast.error(error.message);
    } finally {
      // setIsLoading(false);
      console.log("OK")
    }
  })

  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return 'Just now';
    return `${format(diff, true)} ago`;
  }, [post.createdAt]);
  return (
    <div className={clsx(styles.root, className)}>
      <Link href={`/user/${post.creator.username}`}>
        <a>
          <Container className={styles.creator}>
            <Avatar
              size={36}
              url={post.creator.profilePicture}
              username={post.creator.username}
            />
            <Container column className={styles.meta}>
              <p className={styles.name}>{post.creator.name}</p>
              <p className={styles.username}>{post.creator.username}</p>
            </Container>
          </Container>
        </a>
      </Link>
      <div className={styles.wrap}>
        <p className={styles.content}>{post.nome}</p>
        <p className={styles.content}>{post.descricao}</p>
      </div>
      <div className={styles.wrap}>
        <time dateTime={post.createdAt} className={styles.timestamp}>
          {timestampTxt} - {post.createdAt}
        </time>
      </div>
      <form onSubmit={onSubmit}>
        <Input
          label="nome"
          type="text"
          ref={nomeGrupo}
          placeholder={post.nome} />
        <Input
          label="descrição"
          type="text"
          ref={descricaoGrupo}
          placeholder={post.descricao} />
        <Button type="success" loading={isLoading}>
          Alterar
        </Button>
      </form>
    </div>
  );
};

export default TipoStatus;
