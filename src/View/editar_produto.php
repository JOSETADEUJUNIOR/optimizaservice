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
					<h4>Editar produtos</h4>
					<h6>Edição de produto</h6>
				</div>
			</div>

			<div class="card">
				<div class="card-body">
				<div class="row">
							<div class="col-lg-12 col-sm-12 col-12">
								<div class="form-group obg">
									<label>Codigo de barras</label>
									<input class="obg" id="cod_barra_alt" type="text">
								</div>
							</div>
							<div class="col-lg-4 col-sm-6 col-12">
								<div class="form-group obg">
									<input type="hidden" id="ProdID">
									<label>Nome Produto</label>
									<input class="obg" id="nome_produto_alt" type="text">
								</div>
							</div>
							<div class="col-lg-4 col-sm-6 col-12">
								<div class="form-group">
									<label>Categoria</label>
									<select class="select" id="categoria_id_alt">

									</select>
								</div>
							</div>
							<div class="col-lg-4 col-sm-6 col-12">
								<div class="form-group">
									<label>SKU</label>
									<input id="sku_alt" type="text">
								</div>
							</div>
							<div class="col-lg-2 col-sm-6 col-12">
								<div class="form-group obg">
									<label>Quantidade Mínima</label>
									<input class="obg" id="qtd_minima_alt" type="text">
								</div>
							</div>
							<div class="col-lg-2 col-sm-6 col-12">
								<div class="form-group">
									<label>Quantidade</label>
									<input class="obg" id="qtd" type="text">
								</div>
							</div>
							<div class="col-lg-3 col-sm-6 col-12">
								<div class="form-group">
									<label>Valor Compra</label>
									<input class="obg" id="valor_compra" type="text">
								</div>
							</div>
							<div class="col-lg-3 col-sm-6 col-12">
								<div class="form-group">
									<label>Valor Venda</label>
									<input class="obg" id="valor_venda" type="text">
								</div>
							</div>
							<div class="col-lg-2 col-sm-6 col-12">
								<div class="form-group">
									<label> Status</label>
									<select id="status" class="select">

										<option>Ativo</option>
										<option>Inativo</option>
									</select>
								</div>
							</div>
							<div class="col-lg-12">
								<div class="form-group">
									<label>Descrição</label>
									<textarea id="prod_comentario" class="form-control"></textarea>
								</div>
							</div>


							<div class="col-lg-12">
								<div class="form-group">
									<label>Imagem</label>
									<div class="image-upload">
										<input type="file" id="imgProd">
										<div class="image-uploads">
											<img src="../Template/assets/img/icons/upload.svg" alt="img">
											<h4>Escolha um arquivo para upload</h4>
										</div>
									</div>
								</div>
							</div>
							<div class="productviews">
								<div class="productviewsimg">
									<img id="alt_imagemProduto" alt="img" width="150" height="150">
								</div>
								<div class="productviewscontent">
									<div class="productviewsname">
										<h2 id="nomeProdImg"></h2>
										
									</div>

								</div>
							</div>
							<div class="col-lg-12">
								<a href="javascript:void(0);" onclick="EditarProduto('form_produto')" class="btn btn-submit me-2">Salvar</a>
								<a href="produto.php" class="btn btn-cancel">Cancelar</a>
							</div>
							
						</div>
				</div>
			</div>
			
		</div>
	</div>
	</div>


	<?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>

	<script src="../Template/assets/js/script.js"></script>
	<script src="../Resource/ajax/produto-ajx.js"></script>
	<script>
		Verify();
		validarMenu();
		DetalharProduto();
		CarregarCategoriasProd(); 
	</script>

</body>