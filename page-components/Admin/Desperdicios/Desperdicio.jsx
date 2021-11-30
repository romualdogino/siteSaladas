import { Input, Textarea, Select } from '@/components/Input';
import { Button } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout'
import { useCurrentUser } from '@/lib/user';
import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';

import { useItemPages } from '@/lib/Item';
import { useStatusMotivoPages } from '@/lib/status';

const PostDesperdicio = ({ user }) => {

    const { data, size, setSize, isLoadingMore, isReachingEnd } = useItemPages();
    const data2 = useStatusMotivoPages();
    
    
    const dadosItem = data
        ? data.reduce((acc, val) => [...acc, ...val.posts], [])
        : [];
    const dadosMotivo = data2.data
        ? data2.data.reduce((acc, val) => [...acc, ...val.posts], [])
        : [];

    const ItemDesp = useRef();
    const qtdDesp = useRef();
    const MotivoDesp = useRef();
    const obsDesp = useRef();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true);
                await fetcher('/api/desperdicios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        Item: ItemDesp.current.value, 
                        qtd: qtdDesp.current.value, 
                        Motivo: MotivoDesp.current.value, 
                        obs: obsDesp.current.value, 
  
                    }),
                });
                toast.success('sucesso ao add um novo desperdicios');
                ItemDesp.current.value = '';
                qtdDesp.current.value = '';
                MotivoDesp.current.value = '';
                obsDesp.current.value = '';
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
                <Select label="Item" ref={ItemDesp} data={dadosItem} firstOption="Escolha o Item" />
                <Input label="Quantidade" ref={qtdDesp} />
                <Select label="Motivo" ref={MotivoDesp} data={dadosMotivo} firstOption="Escolha o Motivo" />
                <Textarea label="obs" ref={obsDesp} />
                
                <Button type="success" loading={isLoading}>
                    Add desperdicio
                </Button>
            </Container>
        </form>
    )
}

const DesperdicioAdd = () => {
    return (
        <Wrapper>
            <div>
                <h3>Criação de desperdicios</h3>
                <PostDesperdicio />
            </div>
        </Wrapper>
    )
}

export default DesperdicioAdd;