import { Input, Textarea, Select } from '@/components/Input';
import { Button } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout'
import { useCurrentUser } from '@/lib/user';
import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { useGrupoPages } from '@/lib/grupo';
import styles from './admin.module.css';


const PostItem = ({ user }) => {

    const { data, size, setSize, isLoadingMore, isReachingEnd } = useGrupoPages();
    const grupo = data
        ? data.reduce((acc, val) => [...acc, ...val.posts], [])
        : [];

    const nomeItem = useRef();
    const GrupoID = useRef();

    const pesoPorcaoItem = useRef();    //num
    const pesoRendimentoItem = useRef();//num

    // const qtdEstoqueItem = useRef();    //num
    // const qtdMinimoItem = useRef();     //num
    // const qtdPedidoItem = useRef();     //num

    // const valorUnidadeItem = useRef();  //num
    const validadeDiaItem = useRef();   //num

    const obsItem = useRef();

    const valorEnergiticoItem = useRef();   //num
    const carboidratoItem = useRef();       //num
    const proteinaItem = useRef();          //num
    const gorduraTotalItem = useRef();      //num
    const gorduraSaturadaItem = useRef();   //num
    const fibraAlimentarItem = useRef();    //num
    const sodioItem = useRef();             //num

    const glutenItem = useRef();        //boolean
    const conservanteItem = useRef();   //boolean
    const lactoseItem = useRef();       //boolean
    const ovoItem = useRef();           //boolean
    const sojaItem = useRef();          //boolean
    const marItem = useRef();           //boolean
    const amendoaItem = useRef();       //boolean

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(
        
        async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true);
                await fetcher('/api/itens', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: nomeItem.current.value,
                        grupoID: GrupoID.current.value,
                        pesoPorcao: pesoPorcaoItem.current.value,
                        pesoRendimento: pesoRendimentoItem.current.value,
                        // qtdEstoque: qtdEstoqueItem.current.value,
                        // qtdMinimo: qtdMinimoItem.current.value,
                        // qtdPedido: qtdPedidoItem.current.value,

                        // valorUnidade: valorUnidadeItem.current.value,
                        validadeDia: validadeDiaItem.current.value,

                        valorEnergitico: valorEnergiticoItem.current.value,
                        carboidrato: carboidratoItem.current.value,
                        proteina: proteinaItem.current.value,
                        gorduraSaturada: gorduraSaturadaItem.current.value,
                        gorduraTotal: gorduraTotalItem.current.value,
                        fibraAlimentar: fibraAlimentarItem.current.value,
                        sodio: sodioItem.current.value,
                        gluten: glutenItem.current.checked,
                        conservante: conservanteItem.current.checked,
                        lactose: lactoseItem.current.checked,
                        ovo: ovoItem.current.checked,
                        soja: sojaItem.current.checked,
                        mar: marItem.current.checked,
                        amendoa: amendoaItem.current.checked,
                        obs: obsItem.current.value
                    }),
                });
                toast.success('sucesso ao add um novo item');
                nomeItem.current.value = '';
                GrupoID.current.value = '';

                pesoPorcaoItem.current.value = '';
                pesoRendimentoItem.current.value = '';

                // qtdEstoqueItem.current.value = '';
                // qtdMinimoItem.current.value = '';
                // qtdPedidoItem.current.value = '';

                // valorUnidadeItem.current.value = '';
                validadeDiaItem.current.value = '';

                obsItem.current.value = '';

                valorEnergiticoItem.current.value = '';
                carboidratoItem.current.value = '';
                proteinaItem.current.value = '';
                gorduraTotalItem.current.value = '';
                gorduraSaturadaItem.current.value = '';
                fibraAlimentarItem.current.value = '';
                sodioItem.current.value = '';

                glutenItem.current.checked = false;
                conservanteItem.current.checked = false;
                lactoseItem.current.checked = false;
                ovoItem.current.checked = false;
                sojaItem.current.checked = false;
                marItem.current.checked = false;
                amendoaItem.current.checked = false;

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
                <Select label="grupo" ref={GrupoID} data={grupo} firstOption="Escolha o Grupo" />
                <Input label="nome" ref={nomeItem} />
                <Input label="peso por Proção" ref={pesoPorcaoItem} htmlType="Number" />
                <Input label="rendimento em %" ref={pesoRendimentoItem} htmlType="Number"min="0"max="1" step="any"/>
                <Input label="validade em dias " ref={validadeDiaItem} htmlType="Number" />
                <Textarea label="obs" ref={obsItem} />
                <Input label="gluten" ref={glutenItem} htmlType="checkbox" />
                <Input label="conservantes" ref={conservanteItem} htmlType="checkbox" />
                <Input label="lactose" ref={lactoseItem} htmlType="checkbox" />
                <Input label="ovo" ref={ovoItem} htmlType="checkbox" />
                <Input label="soja" ref={sojaItem} htmlType="checkbox" />
                <Input label="produtos do mar" ref={marItem} htmlType="checkbox" />
                <Input label="amendoas" ref={amendoaItem} htmlType="checkbox" />
                <Input label="valor enegéticos" ref={valorEnergiticoItem} htmlType="Number"  step="any"/>
                <Input label="carboidratos" ref={carboidratoItem} htmlType="Number"  step="any"/>
                <Input label="proteínas" ref={proteinaItem} htmlType="Number"  step="any"/>
                <Input label="gorduras saturadas" ref={gorduraSaturadaItem} htmlType="Number"  step="any"/>
                <Input label="gorduras totais" ref={gorduraTotalItem} htmlType="Number"  step="any"/>
                <Input label="fibras alimentar" ref={fibraAlimentarItem} htmlType="Number"  step="any"/>
                <Input label="sódio" ref={sodioItem} htmlType="Number"  step="any"/>


                <Button type="success" loading={isLoading}>
                    Add item
                </Button>
            </Container>
        </form>
    )
}

const ItemAdd = () => {
    return (
        <Wrapper>
            <div>
                <h3>Criação de Itens</h3>
                <PostItem />
            </div>
        </Wrapper>
    )
}

export default ItemAdd;