import { format } from '@lukeed/ms';
import clsx from 'clsx';
import { useMemo } from 'react';
import styles from './Post.module.css';

const Pedido = ({ post, className }) => {
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return 'Just now';
    return `${format(diff, true)} atrás`;
  }, [post.createdAt]);
  return (
    <div className={clsx(post.status ? styles.root : styles.red, className)}>
      <p>
        {post.status} ---- {timestampTxt}
      </p>
      <div className={styles.wrap}>
        <p className={styles.content}>{post.nome}</p>
      </div>
      <div className={styles.wrap}>
        <p className={styles.content}>{post.endereco}</p>
      </div>
    </div>
  );
};

export default Pedido;
