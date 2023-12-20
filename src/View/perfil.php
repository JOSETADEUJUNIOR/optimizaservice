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
                        <h4>Perfil</h4>
                        <h6>Perfil do usuário</h6>
                    </div>
                </div>

                <div class="card">
                   
                    <div class="card-body">
                        <form id="formUserImagem">
                        <div class="profile-set">
                            <div class="profile-head">
                            </div>
                            <div class="profile-top">
                                <div class="profile-content">
                                    <div class="profile-contentimg">
                                        <img src="" alt="img" id="imgUser">
                                        <div class="profileupload">
                                            <input type="file" id="imgInp">
                                            <a href="javascript:void(0);"><img src="../Template/assets/img/icons/edit-set.svg"
                                                    alt="img"></a>
                                        </div>
                                    </div>
                                    <div class="profile-contentname">
                                    <input type="hidden" id="id_end">
                                        <h2 id="user"></h2>
                                        <h4>Alterar os dados do seu perfil.</h4>
                                    </div>
                                </div>
                                <div class="ms-auto">
                                    <a onclick="AlterarImagem('formUserImagem')"class="btn btn-submit me-2">Salvar</a>
                                    <a href="javascript:void(0);" class="btn btn-cancel">Cancelar</a>
                                </div>
                            </div>
                        </div>
                    </form>
                        <form id="form_meusdados">
                        <div class="row">
                            <div class="col-lg-6 col-sm-12">
                                <div class="form-group">
                                    <label>Nome</label>
                                    <input type="text" id="nome" placeholder="">
                                </div>
                            </div>
                            
                            <div class="col-lg-6 col-sm-12">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="text" id="email" placeholder="e-mail">
                                </div>
                            </div>
                             <div class="col-lg-6 col-sm-12">
                                <div class="form-group obg">
                                    <label>Empresa</label>
                                    <input type="text" id="empresa" placeholder="">
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-12">
                                <div class="form-group">
                                    <label>Telefone</label>
                                    <input type="text" id="telefone" placeholder="">
                                </div>
                            </div>
                            <div class="col-lg-2 col-sm-12">
                                <div class="form-group">
                                    <label>Cep</label>
                                    <input type="text" id="cep" onblur="BuscarCep()" placeholder="cep">
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-12">
                                <div class="form-group">
                                    <label>Rua</label>
                                    <input type="text" id="rua" placeholder="cep">
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-12">
                                <div class="form-group">
                                    <label>Bairro</label>
                                    <input type="text" id="bairro" placeholder="">
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-12">
                                <div class="form-group">
                                    <label>Cidade</label>
                                    <input type="text" id="cidade" placeholder="">
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-12">
                                <div class="form-group">
                                    <label>Estado</label>
                                    <input type="text" id="estado" placeholder="">
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-12">
                                <div class="form-group">
                                    <label>Password</label>
                                    <div class="pass-group">
                                        <input type="password" id="senha" class=" pass-input" autocomplete="new-password" autocomplete="off">
                                        <span class="fas toggle-password fa-eye-slash"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <a onclick="return AlterarMeusDados('form_meusdados')" class="btn btn-submit me-2">Gravar</a>
                                <a href="javascript:void(0);" class="btn btn-cancel">Cancel</a>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
    </div>


    <?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>

    <script src="../Template/assets/js/script.js"></script>
    <script src="../Resource/ajax/perfil-ajx.js"></script>
	<script src="../Resource/ajax/buscar_cep_ajx.js"></script>
	<script>
		Verify();
		CarregarMeusDados();
       
	</script>


</body>