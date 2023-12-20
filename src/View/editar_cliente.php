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
					<h4>Editar Cliente</h4>
					<h6>edição de clientes</h6>
				</div>
			</div>
			<form id="form_cliente_edit">
				<div class="card">
					<div class="card-body">
						<div class="row">

							<div class="col-lg-4 col-sm-4 col-12">
								<div class="form-group">
									<input type="hidden" id="CliID">
									<label>Nome cliente</label>
									<input class="obg" type="text" id="CliNome">
								</div>
							</div>
							<div class="col-lg-4 col-sm-4 col-12">
								<div class="form-group">
									<label>Email</label>
									<input type="text" id="CliEmail">
								</div>
							</div>
							<div class="col-lg-2 col-sm-2 col-12">
								<div class="form-group">
									<label>Cpf</label>
									<input type="text" id="AlteracpfCnpj">
								</div>
							</div>
							<div class="col-lg-2 col-sm-2 col-12">
								<div class="form-group">
									<label>Data nascimento</label>
									<div class="input-groupicon">
										<input type="text" id="CliDtNasc" placeholder="DD-MM-YYYY" class="datetimepicker" >
										
									</div>
								</div>
							</div>
							<div class="col-lg-2 col-sm-2 col-12">
								<div class="form-group">
									<label>Cep</label>
									<input type="text" id="CliCep">
								</div>
							</div>
							<div class="col-lg-4 col-sm-4 col-12">
								<div class="form-group">
									<label>Rua</label>
									<input type="text" id="CliEndereco">
								</div>
							</div>
							<div class="col-lg-2 col-sm-2 col-12">
								<div class="form-group">
									<label>Numero</label>
									<input type="text" id="CliNumero">
								</div>
							</div>
							<div class="col-lg-4 col-sm-4 col-12">
								<div class="form-group">
									<label>Bairro</label>
									<input type="text" id="CliBairro">
								</div>
							</div>
							<div class="col-lg-4 col-sm-4 col-12">
								<div class="form-group">
									<label>Cidade</label>
									<input type="text" id="CliCidade">
								</div>
							</div>
							<div class="col-lg-4 col-sm-4 col-12">
								<div class="form-group">
									<label>Estado</label>
									<input type="text" id="CliEstado">
								</div>
							</div>
							<div class="col-lg-2 col-sm-2 col-12">
								<div class="form-group">
									<label>Telefone</label>
									<input type="text" id="CliTelefone">
								</div>
							</div>

							<div class="col-lg-2 col-sm-2 col-12">
								<div class="form-group" data-select2-id="8">
									<label>Status</label>
									<select id="CliStatus" class="select select2-hidden-accessible" data-select2-id="1" tabindex="-1" aria-hidden="true">
										<option value="1">Ativo</option>
										<option value="0">Inativo</option>
									</select>
								</div>
							</div>

							<div class="col-lg-12 col-sm-12 col-12">
								<div class="form-group">
									<label>Descrição</label>
									<textarea id="CliDescricao" class="form-control"></textarea>
								</div>
							</div>
							<div class="col-lg-12 col-sm-12 col-12">
								<a href="javascript:void(0);" onclick="return EditarCliente('form_cliente_edit')" class="btn btn-submit me-2">Editar</a>
								<a href="clientes.php" class="btn btn-cancel">Voltar</a>
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
	<script src="../Resource/ajax/cliente-ajx.js"></script>
	<script src="../Resource/ajax/buscar_cep_ajx.js"></script>

	<script>
		Verify();
		DetalharCliente();
	</script>


</body>