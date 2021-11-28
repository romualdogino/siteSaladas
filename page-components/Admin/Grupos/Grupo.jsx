import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout'
import { useCurrentUser } from '@/lib/user';
import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';

const PostGrupo = ({ user }) => {
    const nomeGru = useRef();
    const descricaoGru = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true);
                await fetcher('/api/grupos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        nome: nomeGru.current.value, 
                        descricao: descricaoGru.current.value, 
                    }),
                });
                toast.success('sucesso ao add um novo grupo');
                nomeGru.current.value = '';
                descricaoGru.current.value = '';
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
                <Input label="nome" ref={nomeGru} />
                <Input label="descrição" ref={descricaoGru} />
                <Button type="success" loading={isLoading}>
                    Add grupo
                </Button>
            </Container>
        </form>
    )
}

const GrupoAdd = () => {
    const arquivo = useCurrentUser
    return (
        <Wrapper>
            <div>
                <h3>Criação de Grupos</h3>
                <PostGrupo />
            </div>
        </Wrapper>
    )
}

export default GrupoAdd;