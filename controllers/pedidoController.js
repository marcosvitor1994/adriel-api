const { PedidoModel } = require("../models/pedidoModel");

class PedidoController {
  async list(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10; // Padrão: 10 pedidos por página
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * limit;

      const pedidos = await PedidoModel.find().skip(skip).limit(limit);

      return res.json({
        error: false,
        pedidos,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Erro ao listar pedidos",
        details: error.message,
      });
    }
  }

  async listOne(req, res) {
    try {
      const pedido = await PedidoModel.findById(req.params.id);

      if (!pedido) {
        return res.status(404).json({
          error: true,
          message: "Pedido não encontrado",
        });
      }

      return res.json({
        error: false,
        pedido,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Erro ao buscar pedido",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const novoPedido = new PedidoModel(req.body);
      await novoPedido.save();

      return res.status(201).json({
        error: false,
        message: "Pedido cadastrado com sucesso!",
        pedido: novoPedido,
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao cadastrar pedido",
        details: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const pedido = await PedidoModel.findById(req.params.id);

      if (!pedido) {
        return res.status(404).json({
          error: true,
          message: "Pedido não encontrado!",
        });
      }

      await PedidoModel.updateOne({ _id: req.params.id }, req.body);

      return res.json({
        error: false,
        message: "Pedido atualizado com sucesso!",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao atualizar pedido",
        details: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const pedido = await PedidoModel.findById(req.params.id);

      if (!pedido) {
        return res.status(404).json({
          error: true,
          message: "Pedido não encontrado!",
        });
      }

      await PedidoModel.deleteOne({ _id: req.params.id });

      return res.json({
        error: false,
        message: "Pedido apagado com sucesso!",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao apagar pedido",
        details: error.message,
      });
    }
  }
}

module.exports = new PedidoController();