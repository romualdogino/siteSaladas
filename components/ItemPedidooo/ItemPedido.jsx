const ItemPedido = ({ post, valor }) => {
  return (
    <>
      <div id={'ff' + post._id}>
        <label className="switch">
          <input id={'gg' + post._id} type="checkbox" />
          <span className="slider round"></span>
        </label>
        {valor ? (
          <mark>
            <small>
              <strong>+</strong> r$ {post.add}
            </small>
          </mark>
        ) : (
          ''
        )}
        {post.nome}
      </div>
    </>
  );
};

export default ItemPedido;
