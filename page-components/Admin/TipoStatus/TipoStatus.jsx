import { Input, Textarea } from '@/components/Input';
import { Button } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout'
import { useCurrentUser } from '@/lib/user';
import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';

const PostTipoStatus = ({ user }) => {
    const nomeTipo = useRef();
    const descricaoTipo = useRef();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true);
                await fetcher('/api/tipoStatus', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        nome: nomeTipo.current.value, 
                        descricao: descricaoTipo.current.value,  
                    }),
                });
                toast.success('sucesso ao add um novo fornecedor');
                nomeTipo.current.value = '';
                descricaoTipo.current.value = '';
               
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
                <Input label="nome" ref={nomeTipo} />
               
                <Textarea label="descricao" ref={descricaoTipo} />
                
                <Button type="success" loading={isLoading}>
                    Add tipoStatus
                </Button>
            </Container>
        </form>
    )
}

const TipoStatusAdd = () => {
    return (
        <Wrapper>
            <div>
                <h3>Criação de Tipos para Status</h3>
                <PostTipoStatus />
            </div>
        </Wrapper>
    )
}

export default TipoStatusAdd;
