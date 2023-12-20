<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php'; ?>
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
                    <h4>Listagem de serviços</h4>
                    <h6>Gerencie seus serviços</h6>
                </div>
                <div class="page-btn">
                    <a href="novo_servico.php" class="btn btn-added"><img src="../Template/assets/img/icons/plus.svg" alt="img" class="me-1">Novo serviço</a>
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
                            <div class="search-input">
                                <a class="btn btn-searchset"><img src="../Template/assets/img/icons/search-white.svg" alt="img"></a>
                            </div>
                        </div>
                        <div class="wordset">
                            <ul>
                                <li>
                                    <a data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="pdf" aria-label="pdf"><img src="../Template/assets/img/icons/pdf.svg" alt="img"></a>
                                </li>
                                <li>
                                    <a data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="excel" aria-label="excel"><img src="../Template/assets/img/icons/excel.svg" alt="img"></a>
                                </li>
                                <li>
                                    <a data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="print" aria-label="print"><img src="../Template/assets/img/icons/printer.svg" alt="img"></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="card mb-0" id="filter_inputs">
                        <div class="card-body pb-0">
                            <div class="row">
                                <div class="col-lg-12 col-sm-12">
                                    <div class="row">
                                        <div class="col-lg col-sm-6 col-12">
                                            <div class="form-group">
                                                <input id="filtrar_nome" type="text" placeholder="Filtrar por nome">
                                            </div>
                                        </div>
                                        <div class="col-lg col-sm-6 col-12 ">
                                            <div class="form-group">
                                               <input id="filtrar_valor" type="text" placeholder="Filtrar por valor">
                                            </div>
                                        </div>
                                        <div class="col-lg-1 col-sm-6 col-12">
                                            <div class="form-group">
                                                <a onclick="FiltrarServico()"class="btn btn-filters ms-auto"><img src="../Template/assets/img/icons/search-whites.svg" alt="img"></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="table_servico" class="table-responsive">

                    </div>
                     <!-- Modal para exibir a imagem -->
                <div class="modal fade" id="modal-imagem" tabindex="-1" role="dialog" aria-labelledby="modal-imagem-label" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-body">
                                <center><img id="imagem-modal" src="" alt="product" class="produto-imagem"></center>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

        </div>
    </div>
    </div>


    <?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>

    <script src="../Template/assets/js/script.js"></script>
    <script src="../Resource/ajax/servico-ajx.js"></script>
    <script src="../Resource/ajax/modal-imagem-ajx.js"></script>
    <script src="../Resource/ajax/buscar_cep_ajx.js"></script>
    <script>
        Verify();
        RetornarServicos();
      
    </script>


</body>