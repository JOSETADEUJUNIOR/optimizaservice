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
                    <h4>Cadastro de usuario</h4>
                    <h6>Gerenciar usuários do sistema</h6>
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
                                        <img src="" alt="img" id="imgEmpresa">
                                        <div class="profileupload">
                                            <input type="file" id="imgInp">
                                            <a href="javascript:void(0);"><img src="../Template/assets/img/icons/edit-set.svg" alt="img"></a>
                                        </div>
                                    </div>
                                    <div class="profile-contentname">
                                        <h2 id="user"></h2>
                                        <h4>Alterar dados da empresa.</h4>
                                    </div>
                                </div>
                                <div class="ms-auto">
                                    <a onclick="AlterarImagemEmpresa('formEmpImagem')" class="btn btn-submit me-2">Salvar</a>
                                    <a href="javascript:void(0);" class="btn btn-cancel">Cancelar</a>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form id="form_emp_dados">
                        <div class="row">
                            <div class="col-lg-4 col-sm-4">
                                <div class="form-group">
                                    <label>Razão Social</label>
                                    <input type="hidden" id="EmpID">
                                    <input type="text" id="EmpRazao" placeholder="">
                                </div>
                            </div>

                            <div class="col-lg-4 col-sm-4">
                                <div class="form-group">
                                    <label>CNPJ</label>
                                    <input type="text" id="EmpCnpj" placeholder="e-mail">
                                </div>
                            </div>
                            <div class="col-lg-2 col-sm-2">
                                <div class="form-group obg">
                                    <label>Data Cadastro</label>
                                    <div class="input-groupicon">
                                    <input type="text" id="EmpDtCadastro" placeholder="DD-MM-YYYY" class="datetimepicker" >
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-sm-2">
                                <div class="form-group">
                                    <label>Data Vencimento</label>
                                    <div class="input-groupicon">
                                    <input type="text" id="EmpDtVencimento" placeholder="DD-MM-YYYY" class="datetimepicker">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-sm-2">
                                <div class="form-group">
                                    <label>Cep</label>
                                    <input type="text" id="cep" onblur="BuscarCep()" placeholder="cep">
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-6">
                                <div class="form-group">
                                    <label>Rua</label>
                                    <input type="text" id="rua" placeholder="rua">
                                </div>
                            </div>
                            <div class="col-lg-2 col-sm-2">
                                <div class="form-group">
                                    <label>Numero</label>
                                    <input type="text" id="numero" placeholder="">
                                </div>
                            </div>
                            <div class="col-lg-2 col-sm-2">
                                <div class="form-group">
                                    <label>Cidade</label>
                                    <input type="text" id="cidade" placeholder="">
                                </div>
                            </div>
                            
                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label>Plano</label>
                                    <select id="EmpPlano" class="select" aria-hidden="true">
                                        <option value="1">1 mês</option>
                                        <option value="2">3 meses</option>
                                        <option value="3">1 ano</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-12 col-12">
                            <div class="form-group">
                                <label>Status</label>
                                <select id="EmpStatus" class="select" aria-hidden="true">
                                    <option value="1">Ativa</option>
                                    <option value="0">Inativa</option>
                                   
                                </select>
                            </div>
                        </div>


                            <div class="col-12">
                                <a onclick="return AlterarEmpresa('form_meusdados')" class="btn btn-submit me-2">Gravar</a>
                                <a href="javascript:void(0);" class="btn btn-cancel">Cancel</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
    </div>


    <?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>

    <script src="../Template/assets/js/script.js"></script>

    <script src="../Resource/ajax/empresa-ajx.js"></script>
    <script src="../Resource/ajax/buscar_cep_ajx.js"></script>

    <script>
        Verify();
        DetalharEmpresa();
    </script>


</body>