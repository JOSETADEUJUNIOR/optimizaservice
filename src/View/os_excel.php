<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Src\_public\Util;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

  
 // Criar uma nova instância do PhpSpreadsheet
$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
if (isset($_POST['desc_filtro']) && isset($_POST['dados'])) {
    $desc_filtro = $_POST['desc_filtro'];
    $dados = json_decode($_POST['dados'], true);
// Preencher os cabeçalhos da planilha
$sheet->setCellValue('A1', 'Data da os');
$sheet->setCellValue('B1', 'Cliente');
$sheet->setCellValue('C1', 'Total');
$sheet->setCellValue('D1', 'Valor Pago');
$sheet->setCellValue('E1', 'Desconto');
$sheet->setCellValue('F1', 'Valor Devido');
$sheet->setCellValue('G1', 'Status');
$sheet->setCellValue('H1', 'Valor Total');

// Inicializar a variável para o total geral
$totalGeral = 0.00;
// Preencher os dados
$row = 2;
foreach ($dados as $registro) {
    $sheet->setCellValue('A' . $row, Util::ExibirDataBr($registro['OsDtInicial']));
    $sheet->setCellValue('B' . $row, $registro['nomeCliente']);
    $sheet->setCellValue('C' . $row, number_format($registro['OsValorTotal'], 2, ',', '.'));
    $sheet->setCellValue('D' . $row, number_format($registro['OsValorPago'], 2, ',', '.'));
    $sheet->setCellValue('E' . $row, number_format($registro['OsDesconto'], 2, ',', '.'));
    $sheet->setCellValue('F' . $row, number_format($registro['OsValorDevido'], 2, ',', '.'));
    $sheet->setCellValue('G' . $row, $registro['OsStatus']);
    // Formatando o campo de valor com R$
    $cellValue = number_format($registro['OsValorTotal'], 2, ',', '.');
    $sheet->setCellValue('H' . $row, 'R$ ' . $cellValue);
    
     
    // Somando ao total geral
    $totalGeral += $registro['OsValorTotal'];

    $row++;
}

// Auto dimensionar o tamanho das colunas
foreach (range('A', 'H') as $col) {
    $sheet->getColumnDimension($col)->setAutoSize(true);
}


$sheet->getStyle('A1:H1')->applyFromArray([
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
$sheet->getStyle('A2:H' . $lastRow)->applyFromArray([
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


$sheet->setCellValue('G' . $row, 'Total Geral:');
$sheet->setCellValue('H' . $row, 'R$ ' . number_format($totalGeral, 2, ',', '.'));
// Aplicar estilo de negrito à célula do total geral
$sheet->getStyle('G' . $row . ':H' . $row)->applyFromArray([
    'font' => [
        'bold' => true,
    ],
]);

}else{
    echo "dados invalidos";
} ?>
<?php 
// Criar um escritor para formato XLSX
$writer = new Xlsx($spreadsheet);

// Definir o cabeçalho para o download do Excel
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="relatorio_categoria.xlsx"');
header('Cache-Control: max-age=0');

// Enviar a saída do escritor para o navegador
$writer->save('php://output');
