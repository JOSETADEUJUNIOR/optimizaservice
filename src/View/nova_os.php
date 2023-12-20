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
					<h4>Novo Ordem de serviço</h4>
					<h6>Criar ordem de serviço</h6>
				</div>
			</div>
			<div class="card">
				<div class="card-body">
					<form id="form_os_nova">
						<div class="row">
						<div class="col-lg-12 col-sm-12 col-12">
								<div class="form-group">
									<label>Escolha o tipo de serviço da ordem de serviço</label>

									<div class="input-groupicon">
										<select class="select" id="os_tp_servico">

										</select>
									</div>


								</div>
							</div>
							<div class="col-lg-8 col-sm-8 col-12">
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
										<input id="os_tecnico" type="text" placeholder="Nome do técnico" class="">

									</div>
								</div>
							</div>
							<div class="col-lg-6 col-sm-6 col-12">
								<div class="form-group">
									<label>Data início</label>
									<div class="input-groupicon">
										<input id="os_data_inicio" type="datetime-local" class="form-control" pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}" placeholder="Escolha a data" required>
									</div>
								</div>
							</div>
							<div class="col-lg-6 col-sm-6 col-12">
								<div class="form-group">
									<label>Data entrega</label>
									<div class="input-groupicon">
										<input id="os_data_fim" type="datetime-local" class="form-control" pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}" placeholder="Escolha a data" required>
										
									</div>
								</div>
							</div>
							<div class="col-lg-12 col-sm-12 col-12">
								<div class="form-group">
									<label>Garantia</label>
									<div class="input-groupicon">
										<input id="os_garantia" type="text" placeholder="Tempo de garantia" class="">

									</div>
								</div>
							</div>
							<div class="col-lg-6 col-sm-6 col-12">
								<div class="form-group">
									<label>Descrição</label>
									<textarea id="os_descricao" class="form-control"></textarea>
								</div>
							</div>
							<div class="col-lg-6 col-sm-6 col-12">
								<div class="form-group">
									<label>Defeito</label>
									<textarea id="os_defeito" class="form-control"></textarea>
								</div>
							</div>
							<div class="col-lg-6 col-sm-6 col-12">
								<div class="form-group">
									<label>Observação</label>
									<textarea id="os_obs" class="form-control"></textarea>
								</div>
							</div>
							<div class="col-lg-6 col-sm-6 col-12">
								<div class="form-group">
									<label>Laudo Técnico</label>
									<textarea id="os_laudo" class="form-control"></textarea>
								</div>
							</div>

						</div>
					</form>

					<div class="row">
						<div class="col-lg-12 col-sm-12 col-12">
							<div class="form-group">
								<label>Status</label>
								<select onchange="HabilitaAgendamento(this.value)" id="os_status" class="select">
									<option value="1">Orçamento</option>
									<option value="2">Serviço agendado</option>
									<option value="3">Em andamento</option>
									<option value="4">Concluída</option>
								</select>
							</div>
						</div>
						<div id="divOsAgendamento" class="col-lg-12 col-sm-12 col-12" style="display: none;">
							<div class="form-group">
								<label>Deseja incluir este serviço em sua agenda?</label>
								<select id="os_agenda" class="select">
									<option value="0">escolha.....</option>
									<option value="S">Sim agendar</option>
									<option value="N">Não agendar</option>
								</select>
							</div>
						</div>
						<div class="col-lg-12">
							<button onclick="CadastrarOS('form_os_nova')" class="btn btn-submit me-2">Submit</button>
							<a href="os.php" class="btn btn-cancel">Cancel</a>
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
	<script src="../Resource/ajax/os-ajx.js"></script>
	<script src="../Resource/ajax/buscar_cep_ajx.js"></script>

	<script>
		Verify();
		ClientesOs();
		TpServicosOS();
	</script>


</body>