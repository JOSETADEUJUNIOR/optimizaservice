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
					<h4>Cadastro de marca</h4>
					<h6>Criar nova marca de produto</h6>
				</div>
			</div>

			<div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-3 col-sm-6 col-12">
                                <div class="form-group">
                                    <label>Nome da marca</label>
                                    <input type="text">
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Descrição</label>
                                    <textarea class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label> Imagem</label>
                                    <div class="image-upload">
                                        <input type="file">
                                        <div class="image-uploads">
                                            <img src="../Template/assets/img/icons/upload.svg" alt="img">
                                            <h4><?= TEXTO_PARA_IMAGEM?></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <a href="javascript:void(0);" class="btn btn-submit me-2">Salvar</a>
                                <a href="marca.php" class="btn btn-cancel">Cancelar</a>
                            </div>
                        </div>
                    </div>
                </div>

		</div>
	</div>
	</div>


	<?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>

	<script src="../Template/assets/js/script.js"></script>


</body>