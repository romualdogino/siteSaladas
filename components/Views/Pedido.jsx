import { format } from '@lukeed/ms';
import clsx from 'clsx';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import Input from '../Input/Input';
import styles from './Post.module.css';
import Link from 'next/link';
import { Container } from '../Layout';
import { Avatar } from '../Avatar';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useCurrentUser } from '@/lib/user';
import { useReactToPrint } from 'react-to-print';

const Pedido = ({ post, className }) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const router = useRouter();
  const taxaEntregaInput = useRef();
  const { data: { admin } = {} } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmitTaxa = useCallback(async (e) => {
    e.preventDefault();
    // console.log(taxaEntregaInput.current.value)
    try {
      await fetcher(`/api/pedidos?id=${post._id}`, {
        method: 'PATCH',
        crossDomain: true,
        xhrFields: {
          withCredentials: true,
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          _method: 'PATCH',
          Authorization: '',
        },
        body: JSON.stringify({
          taxaEntrega: taxaEntregaInput.current.value,
          status: 'Aprovado',
          total:
            parseFloat(taxaEntregaInput.current.value) + parseFloat(post.valor),
        }),
      }).then((res) => {
        const post = res.post;
        router.reload(window.location.pathname);
        return { post };
      });
      // satatus aprovado _primeiro apos definição do frete
      toast.success('Pedido Aceito');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  });
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return 'Just now';
    return `${format(diff, true)} atrás`;
  }, [post.createdAt]);
  return (
    <div className={clsx(styles.root, className)}>
      {post.creator ? (
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
      ) : (
        ''
      )}
      <hr />
      {admin ? (
        <>
          <strong> R$ {parseFloat(post.taxaEntrega).toFixed(2)}</strong>
          <form id="taxa" onSubmit={onSubmitTaxa}>
            <Input
              ref={taxaEntregaInput}
              placeholder={post.taxaEntrega}
              label="Taxa de Entrega __ INSERIR COM (.) .ex: 2.50 "
            />
            <Button type="success" loading={isLoading}>
              Inserir Taxa de Entrega
            </Button>
          </form>
        </>
      ) : (
        ''
      )}
      <hr />
      <div className={styles.wrap} ref={componentRef}>
        <center>{post.createdAt}</center>
        <p className={styles.content}>
          <small>cliente: </small>
          <strong>{post.nome}</strong>
        </p>
        <p className={styles.content}>
          <small>fone: </small>
          <strong>{post.fone}</strong>
        </p>
        <p className={styles.content}>
          <small>endereço: </small>
          <strong>{post.endereco}</strong>
        </p>
        <p className={styles.content}>
          <small>referência: </small>
          <strong>{post.ref}</strong>
        </p>
        <p className={styles.content}>
          <small>observações: </small>
          <strong>{post.obs}</strong>
        </p>
        <p className={styles.content}>
          <small>forma de pagamento: </small>
          <strong>{post.formaPagamento}</strong>
        </p>

        <div className={styles.wrap}>
          <p className={styles.content}>
            <small>valor salada: </small>
            <strong> R$ {post.valor.toFixed(2)}</strong>
          </p>
          <p className={styles.content}>
            <small>Taxa de entrega: </small>

            {post.status ? (
              <strong> R$ {parseFloat(post.taxaEntrega).toFixed(2)}</strong>
            ) : (
              'Aguardando Aprovação'
            )}
          </p>
          <p className={styles.content}>
            <small>valor total: </small>
            <strong> R$ {parseFloat(post.total).toFixed(2)}</strong>
          </p>
          <hr />
          <center>{post.createdAt}</center>
          <p className={styles.content}>
            <small>cliente: </small>
            <strong>{post.nome}</strong>
          </p>
          <div className="page-break"></div>
          <div className={styles.sides}>
            <div className={styles.left}>
              <small>FOLHAS:</small>
            </div>
            <div className={styles.right}>
              {post.folhas.map((e) => {
                return (
                  <p key={e.nome + 'TE'}>
                    <strong>{e.nome}</strong>
                  </p>
                );
              })}
            </div>
          </div>
          <div className={styles.sides}>
            <div className={styles.left}>
              <small>INGREDIENTES:</small>
            </div>
            <div className={styles.right}>
              {post.ingredientes.map((e) => {
                return (
                  <p key={e.nome + 'TE'}>
                    <strong>{e.nome}</strong>
                  </p>
                );
              })}
            </div>
          </div>
          <div className={styles.sides}>
            <div className={styles.left}>
              <small>FRUTAS:</small>
            </div>
            <div className={styles.right}>
              {post.frutas.map((e) => {
                return (
                  <p key={e.nome + 'TE'}>
                    <strong>{e.nome}</strong>
                  </p>
                );
              })}
            </div>
          </div>
          <div className={styles.sides}>
            <div className={styles.left}>
              <small>PROTEINAS:</small>
            </div>
            <div className={styles.right}>
              {post.proteinas.map((e) => {
                return (
                  <p key={e.nome + 'TE'}>
                    <strong>{e.nome}</strong>
                  </p>
                );
              })}
            </div>
          </div>
          <div className={styles.sides}>
            <div className={styles.left}>
              <small>FIBRAS:</small>
            </div>
            <div className={styles.right}>
              {post.fibras.map((e) => {
                return (
                  <p key={e.nome + 'TE'}>
                    <strong>{e.nome}</strong>
                  </p>
                );
              })}
            </div>
          </div>
          <div className={styles.sides}>
            <div className={styles.left}>
              <small>MOLHOS:</small>
            </div>
            <div className={styles.right}>
              {post.molhos.map((e) => {
                return (
                  <p key={e.nome + 'TE'}>
                    <strong>
                      {e.add ? ' R$ ' + e.add.toFixed(2) + ' __ ' : ''}
                    </strong>
                    <strong>{e.nome}</strong>
                  </p>
                );
              })}
            </div>
          </div>
          <div className={styles.sides}>
            <div className={styles.left}>
              <small>EXTRAS:</small>
            </div>
            <div className={styles.right}>
              {post.extras.map((e) => {
                return (
                  <p key={e.nome + 'TE'}>
                    <strong> R$ {e.add.toFixed(2)} __ </strong>
                    <strong>{e.nome}</strong>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className={styles.wrap}>
        <time dateTime={post.createdAt} className={styles.timestamp}>
          {timestampTxt} - {post.createdAt}
        </time>
        {post.status ? (
          <div>
            <Button onClick={handlePrint} type="success" loading={isLoading}>
              Imprimir Pedido
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Pedido;
