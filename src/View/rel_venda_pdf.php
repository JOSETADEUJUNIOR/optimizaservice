<?php
require_once dirname(__DIR__, 2) . '/vendor/autoload.php';
session_start();
use Src\_public\Util;
use Dompdf\Dompdf;
use Dompdf\Options;

$options = new Options();
$html = "";

ob_start();
if (isset($_POST['desc_filtro']) && isset($_POST['dados'])) {
    $desc_filtro = $_POST['desc_filtro'];
    $dados = json_decode($_POST['dados'], true);
    var_dump($_SESSION);
    $produtos = json_decode($dados['produtos'], true);

    // Recupera os dados específicos da empresa
    $empresa_nome = $_SESSION['empresa_nome'];
    $cnpj_empresa = $dados['CliCpfCnpj'];
    $endereco_empresa =  $_SESSION['empresa_endereco'];

    // Recupera os dados específicos do cliente
    $cpf_cnpj_cliente = $dados['CliCpfCnpj'];
    $nome_cliente = $dados['CliNome'];
    $observacao_cliente = $dados['CliDescricao'];

    $valorTotalProdutos = 0;

    // Início do HTML
?>

    <head>
        <style>
            /* Cores e Estilos Gerais */
            .color-gray {
                color: #BCBCBC;
            }

            .text-center {
                text-align: center;
            }

            .text-uppercase {
                text-transform: uppercase;
            }

            /* Estilos do Cupom Fiscal */
            .printer-ticket {
                display: table !important;
                width: 30%;
                max-width: 50px;
                font-family: Tahoma, Geneva, sans-serif;
                font-size: 10px;
                font-weight: light;
                line-height: 1.3em;
            }

            .printer-ticket th:nth-child(2),
            .printer-ticket td:nth-child(2) {
                width: 20px;
            }

            .printer-ticket th:nth-child(3),
            .printer-ticket td:nth-child(3) {
                width: 90px;
                text-align: right;
            }

            .printer-ticket th {
                font-weight: inherit;
                padding: 10px 0;
                /* Substitua pelo valor desejado */
                text-align: center;
                border-bottom: 1px dashed #BCBCBC;
            }

            .printer-ticket tbody tr:last-child td {
                padding-bottom: 10px;
                /* Substitua pelo valor desejado */
            }

            .printer-ticket tfoot .sup td {
                padding: 10px 0;
                /* Substitua pelo valor desejado */
                border-top: 1px dashed #BCBCBC;
            }

            .printer-ticket tfoot .sup.p--0 td {
                padding-bottom: 0;
            }

            .printer-ticket .title {
                font-size: 1.5em;
                padding: 15px 0;
                /* Substitua pelo valor desejado */
            }

            .printer-ticket .top td {
                padding-top: 10px;
                /* Substitua pelo valor desejado */
            }

            .printer-ticket .last td {
                padding-bottom: 10px;
                /* Substitua pelo valor desejado */
            }
        </style>
    </head>

    <body>
        <table class="printer-ticket">
            <thead>
                <tr>
                    <th class="title" colspan="3"><?= $empresa_nome. '<br>'.'<small>'.$endereco_empresa.'<small>' ?></th>
                </tr>
                <tr>
                    <th colspan="3"><?= date('d/m/Y - H:i:s') ?></th>
                </tr>
                <tr>
                    <th colspan="3">
                        <?= $nome_cliente ?><br />
                        <?= $cpf_cnpj_cliente ?>
                    </th>
                </tr>
                <tr>
                    <th class="ttu" colspan="3">
                        <b>Cupom NÃO FISCAL</b>
                    </th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($produtos as $prod) : ?>
                    <tr class="top">
                        <td colspan="3"><?= $prod['Descricao'] ?></td>
                    </tr>
                    <tr>
                        <td>R$<?= number_format($prod['SubTotal'], 2, ',', '.') ?></td>
                        <td><?= $prod['Qtd'] ?></td>
                        <td>R$<?= number_format($prod['SubTotal'], 2, ',', '.') ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
            <tfoot>
                <tr class="sup ttu p--0">
                    <td colspan="3">
                        <b>Totais</b>
                    </td>
                </tr>
                <tr class="ttu">
                    <td colspan="2">Sub-total</td>
                    <td align="right">R$<?= number_format($valorTotalProdutos, 2, ',', '.') ?></td>
                </tr>
                <tr class="ttu">
                    <td colspan="2">Taxa de entrega</td>
                    <td align="right">R$<?= $dados['VendaValorEntrega'] ?></td>
                </tr>
                <tr class="ttu">
                    <td colspan="2">Desconto</td>
                    <td align="right">R$<?= $dados['VendaDesconto'] ?></td>
                </tr>
                <tr class="ttu">
                    <td colspan="2">Total</td>
                    <td align="right">R$<?= number_format($dados['VendaValorTotal'], 2, ',', '.') ?></td>
                </tr>
                <tr class="sup ttu p--0">
                    <td colspan="3">
                        <b>Pagamentos</b>
                    </td>
                </tr>
                <!-- <?php foreach ($dados['Pagamentos'] as $pagamento) : ?>
                 -->    <tr class="ttu">
                        <td colspan="2"><?= $pagamento['Tipo'] ?></td>
                        <td align="right">R$<?= number_format($dados['VendaValorPago'], 2, ',', '.') ?></td>
                    </tr>
                <!-- <?php endforeach; ?>
                 --><tr class="ttu">
                    <td colspan="2">Total pago</td>
                    <td align="right">R$<?= number_format($dados['VendaValorPago'], 2, ',', '.') ?></td>
                </tr>
                <tr class="ttu">
                    <td colspan="2">Troco</td>
                    <td align="right">R$<?= number_format($dados['VendaTroco'], 2, ',', '.') ?></td>
                </tr>
                <tr class="sup">
                    <td colspan="3" align="center">
                        <b>Pedido:</b>
                    </td>
                </tr>
                <tr class="sup">
                    <td colspan="3" align="center">
                        <?= $_SESSION['nome_empresa'] ?>
                    </td>
                </tr>
            </tfoot>
        </table>
    </body>

    </html>
<?php
} else {
    echo "dados inválidos";
}

$html = ob_get_clean();

$dompdf = new Dompdf($options);
$dompdf->loadHtml($html);
$dompdf->setPaper('A2', 'portrait');
$dompdf->render();

// Saída do PDF para o navegador
$dompdf->stream('cupom_venda.pdf', array('Attachment' => 0));
?>