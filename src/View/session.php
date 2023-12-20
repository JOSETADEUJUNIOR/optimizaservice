
<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php';
use Src\_public\Util;
Util::IniciarSessao();
if ($_POST['token_data']) {
    $token = $_POST['token_data'];
    Util::CriarSession($token);
    echo 'criado';
}
?>
