<?php


require_once dirname(__DIR__, 3) . '/vendor/autoload.php';

?>
<div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll">
        <div id="sidebar-menu" class="sidebar-menu">
            <ul>
                <li data-role="Administrador">
                    <a href="index.php"><img src="../Template/assets/img/icons/dashboard.svg" alt="img"><span> Dashboard</span> </a>
                </li>
                <li class="submenu" data-role="Funcionario">
                    <a href="javascript:void(0);"><img src="../Template/assets/img/icons/users1.svg" alt="img"><span> Clientes</span> <span class="menu-arrow"></span></a>
                    <ul>
                        <li><a href="clientes.php">Lista de clientes</a></li>
                        <li><a href="novo_cliente.php">Novo cliente</a></li>
                        <li><a href="clientes.php">Compras dos clientes</a></li>
                    </ul>
                </li>
                <li class="submenu" data-role="Funcionario">
                    <a href="javascript:void(0);"><img src="../Template/assets/img/icons/product.svg" alt="img"><span> Produtos/Serviços</span> <span class="menu-arrow"></span></a>
                    <ul>
                        <li><a href="categoria.php">Categorias</a></li>
                        <li><a href="subcategoria.php">Sub-categorias</a></li>
                        <li><a href="marca.php">Marcas</a></li>
                        <!-- <li><a href="subaddcategory.html">Add Sub Category</a></li> -->
                        <!-- <li><a href="addcategory.html">Add Category</a></li> -->
                        <li><a href="produto.php">Produtos</a></li>
                        <li><a href="servico.php">Serviços</a></li>
                        <li><a href="fornecedor.php">Forncedores</a></li>
                        <li><a href="cotacao.php">Cotação</a></li>
                        <li><a href="pedido_compra.php">Pedido de Compra</a></li>
                        <li><a href="estoque .php">Gestão de estoque</a></li>
                        <!-- <li><a href="addproduct.html">Add Product</a></li> -->
                        <!-- <li><a href="addbrand.html">Add Brand</a></li> -->
                        <li><a href="cod_barra.php">Impressão de etiquetas</a></li>
                    </ul>
                </li>
                <li class="submenu" data-role="Funcionario">
                    <a href="javascript:void(0);"><img src="../Template/assets/img/icons/tools.png" alt="img"><span> Ordem de Serviço</span> <span class="menu-arrow"></span></a>
                    <ul>
                        <li><a href="os.php">Ordem de serviços</a></li>
                        <li><a href="nova_os.php">Nova Ordem de Serviço</a></li>
                        <li><a href="agenda.php">Agenda de Serviços</a></li>

                    </ul>
                </li>
                <li class="submenu" data-role="Funcionario">
                    <a href="javascript:void(0);"><img src="../Template/assets/img/icons/sales1.svg" alt="img"><span> Vendas</span> <span class="menu-arrow"></span></a>
                    <ul>
                        <li><a href="vendas.php">Vendas realizadas</a></li>
                        <li><a href="pdv.php">PDV</a></li>
                        <li><a href="nova_venda.php">Nova venda</a></li>
                        <li><a href="devolucao_venda.php">Vendas estornadas</a></li>
                    </ul>
                </li>
                <li class="submenu" data-role="Administrador">
                    <a href="javascript:void(0);"><img src="../Template/assets/img/icons/dollar.svg" alt="img"><span> Financeiro</span> <span class="menu-arrow"></span></a>
                    <ul>
                        <li><a href="despesa.php">Cadastro de Bancos</a></li>
                        <li><a href="despesa.php">Cadastro de despesas</a></li>
                        <li><a href="nova_despesa.php">Contas a Pagar</a></li>
                        <li><a href="receita.php">Cadastro de receita</a></li>
                        <li><a href="nova_receita.php">Contas a receber</a></li>
                        <li><a href="fluxo_caixa.php">Fluxo de caixa</a></li>

                    </ul>

                </li>
                <li class="submenu" data-role="Funcionario">
                    <a href="javascript:void(0);"><img src="../Template/assets/img/icons/users1.svg" alt="img"><span> Relatórios</span> <span class="menu-arrow"></span></a>
                    <ul>
                        <li><a href="fornecedores.php">Vendas diárias, mensais e anuais</a></li>
                        <li><a href="novo_cliente.php">Relatórios de produtos mais vendidos</a></li>
                        <li><a href="clientes.php">Relatório de compra</a></li>

                    </ul>
                </li>
                <li class="submenu" style="display:none" data-role="Administrador">
                    <a href="javascript:void(0);"><img src="../Template/assets/img/icons/users1.svg" alt="img"><span> Configurações</span> <span class="menu-arrow"></span></a>
                    <ul>
                        <li><a href="fornecedores.php">Configurações gerais</a></li>
                        <li><a href="usuarios.php">Configurações de usuários</a></li>
                        <li><a href="novo_cliente.php">Configurações de e-mail</a></li>
                        <li><a href="clientes.php">Configuração de pagamento</a></li>

                    </ul>
                </li>
                <li class="submenu" >
                    <a href="javascript:void(0);"><img src="../Template/assets/img/icons/users1.svg" alt="img"><span> Admin</span> <span class="menu-arrow"></span></a>
                    <ul>
                        <li><a href="empresas.php">Empresas</a></li>
                        <li><a href="usuarios.php">Configurações de usuários</a></li>
                        <li><a href="novo_cliente.php">Configurações de e-mail</a></li>
                        <li><a href="clientes.php">Configuração de pagamento</a></li>

                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
