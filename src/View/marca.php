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
                    <h4>Listagem de marcas</h4>
                    <h6>Gerencie suas marcas</h6>
                </div>
                <div class="page-btn">
                    <a href="nova_marca.php" class="btn btn-added"><img src="../Template/assets/img/icons/plus.svg" alt="img" class="me-1">Nova marca</a>
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
                                    <a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf"><img src="../Template/assets/img/icons/pdf.svg" alt="img"></a>
                                </li>
                                <li>
                                    <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"><img src="../Template/assets/img/icons/excel.svg" alt="img"></a>
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
                                <div class="col-lg-3 col-sm-6 col-12">
                                    <div class="form-group">
                                        <input type="text" placeholder="Filtrar nome da marca">
                                    </div>
                                </div>
                                <div class="col-lg-3 col-sm-6 col-12">
                                    <div class="form-group">
                                        <input type="text" placeholder="Filtrar descrição da marca">
                                    </div>
                                </div>
                                <div class="col-lg-1 col-sm-6 col-12 ms-auto">
                                    <div class="form-group">
                                        <a class="btn btn-filters ms-auto"><img src="../Template/assets/img/icons/search-whites.svg" alt="img"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table datanew">
                            <thead>
                                <tr>
                                    <th>
                                        <label class="checkboxs">
                                            <input type="checkbox" id="select-all">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </th>
                                    <th>Imagem</th>
                                    <th>Nome da marca</th>
                                    <th>Descrição da marca</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <label class="checkboxs">
                                            <input type="checkbox">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <a class="product-img">
                                            <img src="../Template/assets/img/brand/adidas.png" alt="product">
                                        </a>
                                    </td>
                                    <td>Adidas</td>
                                    <td>Shoes, sportswear</td>
                                    <td>
                                        <a class="me-3" href="editbrand.html">
                                            <img src="../Template/assets/img/icons/edit.svg" alt="img">
                                        </a>
                                        <a class="me-3 confirm-text" href="javascript:void(0);">
                                            <img src="../Template/assets/img/icons/delete.svg" alt="img">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label class="checkboxs">
                                            <input type="checkbox">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <a class="product-img">
                                            <img src="../Template/assets/img/brand/colgate.png" alt="product">
                                        </a>
                                    </td>
                                    <td>Colgate</td>
                                    <td>Oral hygiene. Toothbrushes</td>
                                    <td>
                                        <a class="me-3" href="editbrand.html">
                                            <img src="../Template/assets/img/icons/edit.svg" alt="img">
                                        </a>
                                        <a class="me-3 confirm-text" href="javascript:void(0);">
                                            <img src="../Template/assets/img/icons/delete.svg" alt="img">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label class="checkboxs">
                                            <input type="checkbox">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <a class="product-img">
                                            <img src="../Template/assets/img/brand/samsung.png" alt="product">
                                        </a>
                                    </td>
                                    <td>samsung</td>
                                    <td>Electronics</td>
                                    <td>
                                        <a class="me-3" href="editbrand.html">
                                            <img src="../Template/assets/img/icons/edit.svg" alt="img">
                                        </a>
                                        <a class="me-3 confirm-text" href="javascript:void(0);">
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


</body>