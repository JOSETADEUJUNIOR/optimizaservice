<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php'; ?>
<!DOCTYPE html>
<?php include_once PATH_URL . '/Template/_includes/_head.php' ?>
<link rel="stylesheet" href="/Template/assets/css/bootstrap.min.css">
<link rel="stylesheet" href="/Template/assets/plugins/select2/css/select2.min.css">
<link rel="stylesheet" href="/Template/assets/plugins/owlcarousel/owl.carousel.min.css">
<link rel="stylesheet" href="/Template/assets/plugins/owlcarousel/owl.theme.default.min.css">
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f4;
    }
    .row {
    display: flex;
}

.col-lg-12 {
    flex: 1;
    /* height: 398px; Remova esta linha */
}


    h1 {
        text-align: center;
        margin-bottom: 40px;
    }

    .container {
    display: flex;
    flex-wrap: wrap; /* Permita que os itens quebrem para a próxima linha quando não houver espaço suficiente */
    justify-content: space-between;
    max-width: 80%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}


    .menu-container,
    #cart-container,
    #sales-container {
        flex-basis: 30%;
        padding: 20px;
    }

    .menu-container h2,
    #cart-container h2,
    #sales-container h2 {
        margin-top: 0;
        margin-bottom: 20px;
        font-size: 20px;
    }

    #menu-list li,
    #cart-list li,
    #sales-list li {
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #e0e0e0;
    }

    #menu-list li:last-child,
    #cart-list li:last-child,
    #sales-list li:last-child {
        border-bottom: none;
    }

    .item-name {
        font-weight: bold;
    }

    .item-price {
        color: #777;
    }

    button {
        padding: 10px 20px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    button:hover {
        opacity: 0.8;
    }

    #payment-container {
        margin-top: 20px;
        display: none;
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 6px;
    }

    #change {
        font-weight: bold;
        margin-top: 10px;
        color: #27ae60;
    }

    #payment-input {
        width: 80px;
        padding: 10px;
    }

    #total-price,
    #total-sales {
        margin-top: 20px;
        font-weight: bold;
        font-size: 18px;
    }

    .checkout-btn {
        background-color: #3498db;
        color: #fff;
        border: none;
        /* padding: 10px 20px;
     */
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    .checkout-btn:hover {
        background-color: #2980b9;
    }
</style>

<body>

    <?php include_once PATH_URL . '/Template/_includes/_topo.php' ?>

    </div>
    <div class="page-wrapper ms-0">
        <div class="content">
            <div class="row">
                <h1>Sistema de Caixa</h1>
                <div class="col-lg-12 col-sm-12 ">
                    
                    <div class="card card-order">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <a href="javascript:void(0);" class="btn btn-adds" data-bs-toggle="modal" data-bs-target="#create"><i class="fa fa-plus me-2"></i>Novo Cliente</a>
                                </div>
                                <div class="col-lg-12">
                                    <div class="select-split ">
                                        <div class="select-group w-100">
                                            <select id="cliente" class="select">
                                                <option value="0">Cliente sem cadastro</option>
                                                <option value="1">Junior</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="select-split ">
                                        <div class="select-group w-100">
                                            <input type="text" id="valorEntrega">
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
                <div class="container">
                    <div class="menu-container">
                        <h2>Menu</h2>
                        <ul id="menu-list">
                            <li data-name="Pastel" data-price="6.00">
                                <span class="item-name">Pastel</span>
                                <span class="item-price">R$6,00</span>
                            </li>
                            <li data-name="Espeto" data-price="8.00">
                                <span class="item-name">Espeto</span>
                                <span class="item-price">R$8,00</span>
                            </li>
                            <li data-name="Polenta" data-price="8.00">
                                <span class="item-name">Polenta</span>
                                <span class="item-price">R$8,00</span>
                            </li>
                            <li data-name="Cachorro" data-price="10.00">
                                <span class="item-name">Cachorro</span>
                                <span class="item-price">R$10,00</span>
                            </li>
                            <li data-name="Batata" data-price="8.00">
                                <span class="item-name">Batata</span>
                                <span class="item-price">R$8,00</span>
                            </li>
                            <li data-name="Churrasco" data-price="15.00">
                                <span class="item-name">Churrasco</span>
                                <span class="item-price">R$15,00</span>
                            </li>
                            <li data-name="Refrigerante" data-price="5.00">
                                <span class="item-name">Refrigerante</span>
                                <span class="item-price">R$5,00</span>
                            </li>
                            <li data-name="Cerveja" data-price="5.00">
                                <span class="item-name">Cerveja</span>
                                <span class="item-price">R$5,00</span>
                            </li>
                            <li data-name="Suco" data-price="3.00">
                                <span class="item-name">Suco</span>
                                <span class="item-price">R$3,00</span>
                            </li>
                            <li data-name="Bebida quente" data-price="5.00">
                                <span class="item-name">Bebida quente</span>
                                <span class="item-price">R$5,00</span>
                            </li>
                        </ul>

                    </div>
                    <div id="cart-container">
                        <h2>Carrinho</h2>
                        <ul id="cart-list"></ul>
                        <input type="number" id="discount-input" placeholder="Desconto (%)" step="0.01" min="0">

                        <p id="total-geral">Total Geral: R$0.00</p>
                        <div id="payment-container">
                            <label for="payment-input">Pagamento: R$</label>
                            <input type="number" id="payment-input" step="0.01" min="0.01" required>
                            <button id="pay-btn">Pagar</button>
                            <p id="change"></p>
                        </div>
                    </div>
                    <div id="sales-container">
                        <h2>Histórico de Vendas</h2>
                        <ul id="sales-list"></ul>
                        <p id="total-sales">Total de Vendas: R$0.00</p>
                        <div class="col-sm-12">
                            <button id="checkout-btn">Finalizar Pedido</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
    </div>
    <div class="modal fade" id="create" tabindex="-1" aria-labelledby="create" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6 col-sm-12 col-12">
                            <div class="form-group">
                                <label>Customer Name</label>
                                <input type="text">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 col-12">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="text">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 col-12">
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="text">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 col-12">
                            <div class="form-group">
                                <label>Country</label>
                                <input type="text">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 col-12">
                            <div class="form-group">
                                <label>City</label>
                                <input type="text">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 col-12">
                            <div class="form-group">
                                <label>Address</label>
                                <input type="text">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <a class="btn btn-submit me-2">Submit</a>
                        <a class="btn btn-cancel" data-bs-dismiss="modal">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>



    <script src="../Template/assets/plugins/sweetalert/sweetalert2.all.min.js"></script>
    <script src="../Template/assets/plugins/sweetalert/sweetalerts.min.js"></script>

    <script src="../Template/assets/js/script.js"></script>
    <script src="../Template/assets/plugins/owlcarousel/owl.carousel.min.js"></script>


    <script src="../Resource/ajax/venda-ajx.js"></script>
    <script>
        Verify();

        var carrinhoProdutos = [];
        RetornarCategoriasPDV();
        CarregarProdutoVendaPDV();
    </script>
</body>