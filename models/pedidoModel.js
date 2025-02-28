const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema({
  produto: {
    type: String,
    required: [true, "O nome do produto deve ser preenchido"],
  },
  quantidade: {
    type: Number,
    required: [true, "A quantidade deve ser preenchida"],
  },
  peso: {
    type: Number,
    required: false, // Pode ser opcional dependendo do produto
  },
  valorUnidade: {
    type: Number,
    required: [true, "O valor por unidade deve ser preenchido"],
  },
  subtotal: {
    type: Number,
    required: false, // Mantido para facilitar cálculos, pode ser atualizado antes de salvar
  },
});

const PedidoSchema = new mongoose.Schema(
  {
    cliente: {
      type: String,
      required: [true, "O nome do cliente deve ser preenchido"],
    },
    cnpj: {
      type: String,
      required: [true, "O CNPJ deve ser preenchido"],
    },
    endereco: {
      type: String,
      required: [true, "O endereço deve ser preenchido"],
    },
    telefone: {
      type: String,
      required: [true, "O telefone deve ser preenchido"],
    },
    data: {
      type: Date,
      required: [true, "A data do pedido deve ser preenchida"],
    },
    produtos: {
      type: [ProdutoSchema], // Array de produtos
      required: [true, "O pedido deve conter pelo menos um produto"],
    },
    parcelamento: {
      type: String,
      required: false, // Pode ser opcional dependendo da forma de pagamento
    },
    total: {
      type: Number,
      required: [true, "O valor total do pedido deve ser preenchido"],
    },
    pesoTotal: {
      type: Number,
      required: false, // Pode ser opcional dependendo do produto
    },
  },
  {
    timestamps: true,
    discriminatorKey: "status",
  }
);

const PedidoModel = mongoose.model("Pedido", PedidoSchema);

// Criando discriminadores para diferentes status de pedidos
module.exports.PedidoAguardandoModel = PedidoModel.discriminator(
  "Aguardando",
  new mongoose.Schema({})
);

module.exports.PedidoFinalizadoModel = PedidoModel.discriminator(
  "Finalizado",
  new mongoose.Schema({})
);

module.exports.PedidoModel = PedidoModel;