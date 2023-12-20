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
                    <h4>Editar Ordem de serviço</h4>
                    <h6>Edição e inclusão de produtos e serviços</h6>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <form id="form_editar_os">
                        <div class="row">
                            <div class="col-lg-8 col-sm-8 col-12">
                                <input type="hidden" id="OsID">
                                <div class="form-group">
                                    <label>Clientes</label>

                                    <div class="input-groupicon">
                                        <select class="select" id="clientes_alt">

                                        </select>
                                    </div>


                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label>Técnico</label>
                                    <div class="input-groupicon">
                                        <input id="os_tecnico_alt" type="text" placeholder="Nome do técnico" class="">

                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-6 col-12">
                                <div class="form-group">
                                    <label>Data início</label>
                                    <div class="input-groupicon">
                                        <input id="os_data_inicio_alt" type="datetime-local" class="form-control" pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}" placeholder="Escolha a data" required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-6 col-12">
                                <div class="form-group">
                                    <label>Data entrega</label>
                                    <div class="input-groupicon">
                                        <input id="os_data_fim_alt" type="datetime-local" class="form-control" pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}" placeholder="Escolha a data" required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <label>Garantia</label>
                                    <div class="input-groupicon">
                                        <input id="os_garantia_alt" type="text" placeholder="Nome do técnico" class="">

                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-6 col-12">
                                <div class="form-group">
                                    <label>Descrição</label>
                                    <textarea id="os_descricao_alt" class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-6 col-12">
                                <div class="form-group">
                                    <label>Defeito</label>
                                    <textarea id="os_defeito_alt" class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-6 col-12">
                                <div class="form-group">
                                    <label>Observação</label>
                                    <textarea id="os_obs_alt" class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-6 col-12">
                                <div class="form-group">
                                    <label>Laudo Técnico</label>
                                    <textarea id="os_laudo_alt" class="form-control"></textarea>
                                </div>
                            </div>

                        </div>
                    </form>
                    <div class="row">
                        <section class="comp-section">
                            <div class="section-header">
                                <h3 class="section-title">Produtos/Serviços/Anexos</h3>
                                <div class="line"></div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 col-sm-12 col-12">
                                    <div class="card bg-white" style="border: 1px solid #f8bf43">
                                        <div class="card-header">
                                            <h5 class="card-title">Incluir produtos -> Serviços -> Anexos</h5>
                                        </div>
                                        <div class="card-body">
                                            <ul class="nav nav-tabs nav-tabs-solid">
                                                <li class="nav-item"><a class="nav-link active" href="#solid-tab1" data-bs-toggle="tab">Produtos</a></li>
                                                <li class="nav-item"><a class="nav-link" href="#solid-tab2" data-bs-toggle="tab">Serviços</a></li>
                                                <li class="nav-item"><a class="nav-link" href="#solid-tab3" data-bs-toggle="tab">Anexos</a></li>
                                            </ul>
                                            <div class="tab-content">
                                                <div class="tab-pane show active col-lg-12 col-sm-12 col-12" id="solid-tab1">
                                                    <div class="row">
                                                        <div class="col-lg-8 col-sm-8 col-12">
                                                            <div class="form-group">
                                                                <label>Inserir produtos</label>
                                                                <div class="input-groupicon">
                                                                    <select class="select" id="produtos_os"></select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-sm-3 col-12">
                                                            <div class="form-group">
                                                                <label>Quantidade</label>
                                                                <div class="input-groupicon">
                                                                    <input id="qtd_produtos_os" type="text" placeholder="qtd" class="">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-sm-1 col-12">
                                                            <div class="form-group">
                                                                <label>Add</label>
                                                                <div class="add-icon">
                                                                    <a onclick="InserirProdutoOs()">
                                                                        <span><img src="../Template/assets/img/icons/plus1.svg" alt="img"></span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="table-responsive mb-3">
                                                        <table class="table" id="tabela_ordem_produto">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Nome do produto</th>
                                                                    <th>Quantidade</th>
                                                                    <th>Valor</th>
                                                                    <th>Subtotal</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </div>
                                                <div class="tab-pane" id="solid-tab2">
                                                    <div class="row">
                                                        <div class="col-lg-8 col-sm-8 col-12">
                                                            <div class="form-group">
                                                                <label>Inserir serviços</label>
                                                                <div class="input-groupicon">
                                                                    <select class="select" id="servicos_os"></select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 col-sm-3 col-12">
                                                            <div class="form-group">
                                                                <label>Quantidade</label>
                                                                <div class="input-groupicon">
                                                                    <input id="qtd_servico_os" type="text" placeholder="qtd" class="">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-sm-1 col-12">
                                                            <div class="form-group">
                                                                <label>Add</label>
                                                                <div class="add-icon">
                                                                    <a onclick="InserirServicoOs()">
                                                                        <span><img src="../Template/assets/img/icons/plus1.svg" alt="img"></span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="table-responsive mb-3">
                                                        <table class="table" id="tabela_ordem_servico">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Nome do serviço</th>
                                                                    <th>Quantidade</th>
                                                                    <th>Valor</th>
                                                                    <th>Subtotal</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="solid-tab3">
                                                    
                                                    <div class="row">

                                                        <div class="col-lg-12 col-sm-12 col-12">
                                                            <div class="card">
                                                                <div class="card-header">
                                                                    <h5 class="card-title">Escolha um anexo para a OS</h5>
                                                                </div>
                                                                <div class="card-body">
                                                                    <div class="custom-file-container" data-upload-id="myFirstImage">
                                                                        <a class="btn btn-info float-sm-end m-l-10" id="add_new" onclick="InserirAnexoOs()">Add imagem</a>
                                                                        <a href="javascript:void(0)" class="btn btn-danger float-sm-end m-l-10 custom-file-container__image-clear">Limpar imagem</a>
                                                                      
                                                                        <label class="custom-file-container__custom-file">
                                                                            <input type="file" id="imagem_os" class="custom-file-container__custom-file__custom-file-input" accept="image/*">
                                                                            <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                                                            <span class="custom-file-container__custom-file__custom-file-control"></span>
                                                                        </label>
                                                                        <div class="custom-file-container__image-preview"></div>
                                                                        

                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div id="anexos-container">teste</div>
                                                        <div id="anexos">teste</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </section>

                    </div>
                    <div class="row">
                    <div class="col-lg-12 col-sm-12 col-12">
							<div class="form-group">
								<label>Status</label>
								<select id="os_status_alt" class="select">
									<option value="1">Orçamento</option>
									<option value="2">Serviço agendado</option>
									<option value="3">Em andamento</option>
									<option value="4">Concluída</option>
								</select>
							</div>
						</div>
						
                        <div class="col-lg-12">
                            <a onclick="EditarOS('form_editar_os')" class="btn btn-submit me-2">Editar OS</a>
                            <a href="os.php" class="btn btn-cancel">Voltar</a>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>

    </div>
    </div>
    </div>


    <?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>

    <script src="../Template/assets/js/script.js"></script>
    <script src="../Resource/ajax/os-ajx.js"></script>
    <script src="../Resource/ajax/buscar_cep_ajx.js"></script>

    <script>
        Verify();
        DetalharOS();
        ClientesOs();
        RetornarProdutosOS();
        RetornarServicosOS();
    </script>


</body>