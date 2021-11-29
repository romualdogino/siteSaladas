import clsx from 'clsx';
import { useMemo } from 'react';
import styles from './Post.module.css';
import toast from 'react-hot-toast';

const PedidoItensAvulso = ({ post, className, Key }) => {

  return (
    <div className={clsx(styles.root, className)}>
      <p>
        <input type="checkbox" id={"check"+post.nome} />
        <small> {post.ref} </small>
        <strong> {post.nome} </strong>
        {post.add}
      </p>
    </div>
  )
}

export default PedidoItensAvulso;
