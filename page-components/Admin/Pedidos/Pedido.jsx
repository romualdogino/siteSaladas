import { Input, Textarea } from '@/components/Input';
import { Button } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout'
import { useCurrentUser } from '@/lib/user';
import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';

const PostPedido = ({ user }) => {
    const nomeFor = useRef();
    const emailFor = useRef();
    const foneFor = useRef();
    const enderecoFor = useRef();
    const responsavelFor = useRef();
    const obsFor = useRef();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true);
                await fetcher('/api/pedidos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        nome: nomeFor.current.value, 
                        email: emailFor.current.value, 
                        fone: foneFor.current.value, 
                        endereco: enderecoFor.current.value, 
                        responsavel: responsavelFor.current.value, 
                        obs: obsFor.current.value, 
                    }),
                });
                toast.success('sucesso ao add um novo pedido');
                nomeFor.current.value = '';
                emailFor.current.value = '';
                foneFor.current.value = '';
                enderecoFor.current.value = '';
                responsavelFor.current.value = '';
                obsFor.current.value = '';
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
            <Container>
                <Input label="nome" ref={nomeFor} />
                <Input label="email" ref={emailFor} />
                <Input label="fone" ref={foneFor} />
                <Input label="endereco" ref={enderecoFor} />
                <Input label="responsavel" ref={responsavelFor} />
                <Textarea label="obs" ref={obsFor} />
                
                <Button type="success" loading={isLoading}>
                    Add pedido
                </Button>
            </Container>
        </form>
    )
}

const PedidoAdd = () => {
    return (
        <Wrapper>
            <div>
                <h3>Criação de Pedidos</h3>
                <PostPedido />
            </div>
        </Wrapper>
    )
}

export default PedidoAdd;