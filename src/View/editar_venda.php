<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php'; ?>
<!DOCTYPE html>
<?php include_once PATH_URL . '/Template/_includes/_head.php' ?>
<style>
    /* Ajuste a largura da coluna do nome do produto */
.product-name {
    width: 40%; /* Ajuste conforme necessário */
}

/* Ajuste a largura da coluna da quantidade */
.product-quantity-cell {
    width: 10%; /* Ajuste conforme necessário */
}
.product-quantity {
    border: none;
    outline: none;
}
</style>
<body cz-shortcut-listen="true">


    <?php include_once PATH_URL . '/Template/_includes/_topo.php' ?>
    </div>

    <?php include_once PATH_URL . '/Template/_includes/_menu.php' ?>
    <div class="page-wrapper">
        <div class="content">
            <div class="page-header">
                <div class="page-title">
                    <h4>Adicionar venda</h4>
                    <h6>Adicionar novas vendas</h6>
                </div>
                <div class="page-btn">
                    <a href="nova_venda.php" class="btn btn-added"><img src="../Template/assets/img/icons/plus.svg" alt="img" class="me-1">Nova venda</a>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label>Cliente</label>
                                <div class="row">
                                    <div class="col-lg-10 col-sm-10 col-10">
                                        <select class="select" id="clientes_alt">

                                        </select>
                                    </div>
                                    <div class="col-lg-2 col-sm-2 col-2 ps-0">
                                        <div class="add-icon">
                                            <span><img src="../Template/assets/img/icons/plus1.svg" alt="img"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label>Data venda</label>
                                <div class="input-groupicon">
                                    <input type="text" id="data_venda" placeholder="Choose Date" class="datetimepicker">
                                    <a class="addonset">
                                        <img src="../Template/assets/img/icons/calendars.svg" alt="img">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="col-lg-3 col-sm-6 col-12">
                                <div class="form-group">
                                    <label>Supplier</label>
                                    <select class="select">
                                        <option>Choose</option>
                                        <option>Supplier Name</option>
                                    </select>
                                </div>
                            </div> -->
                        <div class="col-lg-12 col-sm-6 col-12">
                            <div class="form-group">
                                <label>Product Name</label>
                                <div class="input-groupicon">
                                    <select class="select" id="produto_venda_alterado">

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome produto</th>
                                        <th>Qtd</th>
                                        <th>Valor</th>
                                        <th>Valor Total</th>
                                        <th>Excluir</th>
                                        <!-- Adicione outras colunas conforme necessário -->
                                    </tr>
                                </thead>
                                <tbody id="productTableBodyAlt">
                                    <!-- Conteúdo da tabela será inserido aqui dinamicamente -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-sm-6 col-12">
                            <div class="form-group">
                                <label>Desconto</label>
                                <input id="desconto_alt" type="text">
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-12">
                            <div class="form-group">
                                <label>Valor entrega</label>
                                <input id="valor_entrega_alt" type="text">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label>Status</label>
                                <select id="status_alt" class="select">
                                    <option value="0">Escolha o status...</option>
                                    <option value="1">Orçamento</option>
                                    <option value="2">Em andamento</option>
                                    <option value="3">Concluída</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 ">
                                <div class="total-order w-100 max-widthauto m-auto mb-4">
                                    <ul>
                                        <li>
                                            <h4>Desconto </h4>
                                            <h5 id="total_desconto_alt">$ 0.00</h5>
                                        </li>
                                        <li>
                                            <h4>Entrega</h4>
                                            <h5 id="total_entrega_alt">$ 0.00</h5>
                                        </li>
                                        <li class="total">
                                            <h4>Valor Total</h4>
                                            <h5 id="total_geral_alt">$ 0.00</h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <a href="javascript:void(0);" id="btnEditar" class="btn btn-submit me-2">Gravar</a>
                            <a href="vendas.php" class="btn btn-cancel">Voltar</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>

    <?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>

    <script src="../Template/assets/js/script.js"></script>
    <script src="../Resource/ajax/venda-ajx.js"></script>
    <script src="../Resource/ajax/buscar_cep_ajx.js"></script>

    <script>
        Verify();
        DetalharVenda();
        ClientesVenda();
        //CarregarProdutoVenda()
    </script>


</body>