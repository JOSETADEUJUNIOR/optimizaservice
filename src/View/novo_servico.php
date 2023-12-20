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
			</div>
			<form id="form_servico">
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-lg-4 col-sm-6 col-12">
								<div class="form-group obg">
									<label>Nome Serviço</label>
									<input class="obg" id="nome_servico" type="text">
								</div>
							</div>
							<div class="col-lg-4 col-sm-6 col-12">
								<div class="form-group">
									<label>Valor</label>
									<input class="obg" id="valor_servico" type="text">
								</div>
							</div>
							
							<div class="col-lg-4 col-sm-6 col-12">
								<div class="form-group">
									<label> Status</label>
									<select id="status_servico" class="select">

										<option>Ativo</option>
										<option>Inativo</option>
									</select>
								</div>
							</div>
							<div class="col-lg-12">
								<div class="form-group">
									<label>Descrição</label>
									<textarea id="descricao_servico" class="form-control"></textarea>
								</div>
							</div>

							<div class="col-lg-12">
								<a href="javascript:void(0);" onclick="CadastrarServico('form_servico')" class="btn btn-submit me-2">Salvar</a>
								<a href="servico.php" class="btn btn-cancel">Cancelar</a>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	</div>


	<?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>

	<script src="../Template/assets/js/script.js"></script>
	<script src="../Resource/js/mensagem.js"></script>
	<script src="../Resource/ajax/servico-ajx.js"></script>
	<script src="../Resource/ajax/validarmenu-ajx.js"></script>
	<script>
		Verify();
		validarMenu();
	
	</script>


</body>