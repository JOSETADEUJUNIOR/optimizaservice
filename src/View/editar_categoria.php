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
					<h4>Cadastro de categoria</h4>
					<h6>Criar nova categoria de produto</h6>
				</div>
			</div>
			<form id="form_categoria">
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-lg-6 col-sm-6 col-12">
								<div class="form-group obg">
									<label>Nome da categoria</label>
									<input type="hidden" id="categoria_id">
									<input type="hidden" id="imagem_id">
									<input type="text" id="alt_nome_categoria">
								</div>
							</div>
							<div class="col-lg-6 col-sm-6 col-12">
								<div class="form-group obg">
									<label>Código</label>
									<input type="text" id="alt_cod_categoria">
								</div>
							</div>
							<div class="col-lg-12">
								<div class="form-group">
									<label>Descrição</label>
									<textarea id="alt_descricao_categoria" class="form-control"></textarea>
								</div>
							</div>
							<div class="col-lg-12">
								<div class="form-group">
									<label> Imagem da categoria</label>
									<div class="image-upload obg">
										<input type="file" id="alt_imgCategoria">
										<div class="image-uploads">
											<img src="../Template/assets/img/icons/upload.svg" alt="img">
											<h4><?= TEXTO_PARA_IMAGEM ?></h4>
										</div>
									</div>
								</div>
							</div>
							<div class="productviews">
								<div class="productviewsimg">
									<img id="alt_imagemCategoria" alt="img" width="150" height="150">
								</div>
								<div class="productviewscontent">
									<div class="productviewsname">
										<h2 id="nomeCatImg"></h2>
										
									</div>

								</div>
							</div>
							<div class="col-lg-12">
								<a href="javascript:void(0);" onclick="return EditarCategoria('form_categoria')" class="btn btn-submit me-2">Salvar</a>
								<a href="categoria.php" class="btn btn-cancel">Cancelar</a>
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
	<script src="../Resource/ajax/categoria-ajx.js"></script>
	<script>
		Verify();
		validarMenu();
		DetalharCategoria();
	</script>

</body>