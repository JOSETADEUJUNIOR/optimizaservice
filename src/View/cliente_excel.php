<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

  
 // Criar uma nova instância do PhpSpreadsheet
$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
if (isset($_POST['desc_filtro']) && isset($_POST['dados'])) {
    $desc_filtro = $_POST['desc_filtro'];
    $dados = json_decode($_POST['dados'], true);
// Preencher os cabeçalhos da planilha
$sheet->setCellValue('A1', 'Nome Cliente');
$sheet->setCellValue('B1', 'Telefone');
$sheet->setCellValue('C1', 'e-mail');
$sheet->setCellValue('D1', 'Cidade');

// Inicializar a variável para o total geral
$totalGeral = 0.00;
// Preencher os dados
$row = 2;
foreach ($dados as $registro) {
    $sheet->setCellValue('A' . $row, $registro['CliNome']);
    $sheet->setCellValue('B' . $row, $registro['CliTelefone']);
    $sheet->setCellValue('C' . $row, $registro['CliEmail']);
    $sheet->setCellValue('D' . $row, $registro['CliCidade']);
   
  

    $row++;
}

// Auto dimensionar o tamanho das colunas
foreach (range('A', 'G') as $col) {
    $sheet->getColumnDimension($col)->setAutoSize(true);
}


$sheet->getStyle('A1:D1')->applyFromArray([
    'font' => [
        'name' => 'Calibri',
        'size' => 11,
        'color' => ['rgb' => 'FFFFFF'],
    ],
    'fill' => [
        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
        'startColor' => ['rgb' => '0000FF'],
    ],
    'borders' => [
        'allBorders' => [
            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
            'color' => ['rgb' => '000000'],
        ],
    ],
]);

// Adicionar bordas às células preenchidas
$lastRow = $row - 1;
$sheet->getStyle('A2:D' . $lastRow)->applyFromArray([
    'font' => [
        'name' => 'Calibri',
        'size' => 11,
    ],
    'borders' => [
        'allBorders' => [
            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
            'color' => ['rgb' => '000000'],
        ],
    ],
]);

// Inserir a linha com o total geral
$row++;



}else{
    echo "dados invalidos";
} ?>
<?php 
// Criar um escritor para formato XLSX
$writer = new Xlsx($spreadsheet);

// Definir o cabeçalho para o download do Excel
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="relatorio_lote.xlsx"');
header('Cache-Control: max-age=0');

// Enviar a saída do escritor para o navegador
$writer->save('php://output');
