import { Input, Textarea, Select } from '@/components/Input';
import { Button } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout'
import { useCurrentUser } from '@/lib/user';
import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { useItemPages, useItemSelect } from '@/lib/Item';
import { useFornecedorPages, useFornecedorSelect } from '@/lib/fornecedor';
import styles from './admin.module.css';
const PostCompra = ({ user }) => {
    const { data, size, setSize, isLoadingMore, isReachingEnd } = useItemSelect();
    const data2 = useFornecedorSelect();
    const item = data
        ? data.reduce((acc, val) => [...acc, ...val.posts], [])
        : [];
    const fornecedor = data2.data
        ? data2.data.reduce((acc, val) => [...acc, ...val.posts], [])
        : [];

    const ItemID = useRef();
    const FornecedorID = useRef();
    const valorCompra = useRef();
    const qtdCompra = useRef();
    const dataCompra = useRef()
    const obsCompra = useRef();
    

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true);
                await fetcher('/api/compras', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ItemID: ItemID.current.value,
                        FornecedorID: FornecedorID.current.value,
                        valor: valorCompra.current.value,
                        qtd: qtdCompra.current.value,
                        data: dataCompra.current.value,
                        obs: obsCompra.current.value,
                    }),
                });
                toast.success('sucesso ao add uma nova compra');
                ItemID.current.value = '';
                FornecedorID.current.value = '';
                valorCompra.current.value = '';
                qtdCompra.current.value = '';
                dataCompra.current.value = '';
                obsCompra.current.value = '';
                // refresh post lists
                mutate();
            } catch (error) {
                toast.error(error.message)
            } finally {
                setIsLoading(false);
            }
        }
    )
    return (
        <form onSubmit={onSubmit}>
            <Container className={styles.column}>
                <Select label="item" ref={ItemID} data={item} firstOption="Escolha o Item"/>
                <Select label="nome" ref={FornecedorID} data={fornecedor} firstOption="Escolha o Fornecedor"/>
                <Input label="valor" ref={valorCompra} htmlType="Number"/>
                <Input label="quantidade" ref={qtdCompra} htmlType="Number"/>
                <Input label="data" ref={dataCompra} htmlType="Date" />
                <Textarea label="obs" ref={obsCompra} />

                <Button type="success" loading={isLoading}>
                    Add compra
                </Button>
            </Container>
        </form>
    )
}

const CompraAdd = () => {
    return (
        <Wrapper>
            <div>
                <h3>Criação de Compras</h3>
                <PostCompra />
            </div>
        </Wrapper>
    )
}

export default CompraAdd;
