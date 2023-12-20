<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php'; ?>
<!DOCTYPE html>
<?php include_once PATH_URL . '/Template/_includes/_head.php' ?>

<!-- Inclua os estilos do Bootstrap (substitua "versao_do_bootstrap" pelo número da versão desejada) -->
<!-- Inclua os estilos do FullCalendar -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.css" />

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/versao_do_bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.print.min.css" media="print" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.css" />
<link rel="stylesheet" href="../Template/assets/plugins/summernote/summernote-bs4.min.css">



<?php include_once PATH_URL . '/Template/_includes/_topo.php' ?>
</div>

<?php include_once PATH_URL . '/Template/_includes/_menu.php' ?>

<div class="page-wrapper">
    <div class="content">
        <div class="page-header">
            <div class="page-title">
                <h4>Agenda de serviços</h4>
                <h6>Gerencie seus serviços diários</h6>
            </div>
            <div class="page-btn">
                <button type="button" class="btn btn-added" data-toggle="modal" data-target="#novoEventoModal">
                    Agendar serviço
                </button>
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

                <div id="calendar"></div>


            </div>


            <!-- Modal para exibir a imagem -->

        </div>
    </div>

</div>
</div>
</div>


<!-- Modal para adicionar um novo evento -->
<div class="modal fade" id="novoEventoModal" tabindex="-1" role="dialog" aria-labelledby="novoEventoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="novoEventoModalLabel">Novo Serviço</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Formulário para adicionar um novo evento -->
                <form id="novoEventoForm">
                    <div class="row">
                        <div class="col-lg-12 col-sm-6 col-6">
                            <div class="form-group">
                                <label for="tituloNovoEvento">Título do Evento</label>
                                <input type="text" class="form-control" id="tituloNovoEvento" placeholder="Título do Evento">
                            </div>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-6">
                            <div class="form-group">
                                <label>Clientes</label>
                                <div class="input-groupicon">
                                    <select class="select" id="clientes_alt">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-6">
                            <div class="form-group">
                                <label>Data do serviço</label>
                                <div class="input-groupicon">
                                    <input id="data_evento" type="date" placeholder="Escolha a data" class="form-control">


                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-6">
                            <div class="form-group">
                                <label>Hora do serviço</label>
                                <div class="input-groupicon">

                                    <input id="hora_evento" type="time" placeholder="Escolha a data" class="form-control">

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 col-sm-12 col-12">
                            <div class="form-group">
                                <label>Observação</label>
                                <div class="input-groupicon">

                                    <textarea id="texto" type="text" placeholder="Observação" class="form-control"></textarea>

                                </div>
                            </div>
                        </div>
                        <!-- Adicione mais campos conforme necessário -->
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" id="salvarNovoEventoBtn">Salvar Evento</button>
            </div>
        </div>
    </div>
</div>




<!-- Modal para editar o evento -->
<!-- Modal para editar eventos -->
<div class="modal fade" id="editarEventoModal" tabindex="-1" role="dialog" aria-labelledby="editarEventoModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editarEventoModalLabel">Editar Evento</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Formulário para editar o evento -->
                <form id="editarEventoForm">
                <div class="row">
                        <div class="col-lg-12 col-sm-6 col-6">
                            <div class="form-group">
                                <label for="">Título do Evento</label>
                                <input type="text" class="form-control" id="tituloNovoEvento_alt" placeholder="Título do Evento">
                            </div>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-6">
                            <div class="form-group">
                                <label>Clientes</label>
                                <div class="input-groupicon">
                                    <select class="select" id="clientes_agend_alt">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-6">
                            <div class="form-group">
                                <label>Data do serviço</label>
                                <div class="input-groupicon">
                                    <input id="data_evento_alt" type="date" placeholder="Escolha a data" class="form-control">


                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 col-sm-6 col-6">
                            <div class="form-group">
                                <label>Hora do serviço</label>
                                <div class="input-groupicon">

                                    <input id="hora_evento_alt" type="time" placeholder="Escolha a data" class="form-control">

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 col-sm-12 col-12">
                            <div class="form-group">
                                <label>Observação</label>
                                <div class="input-groupicon">

                                    <textarea id="texto_alt" type="text" placeholder="Observação" class="form-control"></textarea>

                                </div>
                            </div>
                        </div>
                        <!-- Adicione mais campos conforme necessário -->
                    </div>
                    <!-- Adicione mais campos conforme necessário -->
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" onclick="fecharModalEditar()" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" id="salvarEventoBtn">Salvar Alterações</button>
            </div>
        </div>
    </div>
</div>
<?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>

<script src="../Template/assets/js/script.js"></script>
<script src="../Resource/ajax/os-ajx.js"></script>
<script src="../Resource/ajax/buscar_cep_ajx.js"></script>
<!-- Inclua os scripts do Bootstrap (substitua "versao_do_bootstrap" pelo 
<div id="calendar"></div>

   Inclua o Popper.js de um CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.10.2/umd/popper.min.js"></script>
<!-- Inclua os scripts do jQuery, Bootstrap e FullCalendar -->

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.js"></script>
<script src="../Template/assets/plugins/summernote/summernote-bs4.min.js"></script>
<!-- Inclua o arquivo de tradução para o português após o fullcalendar.min.js -->
<script src="https://cdn.jsdelivr.net/npm/fullcalendar/dist/locale/pt-br.js"></script>




<script>
    Verify();
    ClientesOs();
</script>
</body>