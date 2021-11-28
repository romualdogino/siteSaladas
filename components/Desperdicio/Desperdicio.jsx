import clsx from 'clsx';
import { useMemo } from 'react';
import styles from './Post.module.css';

const Desperdicios = ({ post, className }) => {
  
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
