import { Input, Textarea, Select } from '@/components/Input';
import { Button } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout'
import { useCurrentUser } from '@/lib/user';
import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { useTipoStatusPages } from '@/lib/tipoStatus';
import styles from './admin.module.css'

const PostStatus = ({ user }) => {
    const { data, size, setSize, isLoadingMore, isReachingEnd } = useTipoStatusPages();
    const tipos = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];
    const tipoStatus = useRef();
    const nomeStatus = useRef();
    const descricaoStatus = useRef();
  
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true);
                await fetcher('/api/status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        nome: nomeStatus.current.value, 
                        descricao: descricaoStatus.current.value, 
                        tipoStatus: tipoStatus.current.value, 
                    }),
                });
                toast.success('sucesso ao add um novo status');
                nomeStatus.current.value = '';
                descricaoStatus.current.value = '';
                tipoStatus.current.value = '';
                
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
            <Container className={styles.column} >
                <Select label="tipo" ref={tipoStatus} data={tipos} firstOption="Escolha o Tipo"/>
                <Input label="nome" ref={nomeStatus} />
                <Textarea label="descrição" ref={descricaoStatus} />
               
                <Button type="success" loading={isLoading}>
                    Add Status
                </Button>
            </Container>
        </form>
    )
}

const StatusAdd = () => {
    return (
        <Wrapper>
            <div>
                <h3>Criação de Status</h3>
                <PostStatus />
            </div>
        </Wrapper>
    )
}

export default StatusAdd;