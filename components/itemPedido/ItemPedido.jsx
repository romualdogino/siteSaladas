import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo, useReducer, useRef } from 'react';
import styles from './Post.module.css';



const ItemPedido = ({ post, className, valor}) => {
    return (
      <>
            <div id={"ff"+post._id}>
                <label className="switch">
                    <input id={"gg"+post._id} type="checkbox" />
                    <span className="slider round"></span>
                </label>
                {valor?<mark><small> <strong>+</strong> r$ {post.add} </small></mark> :""}
                {post.nome}
            </div>
        </>
    );
};

export default ItemPedido;