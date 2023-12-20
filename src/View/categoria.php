<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php'; ?>
<!DOCTYPE html>
<?php include_once PATH_URL . '/Template/_includes/_head.php' ?>




<?php include_once PATH_URL . '/Template/_includes/_topo.php' ?>
</div>

<?php include_once PATH_URL . '/Template/_includes/_menu.php' ?>
<div class="page-wrapper">
    <div class="content">
        <div class="page-header">
            <div class="page-title">
                <h4>Listagem de categorias</h4>
                <h6>Gerencie suas categorias</h6>
            </div>
            <div class="page-btn">
                <a href="nova_categoria.php" class="btn btn-added">Nova categoria</a>
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
                                <a data-bs-toggle="tooltip" onclick="gerarPDFCategoria()" data-bs-placement="top" title="pdf"><img src="../Template/assets/img/icons/pdf.svg" alt="img"></a>
                            </li>
                            <li>
                                <a data-bs-toggle="tooltip" onclick="gerarExcelCategoria()" data-bs-placement="top" title="excel"><img src="../Template/assets/img/icons/excel.svg" alt="img"></a>
                            </li>
                            <li>
                                <a data-bs-toggle="tooltip" data-bs-placement="top" title="print"><img src="../Template/assets/img/icons/printer.svg" alt="img"></a>
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
                                    <input id="filtrar_cod" type="text" placeholder="Filtrar Codigo">
                                </div>
                            </div>
                            <div class="col-lg-1 col-sm-6 col-12 ms-auto">
                                <div class="form-group">
                                    <a class="btn btn-filters ms-auto" onclick="return FiltrarCategoria()"><img src="../Template/assets/img/icons/search-whites.svg" alt="img"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="table_categoria" class="table-responsive">

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
<script src="../Resource/ajax/categoria-ajx.js"></script>
<script src="../Resource/ajax/modal-imagem-ajx.js"></script>
<script src="../Resource/ajax/buscar_cep_ajx.js"></script>
<script>
    Verify();
    RetornarCategorias();
</script>




</body>