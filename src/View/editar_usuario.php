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
					<h4>Editar usuário</h4>
					<h6>edição de usuarios</h6>
				</div>
			</div>
			<form id="form_cliente_edit">
				<div class="card">
					<div class="card-body">
					<div class="row">
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label>Nome do Usuário</label>
								<input type="hidden" id="userID">
								<input type="hidden" id="EndID">
                                <input id="nome" type="text">
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-12">
                            <div class="form-group">
                                <label>E-mail</label>
                                <input id="email" type="text">
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-12">
                            <div class="form-group">
                                <label>Telefone</label>
                                <input id="telefone" type="text">
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-12">
                            <div class="form-group">
                                <label>Cep</label>
                                <input id="cep" type="text">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label>Rua</label>
                                <input id="endereco" type="text">
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-12">
                            <div class="form-group">
                                <label>Bairro</label>
                                <input id="bairro" type="text">
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-12">
                            <div class="form-group">
                                <label>Cidade</label>
                                <input id="cidade" type="text">
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-12">
                            <div class="form-group">
                                <label>Estado</label>
                                <input id="estado" type="text">
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-12 col-12">
								<div class="form-group">
									<label>Permissão</label>
									<select id="tipo" class="select" aria-hidden="true">
										<option value="1">Administrador</option>
										<option value="2">Funcionário</option>
									</select>
								</div>
							</div>

                        <div class="col-lg-12">
                            <button onclick="return EditarUsuario()" class="btn btn-submit me-2">Editar</button>
                            <a href="usuarios.php" class="btn btn-cancel">Cancelar</a>
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
	<script src="../Resource/ajax/usuarios-ajx.js"></script>
	<script src="../Resource/ajax/buscar_cep_ajx.js"></script>

	<script>
		Verify();
		DetalharUsuario();
	</script>


</body>