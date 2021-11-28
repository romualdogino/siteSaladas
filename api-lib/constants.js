export const ValidateProps = {
  user: {
    username: { type: 'string', minLength: 4, maxLength: 20 },
    name: { type: 'string', minLength: 1, maxLength: 50 },
    password: { type: 'string', minLength: 8 },
    email: { type: 'string', minLength: 1 },
    bio: { type: 'string', minLength: 0, maxLength: 160 },
  },
  post: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
  comment: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
  grupo: {
    nome: { type: 'string', minLength: 1, maxLength: 280 },
    descricao: { type: 'string', minLength: 1, maxLength: 280 },
  },
  fornecedor: {
    nome: { type: 'string', minLength: 1, maxLength: 280 },
    email: { type: 'string', maxLength: 280 },
    fone: { type: 'string', maxLength: 280 },
    endereco: { type: 'string', maxLength: 280 },
    responsavel: { type: 'string', maxLength: 280 },
    obs: { type: 'string', maxLength: 1000 },

  },
  tipoStatus: {
    nome: { type: 'string', minLength: 1, maxLength: 280 },
    descricao: { type: 'string', minLength: 1, maxLength: 280 },
  },
  status: {
    nome: { type: 'string', minLength: 1, maxLength: 280 },
    descricao: { type: 'string', maxLength: 1000 },
    tipoStatus: { type: 'string', maxLength: 280 },
  },
  item: {

    nome: { type: 'string', minLength: 1, maxLength: 280 },
    GrupoID: { type: 'string', minLength: 1, maxLength: 280 },
    pesoPorcao: { type: 'string', maxLength: 6 },
    pesoRendimento: { type: 'string', maxLength: 6 },
    validadeDia: { type: 'string', maxLength: 6 },

    valorEnergitico: { type: 'string', minLength: 1, maxLength: 280 },
    carboidrato: { type: 'string', minLength: 1, maxLength: 280 },
    proteina: { type: 'string', minLength: 1, maxLength: 280 },
    gorduraSaturada: { type: 'string', minLength: 1, maxLength: 280 },
    gorduraTotal: { type: 'string', minLength: 1, maxLength: 280 },
    fibraAlimentar: { type: 'string', minLength: 1, maxLength: 280 },
    sodio: { type: 'string', minLength: 1, maxLength: 280 },
    gluten: { type: 'boolean' },
    conservante: { type: 'boolean' },
    lactose: { type: 'boolean' },
    ovo: { type: 'boolean' },
    soja: { type: 'boolean' },
    mar: { type: 'boolean' },
    amendoa: { type: 'boolean' },
    obs: { type: 'string', minLength: 1, maxLength: 280 }
  },
  compra: {
    nome: { type: 'string', minLength: 1, maxLength: 280 },
    descricao: { type: 'string', minLength: 1, maxLength: 280 },
    ItemID: { type: 'string', minLength: 1, maxLength: 280 },
    FornecedorID: { type: 'string', minLength: 1, maxLength: 280 },
    valor: { type: 'string', minLength: 1, maxLength: 280 },
    qtd: { type: 'string', minLength: 1, maxLength: 280 },
    data: { type: 'string', minLength: 1, maxLength: 280 },
    obs: { type: 'string', maxLength: 280 },
  },
  desperdicio: {
    Item: { type: 'string', minLength: 1, maxLength: 280 },
    qtd: { type: 'string', minLength: 1, maxLength: 280 },
    Motivo: { type: 'string', minLength: 1, maxLength: 280 },
    obs: { type: 'string', minLength: 1, maxLength: 280 },
  },
  produto: {
    nome: { type: 'string', minLength: 1, maxLength: 280 },
    descricao: { type: 'string', minLength: 1, maxLength: 280 },
  },
  combo: {
    nome: { type: 'string', minLength: 1, maxLength: 280 },
    descricao: { type: 'string', minLength: 1, maxLength: 280 },
  },
  pedido: {
    nome: { type: 'string', minLength: 1, maxLength: 280 },
    descricao: { type: 'string', minLength: 1, maxLength: 280 },
  },


};
