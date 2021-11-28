import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from './Post.module.css';

const Desperdicios = ({ post, className }) => {
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return 'Just now';
    return `${format(diff, true)} ago`;
  }, [post.createdAt]);
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.wrap}>
        <p className={styles.content}>{post.Item}</p>
      </div>
      <div className={styles.wrap}>
        <p className={styles.content}>{post.qtd}</p>
      </div>
      <div className={styles.wrap}>
        <p className={styles.content}>{post.obs}</p>
      </div>
    </div>
  );
};

export default Desperdicios;
