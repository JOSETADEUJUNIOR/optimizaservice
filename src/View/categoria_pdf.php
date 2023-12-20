<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Dompdf\Dompdf;
use Dompdf\Options;

    // Resto do código do seu relatório aqui...
    $options = new Options();
    $html = "";
    
    // Inicia o buffer de saída
    $img = "";
    ob_start();
    if (isset($_POST['desc_filtro']) && isset($_POST['dados'])) {
        $desc_filtro = $_POST['desc_filtro'];
        $dados = json_decode($_POST['dados'], true);

?>
   <style>
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            border: 1px solid black;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #dddddd;
        }
        span{
            font-size: 12px;
        }
    </style>
    <html>

    <body>

        <table style="width:100%">
            <tr>
               
                <th colspan="4">
                    <p>Nome empresa:<span>teste</span></p>
                    <p>Empresa CNPJ:<span>teste</span></p>
                    <p>Empresa Endereço:<span>teste</span></p>
                </th>
            </tr>
           

            <tr>
                <td><strong>Nome Categoria</strong></td>
                <td><strong>Código</strong></td>
                <td><strong>Descrição</strong></td>
                <td><strong>Status</strong></td>
              
            </tr>
            <?php $servicoZ = 0; $valorTotal=0; ?>
           <?php
            foreach ($dados as $registro) {$servicoZ++; ?>
                <tr>
                    <td><?= $registro['nome_categoria'] ?></td>
                    <td><?= $registro['cod'] ?></td>
                    <td><?= $registro['descricao_categoria'] ?></td>
                    <td><?= $registro['status'] ?></td>
                   
                </tr>
            <?php } ?>

        </table>
       <!-- Rodapé do relatório -->

<p style="font-size:12px" align="right">Total de Registros: <?= $servicoZ ?></p>



    </body>

    </html>
<?php }else{
    echo "dados invalidos";
} ?>
<?php
    // Captura a saída do HTML
    echo $html;
    $html = ob_get_clean();
    $dompdf = new Dompdf();
    // definir as opções
    $dompdf->setOptions($options);
    $dompdf->loadHtml($html);
    // (Optional) Setup the paper size and orientation
    $dompdf->setPaper('A4');
    // Define o tipo de conteúdo como PDF
    header("Content-Type: application/pdf");
    // Define o cabeçalho para exibir o PDF no navegador
    header("Content-Disposition: inline; filename=nome_do_arquivo.pdf");
    // Render the HTML as PDF
    $dompdf->render();
    // Output the generated PDF to Browser
    echo $dompdf->output();
    // $data = Util::DataHoraAtualPDF();
    // $dompdf = new Dompdf();
    // $html = ob_get_clean();
    // $dompdf->loadHtml($html);
    // $dompdf->setPaper('A4');
    // $dompdf->render();
    // $dompdf->stream('documento_' . $data . '.pdf');

