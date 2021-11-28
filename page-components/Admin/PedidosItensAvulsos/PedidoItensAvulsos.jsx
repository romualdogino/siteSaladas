import { Input, Textarea, Select } from '@/components/Input';
import { Button } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout'
import { useCurrentUser } from '@/lib/user';
import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import styles from './admin.module.css';

const PostPedido = ({ user }) => {
    const nomePed = useRef();
    const refPed = useRef();
    const addPed = useRef();

    const itens = [
        { _id: "Folhas", nome: "Folhas" },
        { _id: "Ingredientes", nome: "Ingredientes" },
        { _id: "Frutas", nome: "Frutas" },
        { _id: "Proteínas", nome: "Proteínas" },
        { _id: "Fibras", nome: "Fibras" },
        { _id: "Molhos", nome: "Molhos" },
        { _id: "Extras", nome: "Extras" }
    ]
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true);
                await fetcher('/api/pedidosItensAvulsos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: nomePed.current.value,
                        ref: refPed.current.value,
                        add: addPed.current.value,
                    }),
                });
                toast.success('sucesso ao add um novo pedido');
                nomePed.current.value = '';
                refPed.current.value = '';
                addPed.current.value = '';
                
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
                <Select label="referência" ref={refPed} data={itens} firstOption="Escolha o Item"/>
                <Input label="nome" ref={nomePed} /> 
                <Input label="add ( 0.00 ) com ponto" ref={addPed}/>

                <Button type="success" loading={isLoading}>
                    Add Item
                </Button>
            </Container>
        </form>
    )
}

const PedidoItensAvulsosAdd = () => {
    return (
        <Wrapper>
            <div>
                <h3>Criação de Pedidos</h3>
                <PostPedido />
            </div>
        </Wrapper>
    )
}

export default PedidoItensAvulsosAdd;