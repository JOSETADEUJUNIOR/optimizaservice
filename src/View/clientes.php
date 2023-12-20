<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php'; use \Src\_public\Util;?>
<!DOCTYPE html>
<?php include_once PATH_URL . '/Template/_includes/_head.php' ?>

<body cz-shortcut-listen="true">


    <?php include_once PATH_URL . '/Template/_includes/_topo.php' ?>
    </div>

    <?php include_once PATH_URL . '/Template/_includes/_menu.php' ?>
    <div class="page-wrapper">
        <div class="content">
            <div class="page-header">
                <div class="page-title">
                    <h4>Listagem de clientes</h4>
                    <h6>Gerencie seus clientes</h6>
                </div>
                <div class="page-btn">
                    <a href="novo_cliente.php" class="btn btn-added"><img src="../Template/assets/img/icons/plus.svg" alt="img" class="me-1">Novo cliente</a>
                </div>
            </div>

            <div class="card">
                    <div class="card-body">
                        <div class="table-top">
                            <div class="search-set">
                                <div class="search-path">
                                    <a class="btn btn-filter" id="filter_search">
                                        <img src="../Template/assets/img/icons/filter.svg" alt="img">
                                        <span><img src="../Template/assets/img/icons/closes.svg" alt="img"></span>
                                    </a>
                                </div>
                              
                            </div>
                            <div class="wordset">
                                <ul>
                                    <li>
                                        <a data-bs-toggle="tooltip" onclick="gerarPDFCliente()" data-bs-placement="top" title="pdf"><img
                                                src="../Template/assets/img/icons/pdf.svg" alt="img"></a>
                                    </li>
                                    <li>
                                        <a data-bs-toggle="tooltip" onclick="gerarExcelCliente()" data-bs-placement="top" title="excel"><img
                                                src="../Template/assets/img/icons/excel.svg" alt="img"></a>
                                    </li>
                                    <li>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="print"><img
                                                src="../Template/assets/img/icons/printer.svg" alt="img"></a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="card" id="filter_inputs">
                            <div class="card-body pb-0">
                                <div class="row">
                                    <div class="col-lg-4 col-sm-6 col-12">
                                        <div class="form-group">
                                            <input id="filtrar_nome" type="text" placeholder="Filtrar Nome">
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 col-12">
                                        <div class="form-group">
                                            <input id="filtrar_cidade" type="text" placeholder="Filtrar Cidade">
                                        </div>
                                    </div>
                                   
                                   
                                    <div class="col-lg-1 col-sm-6 col-12  ms-auto">
                                        <div class="form-group">
                                            <a class="btn btn-filters ms-auto" onclick="return FiltrarClientes()"><img
                                                    src="../Template/assets/img/icons/search-whites.svg" alt="img"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="table_cliente" class="table-responsive">
                            <table class="table  datanew">
                                <thead>
                                    <tr>
                                        <th>
                                            <label class="checkboxs">
                                                <input type="checkbox" id="select-all">
                                                <span class="checkmarks"></span>
                                            </label>
                                        </th>
                                        <th>Nome do Cliente</th>
                                        <th>Telefone</th>
                                        <th>e-mail</th>
                                        <th>Cidade</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="clientesTabela">
                                    <tr>
                                        <td>
                                            <label class="checkboxs">
                                                <input type="checkbox">
                                                <span class="checkmarks"></span>
                                            </label>
                                        </td>
                                        <td class="productimgname">
                                            <a href="javascript:void(0);" class="product-img">
                                                <img src="../Template/assets/img/customer/customer1.jpg" alt="product">
                                            </a>
                                            <a href="javascript:void(0);">Thomas</a>
                                        </td>
                                     
                                       
                                        <td>+12163547758 </td>
                                        <td><a href="/cdn-cgi/l/email-protection" class="__cf_email__"
                                                data-cfemail="1165797e7c7062517469707c617d743f727e7c">[email&#160;protected]</a>
                                        </td>
                                        <td>USA</td>
                                        <td>
                                            <a class="me-3" href="editcustomer.html">
                                                <img src="../Template/assets/img/icons/edit.svg" alt="img">
                                            </a>
                                            <a class="confirm-text" href="javascript:void(0);">
                                                <img src="../Template/assets/img/icons/delete.svg" alt="img">
                                            </a>
                                        </td>
                                    </tr>
                                    
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

        </div>
    </div>
    </div>


    <?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>

    <script src="../Template/assets/js/script.js"></script>
    <script src="../Resource/ajax/cliente-ajx.js"></script>
	<script src="../Resource/ajax/buscar_cep_ajx.js"></script>
	<script>
		Verify();
		CarregarClientes();
       
	</script>


</body>