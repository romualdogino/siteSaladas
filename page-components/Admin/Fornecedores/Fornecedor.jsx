import { Input, Textarea } from '@/components/Input';
import { Button } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout'
import { useCurrentUser } from '@/lib/user';
import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import styles from './admin.module.css';

const PostGrupo = ({ user }) => {
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
                await fetcher('/api/fornecedores', {
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
                toast.success('sucesso ao add um novo fornecedor');
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
            <Container className={styles.column}>
                <Input label="nome" ref={nomeFor} />
                <Input label="email" ref={emailFor} />
                <Input label="fone" ref={foneFor} />
                <Input label="endereco" ref={enderecoFor} />
                <Input label="responsavel" ref={responsavelFor} />
                <Textarea label="obs" ref={obsFor} />
                
                <Button type="success" loading={isLoading}>
                    Add fornecedor
                </Button>
            </Container>
        </form>
    )
}

const FornecedorAdd = () => {
    const arquivo = useCurrentUser
    return (
        <Wrapper>
            <div>
                <h3>Criação de Fornecedores</h3>
                <PostGrupo />
            </div>
        </Wrapper>
    )
}

export default FornecedorAdd;