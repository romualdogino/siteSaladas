import clsx from 'clsx';
import { useMemo } from 'react';
import styles from './Post.module.css';

const Combo = ({ post, className }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.wrap}>
        <p className={styles.content}>{post.nome}</p>
      </div>
      <div className={styles.wrap}>
        <p className={styles.content}>{post.descricao}</p>
      </div>
    </div>
  );
};

export default Combo;
