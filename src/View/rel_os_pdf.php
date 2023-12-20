<?php
require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Src\_public\Util;
use Dompdf\Dompdf;
use Dompdf\Options;

$options = new Options();




$dompdf = new Dompdf($options);
$html = "";

ob_start();

if (isset($_POST['desc_filtro']) && isset($_POST['dados'])) {
  session_start();
  $desc_filtro = $_POST['desc_filtro'];
  $dados = json_decode($_POST['dados'], true);
  $servico = json_decode($dados['servicos'], true);
  $produto = json_decode($dados['produtos'], true);
  // Recupera os dados específicos da empresa
  $empresa_nome = $_SESSION['empresa_nome'];
  $cnpj_empresa = $_SESSION['empresa_cnpj'];
  $endereco_empresa = $_SESSION['empresa_endereco'];

  // Recupera os dados específicos do cliente
  $cpf_cnpj_cliente = $dados['CliCpfCnpj'];
  $nome_cliente = $dados['CliNome'];
  $telefone_cliente = $dados['CliTelefone'];
  $email_cliente = $dados['CliEmail'];
  $endereco_cliente = $dados['CliEndereco'];

  // Recupera os dados do laudo técnico
  $data_entrada = $dados['OsDtInicial'];
  $data_saida = $dados['OsDtFinal'];
  $ordem = $dados['OsID'];
  $data_laudo = $dados['OsDtFinal'];
  $tecnico_laudo = $dados['OsTecID'];
  $descricao_laudo = $dados['OsLaudoTec'];
  // Inicia o buffer de saída
 
  // Início do HTML
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
  </style>
  <body>

    <table style="width:100%">
        <th colspan="1"><img src="http://localhost/optimizaserviceapi/src/Resource/arquivos/emp/652d73542557b.png">

        </th>
        <th colspan="6">
          <p><?= $empresa_nome ?></p>
          <p><?= $cnpj_empresa ?></p>
          <p><?= $endereco_empresa ?></p>
        </th>
      </tr>
      <tr>
        <td style="text-align: center;" colspan="7">
          <center><strong>Dados do cliente</strong></center>
        </td>
      </tr>
      <tr>
        <th colspan="7">
          <h4>Nome do cliente: <?= $nome_cliente ?></p>
          <h4>Telefone do cliente: <?= $telefone_cliente ?></h4>
          <h4>E-mail cliente: <?= $email_cliente ?></h4>
          <h4>Endereço do cliente: <?= $endereco_cliente ?></h4>
        </th>
      </tr>
      <tr>
        <td style="text-align: center;" colspan="7">
          <center><strong>Serviços da ordem</strong></center>
        </td>
      </tr>
      <tr>
        <td colspan="4"><strong>Serviço</strong></td>
        <td><strong>Quantidade</strong></td>
        <td><strong>Valor unit</strong></td>
        <td><strong>Valor total</strong></td>
      </tr>
      <?php $servicoZ = 0;
      $totalGeralServicos = 0;
      $totalGeralProdutos = 0;
      if (is_array($servico) && count($servico)>0) {
      for ($i = 0; $i < count($servico); $i++) {
        $servicoZ++;
        $totalGeralServicos += $servico[$i]['SubTotal'];
        $valorUnit = $servico[$i]['SubTotal'] / $servico[$i]['Qtd'];
      ?>
        <tr>
          <td colspan="4">
            <?= $servico[$i]['Descricao'] ?>
          </td>
          <td>
            <?= $servico[$i]['Qtd'] ?>
          </td>
          <td>
            <?= number_format($valorUnit, 2, ',', '.') ?>
          </td>
          <td>
            <?= number_format($servico[$i]['SubTotal'], 2, ',', ',') ?>
          </td>
        </tr>
       
      <?php } }else{ ?>
       <tr >
       <td colspan="7">Não há serviços a serem exibidos</td>
     </tr>
     <?php } ?>
      <tr>
          <td colspan="6"><strong>Total Geral de Serviços</strong></td>

          <td><strong><?= number_format($totalGeralServicos, 2, ',', '.') ?></strong></td>
        </tr>
      <tr>
        <td style="text-align: center;" colspan="7">
          <center><strong>Produtos utilizados</strong></center>
        </td>
      </tr>
      <tr>
        <td colspan="4"><strong>Produto</strong></td>
        <td><strong>Quantidade</strong></td>
        <td><strong>Valor unit</strong></td>
        <td><strong>Valor total</strong></td>
      </tr>

      <?php $servicoZ = 0;
       if (is_array($produto) && count($produto)>0) {
      for ($i = 0; $i < count($produto); $i++) {
        $servicoZ++;
        $totalGeralProdutos += $produto[$i]['SubTotal'];
        $valorUnitPrd = $servico[$i]['SubTotal'] / $servico[$i]['Qtd']; ?>
        <tr>
          <td colspan="4">
            <?= $produto[$i]['Descricao'] ?>
          </td>
          <td>
            <?= $produto[$i]['Qtd'] ?>
          </td>
          <td>
            <?= number_format($valorUnitPrd, 2, ',', '.') ?>
          </td>
          <td>
            <?= number_format($produto[$i]['SubTotal'], 2, ',', '.') ?>
          </td>

        </tr>
        <tr>
          <td colspan="6"><strong>Total Geral de Produtos</strong></td>
          <td><strong><?= number_format($totalGeralProdutos, 2, ',', '.') ?></strong></td>
        </tr>

      <?php }}else{ ?>
        <tr >
          <td colspan="7">Não há produtos a serem exibidos</td>
        </tr>
        
      <?php } ?>

      <?php
      $totalOS = $totalGeralServicos + $totalGeralProdutos;
      ?>
      <!-- Seção para Laudo Técnico, Observações e Descrição -->
      <tr>
        <td style="text-align: center;" colspan="7">
          <center><strong>Laudo Técnico, Observações e Descrição</strong></center>
        </td>
      </tr>
      <tr>
        <td colspan="7">
          <strong>Laudo Técnico:</strong> <?= @$descricao_laudo ?>
        </td>
      </tr>
      <tr>
        <td colspan="7">
          <strong>Observações:</strong> <?= @$observacao_cliente ?>
        </td>
      </tr>
      <tr>
        <td colspan="7">
          <strong>Descrição:</strong> <?= @$descricao_laudo ?>
        </td>
      </tr>
      <tr>
        <td style="text-align: center;" colspan="7">
          <center><strong>Total geral da Ordem de serviço</strong></center>
        </td>
      </tr>
      <tr>
        <td colspan="6"><strong>Total da OS</strong></td>

        <td><strong><?= number_format($totalOS, 2, ',', '.') ?></strong></td>
      </tr>
    </table>
  </body>

<?php
} else {
  echo "dados inválidos";
}

$html = ob_get_clean();
$dompdf = new Dompdf();
$dompdf->setOptions($options);
$dompdf->loadHtml($html);
$dompdf->setPaper('A4');
header("Content-Type: application/pdf");
header("Content-Disposition: inline; filename=relatorio_os.pdf");
$dompdf->render();
echo $dompdf->output();
?>