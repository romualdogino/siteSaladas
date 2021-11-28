import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from './Post.module.css';
import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { forwardRef } from 'react';
// checked={post.ativo == true ? "checked":false}


const PedidoItensAvulso = ({ post, className, Key }) => {
    console.log(post)

    return (


        <div className={clsx(styles.root, className)}>
            <p>
                <input type="checkbox" id={"check"+post.nome}/>
                
                <small>{post.ref}</small>
                <strong>{post.nome}</strong>{post.add}
            </p>

        </div>
    )
}

export default PedidoItensAvulso;
