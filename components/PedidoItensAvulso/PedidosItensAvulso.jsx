import clsx from 'clsx';
import styles from './Post.module.css';

const PedidoItensAvulso = ({ post, className }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <p>
        <input type="checkbox" id={"check"+post.nome} />
        <small> {post.ref} </small>
        <strong> {post.nome} </strong>
        {post.add}
      </p>
    </div>
  );
};

export default PedidoItensAvulso;
