

document.addEventListener("DOMContentLoaded", function () {
    const menuList = document.getElementById("menu-list");
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");
    const paymentInput = document.getElementById("payment-input");
    const change = document.getElementById("change");
    const desconto = document.getElementById("discount-input");
    const checkoutBtn = document.getElementById("checkout-btn");
    const payBtn = document.getElementById("pay-btn");
    const salesList = document.getElementById("sales-list");
    const valorEntrega = document.getElementById("valorEntrega");
    const totalSales = document.getElementById("total-sales");
    // Dentro do seu código existente...
    const clienteSelecionado = 1;
    // Dentro do seu código existente...
    const dataAtual = new Date();

    // Obtendo os componentes da data
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1; // O mês é baseado em zero, então adicionamos 1
    const dia = dataAtual.getDate();
    const hora = dataAtual.getHours();
    const minuto = dataAtual.getMinutes();
    const segundo = dataAtual.getSeconds();

    // Formatar a data como necessário (por exemplo: "2023-11-24 14:30:00")
    const dataVenda = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')} ${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}:${segundo.toString().padStart(2, '0')}`;


    let total = 0;
    let salesTotal = 0;
    let produtosPDV = []

    // Adicionar item ao carrinho
    menuList.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            const itemName = e.target.dataset.name;
            const itemPrice = parseFloat(e.target.dataset.price);

            produtosPDV.push({
                nome: itemName,
                preco: itemPrice,
            });
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
          <span class="item-name">${itemName}</span>
          <span class="item-price">R$${itemPrice.toFixed(2)}</span>
          <button class="remove-btn">Remover</button>
        `;
            cartList.appendChild(cartItem);

            total += itemPrice;
            totalPrice.textContent = `Total: R$${total.toFixed(2)}`;
        }
    });

    // Remover item do carrinho
    cartList.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-btn")) {
            const cartItem = e.target.parentNode;
            const itemPrice = parseFloat(
                cartItem.querySelector(".item-price").textContent.slice(2)
            );

            total -= itemPrice;
            totalPrice.textContent = `Total: R$${total.toFixed(2)}`;

            cartItem.remove();
        }
    });

    // Finalizar pedido
    checkoutBtn.addEventListener("click", function () {

        // Verificar se há produtos no carrinho antes de finalizar a venda
        if (produtosPDV.length === 0) {
            alert("Adicione produtos ao carrinho antes de finalizar a venda.");
            return;
        }
        paymentInput.value = "";
        change.textContent = "";
        paymentInput.focus();
        document.getElementById("payment-container").style.display = "block";
    });

    // Pagar
    payBtn.addEventListener("click", function () {
        const paymentAmount = parseFloat(paymentInput.value);
        const changeAmount = paymentAmount - total;

        if (changeAmount >= 0) {
            if (change) {
                change.textContent = `Troco: R$${changeAmount.toFixed(2)}`;
            } else {
                console.error("Elemento 'change' não encontrado.");
            }

            // Registrar venda
            const saleItem = document.createElement("li");
            saleItem.textContent = `Venda: R$${total.toFixed(2)}`;
            salesList.appendChild(saleItem);

            salesTotal += total;
            totalSales.textContent = `Total de Vendas: R$${salesTotal.toFixed(2)}`;

            // Limpar carrinho
            cartList.innerHTML = "";
            total = 0;
            change.textContent = `Troco: R$${changeAmount.toFixed(2)}`;  // Corrigido aqui

            console.log('chamando a venda');
            enviarDadosVendaAPI(clienteSelecionado, dataVenda, desconto, valorEntrega, status, produtosPDV);
        } else {
            change.textContent = "Pagamento insuficiente";
        }
    });
    // Adicione essas linhas no início do seu script.js
    var discountInput = document.getElementById('discount-input');
    var totalGeral = document.getElementById('total-geral');

    // Atualize sua função para calcular o total geral
    function calcularTotalGeral() {
        var subtotal = calcularSubtotal();
        var desconto = parseFloat(discountInput.value) || 0;
        var total = subtotal - desconto;
        totalGeral.innerHTML = 'Total Geral: R$' + total.toFixed(2);
    }

    // Adicione um ouvinte de eventos para calcular o total geral sempre que o desconto for alterado
    discountInput.addEventListener('input', calcularTotalGeral);

});

function enviarDadosVendaAPI(cliente, dataVenda, desconto, valorEntrega, status, produtosPDV) {
    console.log('chegou na venda');
    var dadosAPI = GetTnkValue();
    var tenant_id = dadosAPI.tenant_id;
    alert('criando a venda');
    var dados = {
        cliente: cliente,
        dataVenda: dataVenda,
        desconto: desconto,
        valorEntrega: valorEntrega,
        status: status,
        produtos: produtosPDV,
        endpoint: "CadastrarVendaPDV", // Modifique conforme necessário
        tenant_id: tenant_id,
    };

    // Faça a solicitação AJAX para o backend
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("venda_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log(resultado);
            if (resultado == 1) {
                MensagemGenerica("Dados alterados com sucesso", "success");
            } else {
                MensagemErro();
            }
        }
    });
}

function CarregarProdutoVendaPDV() {
    var dadosAPI = GetTnkValue();
    alert('dasads');
    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var combo_prod_venda = $("#produto_venda");
    combo_prod_venda.empty();
    var endpoint_clientes = "BuscarProdutoVenda";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_clientes
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("produto_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log("comboProd" + resultado);
            $('<option>').val("").text("Selecione").appendTo(combo_prod_venda);

            $(resultado).each(function () {
                $('<option>').val(this.ProdID).text('nome: ' + this.ProdDescricao + ' / estoque: ' + this.ProdEstoque + ' / preço: ' + this.ProdValorVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })).appendTo(combo_prod_venda);
            });

            // Adiciona um evento quando um produto é selecionado
            combo_prod_venda.on('change', function () {
                var selectedProductId = $(this).val();
                var selectedProduct = resultado.find(product => product.ProdID == selectedProductId);

             
            });
        }
    });

    return false;
}




























// Adiciona um evento ao campo de quantidade para atualizar o valor total
$('#productTableBody').on('change', '.product-quantity', function () {
    atualizarValorTotalLinha($(this));
});

/* $('#productTableBodyAlt').on('change', '.product-quantity_alt', function () {
    alert('chamou');
    EditaAtualizarValorTotalLinha($(this));
});
 */
// Adiciona um evento para remover o produto
$('#productTableBody').on('click', '.btn-remove-product', function () {
    $(this).closest('tr').remove();
    atualizarTotal();
});

var resultado;
function CarregarProdutoVenda() {
    var dadosAPI = GetTnkValue();
    alert('dasads');
    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var combo_prod_venda = $("#produto_venda");
    combo_prod_venda.empty();
    var endpoint_clientes = "BuscarProdutoVenda";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_clientes
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("produto_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log("comboProd" + resultado);
            $('<option>').val("").text("Selecione").appendTo(combo_prod_venda);

            $(resultado).each(function () {
                $('<option>').val(this.ProdID).text('nome: ' + this.ProdDescricao + ' / estoque: ' + this.ProdEstoque + ' / preço: ' + this.ProdValorVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })).appendTo(combo_prod_venda);
            });

            // Adiciona um evento quando um produto é selecionado
            combo_prod_venda.on('change', function () {
                var selectedProductId = $(this).val();
                var selectedProduct = resultado.find(product => product.ProdID == selectedProductId);

                // Adiciona à tabela apenas se o produto for selecionado
                if (selectedProduct) {
                    var newRow = '<tr>' +
                        '<td class="product-id">' + selectedProduct.ProdID + '</td>' +
                        '<td class="product-name">' + selectedProduct.ProdDescricao + '</td>' +
                        '<td class="product-quantity-cell">' + '<input type="number" class="form-control product-quantity" value="1">' + '</td>' +
                        '<td class="product-unit-price">' + selectedProduct.ProdValorVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + '</td>' +
                        '<td class="product-total">' + selectedProduct.ProdValorVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + '</td>' +
                        '<td><img class="btn-remove-product" src="../Template/assets/img/icons/delete.svg" alt="svg"></td>' +
                        '</tr>';

                    $('#productTableBody').append(newRow);

                    // Adiciona um evento ao campo de quantidade para atualizar o valor total
                    $('.product-quantity').off('change').on('change', function () {
                        atualizarTotal();
                    });
                    // Adiciona um evento para remover o produto
                    $('.btn-remove-product').on('click', function () {
                        $(this).closest('tr').remove();
                        atualizarTotal();
                    });
                    var $quantityInput = $(newRow).find('.product-quantity');
                    $quantityInput.on('change', function () {
                        atualizarValorTotalLinha($(this));
                    });

                    // Atualiza o valor total ao adicionar um produto
                    atualizarTotal();
                }
            });
        }
    });

    return false;
}

// Função para atualizar o valor total da linha
function atualizarValorTotalLinha($quantityInput) {
    var quantity = parseFloat($quantityInput.val()) || 0;
    var unitPrice = parseFloat($quantityInput.closest('tr').find('.product-unit-price').text()) || 0;
    var total = quantity * unitPrice;
    $quantityInput.closest('tr').find('.product-total').text(total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    atualizarTotal();
}
// Evento para atualizar o total quando o desconto muda
$('#desconto').on('change', function () {
    atualizarTotal();
});

// Evento para atualizar o total quando o valor de entrega muda
$('#valor_entrega').on('change', function () {
    atualizarTotal();
});


function EditaAtualizarValorTotalLinha($quantityInput) {
    var quantity = parseFloat($quantityInput.val()) || 0;
    var unitPrice = parseFloat($quantityInput.closest('tr').find('.product-unit-price_alt').text()) || 0;
    var total = quantity * unitPrice;
    $quantityInput.closest('tr').find('.product-total_alt').text(total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    EditaAtualizarTotal();
}
// Evento para atualizar o total quando o desconto muda
$('#desconto_alt').on('change', function () {
    EditaAtualizarTotal();
});

// Evento para atualizar o total quando o valor de entrega muda
$('#valor_entrega_alt').on('change', function () {
    EditaAtualizarTotal();
});

function atualizarTotal() {
    var desconto = parseFloat($('#desconto').val()) || 0;
    var valorEntrega = parseFloat($('#valor_entrega').val()) || 0;

    // Calcular o total dos produtos na tabela
    var totalProdutos = 0;
    $('.product-quantity').each(function () {
        var quantidade = parseFloat($(this).val()) || 0;
        var valorUnitario = parseFloat($(this).closest('tr').find('.product-unit-price').text().replace('R$', '').replace(',', '.')) || 0;
        totalProdutos += quantidade * valorUnitario;
    });

    // Atualizar os elementos na interface
    $('#total_produtos').text(totalProdutos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

    // Calcular o total geral considerando descontos e valor de entrega
    var totalGeral = totalProdutos - desconto + valorEntrega;

    // Atualizar os elementos na interface
    $('#total_desconto').text(desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    $('#total_entrega').text(valorEntrega.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    $('#total_geral').text(totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
}


function EditaAtualizarTotal() {
    var desconto = parseFloat($('#desconto_alt').val()) || 0;
    var valorEntrega = parseFloat($('#valor_entrega_alt').val()) || 0;

    // Calcular o total dos produtos na tabela
    var totalProdutos = 0;
    $('.product-quantity_alt').each(function () {
        var quantidade = parseFloat($(this).val()) || 0;
        var valorUnitario = parseFloat($(this).closest('tr').find('.product-unit-price_alt').text().replace('R$', '').replace(',', '.')) || 0;
        totalProdutos += quantidade * valorUnitario;
    });

    // Atualizar os elementos na interface
    $('#total_produtos_alt').text(totalProdutos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

    // Calcular o total geral considerando descontos e valor de entrega
    var totalGeral = totalProdutos - desconto + valorEntrega;

    // Atualizar os elementos na interface
    $('#total_desconto_alt').text(desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    $('#total_entrega_alt').text(valorEntrega.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    $('#total_geral_alt').text(totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
}



$(document).on('click', '#btnGravar', function () {
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var endpoint_venda = "CadastrarVenda";
    var tenant_id = dadosAPI.tenant_id;
    // Obtenha os dados dos campos
    var clienteSelecionado = $('#clientes_alt').val();
    var dataVenda = $('.datetimepicker').val();
    var desconto = parseFloat($('#desconto').val()) || 0;
    var valorEntrega = parseFloat($('#valor_entrega').val()) || 0;
    var status = $('.select').val();

    // Obtenha os produtos da tabela
    var produtos = [];
    $('.product-quantity').each(function () {
        var produtoID = $(this).closest('tr').find('.product-id').text();
        var quantidade = parseFloat($(this).val()) || 0;
        var valorUnitario = parseFloat($(this).closest('tr').find('.product-total').text()) || 0;
        produtos.push({
            produtoID: produtoID,
            quantidade: quantidade,
            valorUnitario: valorUnitario
        });
    });
    console.log("produtosss", produtos);
    // Construa o objeto de dados
    var dados = {
        cliente: clienteSelecionado,
        dataVenda: dataVenda,
        desconto: desconto,
        valorEntrega: valorEntrega,
        status: status,
        produtos: produtos,
        endpoint: endpoint_venda,
        tenant_id: tenant_id
    };

    // Faça a solicitação AJAX para o backend
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("venda_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log(resultado);
            if (resultado == 1) {
                MensagemGenerica("Dados alterados com sucesso", "success");
            } else {
                MensagemErro();
            }
        }
    });
});


// Evento para remover o produto



$(document).on('click', '#btnEditar', function () {
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var endpoint_venda = "EditarVenda";
    var tenant_id = dadosAPI.tenant_id;

    var encodedId = getUrlParameter('id');
    var decodedId = atob(decodeURIComponent(encodedId));
    var vendaID = decodedId;

    var clienteSelecionado = $('#clientes_alt').val();
    var dataVenda = $('#data_venda').val();
    var desconto = parseFloat($('#desconto_alt').val()) || 0;
    var valorEntrega = parseFloat($('#valor_entrega_alt').val()) || 0;
    var status = $('#status_alt').val();

    var produtos = [];
    $('.product-quantity_alt').each(function () {
        var produtoID = $(this).closest('tr').find('.product-id_alt').text();
        var quantidade = parseFloat($(this).val()) || 0;
        var valorUnitario = parseFloat($(this).closest('tr').find('.product-total_alt').text()) || 0;
        var idTabela = $(this).closest('tr').data('id-tabela');

        produtos.push({
            idTabela: idTabela,
            produtoID: produtoID,
            quantidade: quantidade,
            valorUnitario: valorUnitario
        });
    });

    var itensExcluidos = [];
    $('#productTableBodyAlt').on('click', '.btn-remove-product_alterado', function () {
        var idTabela = $(this).closest('tr').data('id-tabela');

        // Adiciona o ID da tabela à lista de itens excluídos
        itensExcluidos.push({ id: idTabela });

        // Remove a linha da tabela
        $(this).closest('tr').remove();
        EditaAtualizarTotal();
    });

    var dados = {
        cliente: clienteSelecionado,
        dataVenda: dataVenda,
        desconto: desconto,
        valorEntrega: valorEntrega,
        status: status,
        produtos: produtos,
        itensExcluidos: itensExcluidos,
        endpoint: endpoint_venda,
        tenant_id: tenant_id,
        id_venda: vendaID
    };

    // Faça a solicitação AJAX para o backend
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("venda_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log(resultado);
            if (resultado == 1) {
                itensExcluidos = [];
                MensagemGenerica("Dados alterados com sucesso", "success");
            } else {
                MensagemErro();
            }
        }
    });
});








function DetalharVenda() {

    var encodedId = getUrlParameter('id');
    var decodedId = atob(decodeURIComponent(encodedId));
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var id_user_logado = dadosAPI.tecnico_id;
    var endpoint_cliente = "DetalharVenda";
    var id = atob(encodedId);
    var dados = {
        endpoint: endpoint_cliente,
        id_venda: decodedId,
        id_user: id_user_logado,
        tenant_id: dadosAPI.tenant_id
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("venda_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {

            var resultado = dados_ret["result"];
            console.log("editVenda:" + resultado);
           /*  var novaURL = URL_IMG + "os/" + resultado.imagemPath;
            console.log(novaURL);
            $("#alt_imagemProduto").attr("src", novaURL);
            */ var statusNome = StatusVendaDesc(resultado.VendaStatus);
            console.log(statusNome);
            var option = new Option(resultado.CliNome, resultado.VendaCliID, true, true);
            var option_status = new Option(statusNome, resultado.VendaStatus, true, true);
            console.log(resultado.VendaDesconto);
            $("#clientes_alt").append(option); // Adiciona a nova opção ao select
            $("#clientes_alt").trigger('change');
            $("#VendaID").val(resultado.VendaID);
            $("#os_tecnico_alt").val(resultado.OsTecID);
            $("#data_venda").val(formatarData(resultado.VendaDT));
            $('#desconto_alt').val(resultado.VendaDesconto);
            $('#valor_entrega_alt').val(resultado.VendaValorEntrega);
            $("#status_alt").append(option_status);
            $("#status_alt").trigger('change');
            CarregarItensVendaNaTabela(decodedId);
            // Carregar produtos disponíveis no dropdown
            CarregarProdutosVenda(decodedId);

        }
    })
}

function CarregarProdutosVenda(vendaID) {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var combo_prod_venda = $("#produto_venda_alterado");
    combo_prod_venda.empty();

    var endpoint_produtos = "BuscarProdutoVenda";
    var dadosProdutos = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_produtos
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("produto_api"),
        data: JSON.stringify(dadosProdutos),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dadosRetProdutos) {
            var resultadoProdutos = dadosRetProdutos["result"];
            console.log("Todos Produtos: " + JSON.stringify(resultadoProdutos));

            $('<option>').val("").text("Selecione......").appendTo(combo_prod_venda);

            $(resultadoProdutos).each(function () {
                $('<option>').val(this.ProdID).text('nome: ' + this.ProdDescricao + ' / estoque: ' + this.ProdEstoque + ' / preço: ' + this.ProdValorVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })).appendTo(combo_prod_venda);
            });

            // Adiciona produtos já existentes na tabela ao dropdown
            $('#productTableBodyAlt .product-id_alt').each(function () {
                var prodID = $(this).text();
                var prodNome = $(this).closest('tr').find('.product-name_alt').text();
                var option = new Option('nome: ' + prodNome, prodID);
                combo_prod_venda.append(option);
            });

            // Adiciona um evento quando um produto é selecionado
            combo_prod_venda.on('change', function () {
                var selectedProductId = $(this).val();
                var selectedProduct = resultadoProdutos.find(product => product.ProdID == selectedProductId);

                // Adiciona à tabela apenas se o produto for selecionado
                if (selectedProduct) {
                    var newRow = '<tr>' +
                        '<td class="product-id_alt">' + selectedProduct.ProdID + '</td>' +
                        '<td class="product-name_alt">' + selectedProduct.ProdDescricao + '</td>' +
                        '<td class="product-quantity-cell_alt">' + '<input type="number" class="form-control product-quantity_alt" value="1">' + '</td>' +
                        '<td class="product-unit-price_alt">' + selectedProduct.ProdValorVenda + '</td>' +
                        '<td class="product-total_alt">' + (selectedProduct.ProdValorVenda * 1) + '</td>' + // Valor inicial com quantidade 1
                        '<td><img class="btn-remove-product_alterado" src="../Template/assets/img/icons/delete.svg" alt="svg"></td>' +
                        '</tr>';

                    $('#productTableBodyAlt').append(newRow);

                    // Adiciona um evento ao campo de quantidade para atualizar o valor total
                    $('.product-quantity_alt').off('change').on('change', function () {
                        EditaAtualizarTotal();
                    });

                    // Adiciona um evento para remover o produto
                    $('.btn-remove-product_alterado').off('click').on('click', function () {
                        $(this).closest('tr').remove();
                        EditaAtualizarTotal();
                    });

                    var $quantityInput = $('#productTableBodyAlt .product-quantity_alt');
                    $quantityInput.off('change').on('change', function () {
                        EditaAtualizarValorTotalLinha($(this));
                    });

                    // Atualiza o valor total ao adicionar um produto
                    EditaAtualizarTotal();
                }
            });
        }
    });
}

function CarregarItensVendaNaTabela(vendaID) {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var endpoint_itens_venda = "DetalharItensVenda";
    var dadosItensVenda = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_itens_venda,
        id_venda: vendaID
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("venda_api"),
        data: JSON.stringify(dadosItensVenda),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dadosRetItensVenda) {
            var resultadoItensVenda = dadosRetItensVenda["result"];
            console.log("Itens da Venda: " + resultadoItensVenda);

            $(resultadoItensVenda).each(function () {
                var newRow = '<tr data-id-tabela="' + this.ItensID + '">' +
                    '<td class="product-id_alt">' + this.ProdID + '</td>' +
                    '<td class="product-name_alt">' + this.ProdDescricao + '</td>' +
                    '<td class="product-quantity-cell_alt">' + '<input type="number" class="form-control product-quantity_alt" value="' + this.ItensQtd + '">' + '</td>' +
                    '<td class="product-unit-price_alt">' + this.ProdValorVenda + '</td>' +
                    '<td class="product-total_alt">' + (this.ProdValorVenda * this.ItensQtd) + '</td>' +
                    '<td><img class="btn-remove-product_alterado" src="../Template/assets/img/icons/delete.svg" alt="svg"></td>' +
                    '</tr>';

                $('#productTableBodyAlt').append(newRow);
            });

            // Adiciona um evento ao campo de quantidade para atualizar o valor total
            $('.product-quantity_alt').off('change').on('change', function () {
                EditaAtualizarTotal();
            });

            // Adiciona um evento para remover o produto
            $('.btn-remove-product_alterado').off('click').on('click', function () {
                $(this).closest('tr').remove();
                EditaAtualizarTotal();
            });

            var $quantityInput = $('#productTableBodyAlt .product-quantity_alt');
            $quantityInput.off('change').on('change', function () {
                EditaAtualizarValorTotalLinha($(this));
            });

            // Atualiza o valor total ao adicionar um produto
            EditaAtualizarTotal();
        }
    });
}


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function CarregarVenda() {
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var endpoint = "RetornarVenda";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("venda_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log('Vendasss' + resultado);

            if (resultado != "") {
                var headers = ['Data venda', 'Cliente', 'Status', 'Faturado?', 'Total da venda', 'Desconto', 'Valor entrega', 'Ações'];

                var table = construirTabela(resultado, headers, function (data) {
                    // Função para construir a linha da tabela para cada venda
                    var idCriptografado = btoa(data.VendaID);
                    var url = 'editar_venda.php?id=' + encodeURIComponent(idCriptografado);

                    return '<tr>' +
                        '<td>' + formatarData(data.VendaDT) + '</td>' +
                        '<td>' + data.CliNome + '</td>' +
                        '<td>' + StatusVenda(data.VendaStatus) + '</td>' +
                        '<td>' + (data.VendaFaturado == "N" ? '<span class="badges bg-lightred">Não Pago</span>' : '<span class="badges bg-lightgreen">Pago</span>') + '</td>' +
                        '<td>' + data.VendaValorTotal + '</td>' +
                        '<td>' + data.VendaDesconto + '</td>' +
                        '<td>' + data.VendaValorEntrega + '</td>' +
                        '<td class="text-center">' +
                        '<a class="action-set" href="javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="true">' +
                        '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>' +
                        '</a>' +
                        '<ul class="dropdown-menu">' +
                        '<li>' +
                        '<a href="' + url + '" class="dropdown-item">' +
                        '<img src="../Template/assets/img/icons/edit.svg" class="me-2" alt="img">Editar OS' +
                        '</a>' +
                        '</li>' +
                        '<li>' +
                        '<a onclick="exibirModalPagamentosFeitos(' + data.OsID + ')" class="dropdown-item" data-toggle="modal" data-target="#showpayment">' +
                        '<img src="../Template/assets/img/icons/dollar-square.svg" class="me-2" alt="img">Verificar pagamentos' +
                        '</a>' +
                        '</li>' +
                        '<li>' +
                        '<a onclick="exibirModalPagamentos(' + data.OsID + ', ' + (data.OsValorDevido <= 0 ? data.OsValorTotal : data.OsValorDevido) + ')" class="dropdown-item" data-toggle="modal" data-target="#createpayment">' +
                        '<img src="../Template/assets/img/icons/plus-circle.svg" class="me-2" alt="img">Create Payment' +
                        '</a>' +
                        '</li>' +
                        '<li>' +
                        '<a onclick="gerarPDFVendaDetalhada(' + data.VendaID + ')" class="dropdown-item">' +
                        '<img src="../Template/assets/img/icons/download.svg" class="me-2" alt="img">Emitir pdf' +
                        '</a>' +
                        '</li>' +
                        '</ul>' +
                        '</td>' +
                        '</tr>';
                });

                $("#table_os").html(table);
            } else {
                MensageGenerica("Nenhum chamado encontrado");
                $("#divResult").hide();
            }
        }
    });

    return false;
}
function construirTabela(dados, headers, rowBuilder) {
    var table_start = '<div class="table-responsive"><table class="table datanew"><thead>';
    var table_head = '<tr>';

    // Adiciona os headers à tabela
    headers.forEach(header => {
        table_head += '<th>' + header + '</th>';
    });

    table_head += '</tr></thead>';
    var table_data = '';

    // Adiciona as linhas à tabela usando a função rowBuilder
    dados.forEach(data => {
        table_data += rowBuilder(data);
    });

    var table_end = '</tbody></table></div>';
    return table_start + table_head + table_data + table_end;
}

function ClientesVenda() {

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var combo_clientes = $("#clientes_alt");
    combo_clientes.empty();
    var endpoint_clientes = "RetornarClientesOs";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_clientes
    };
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("ordem_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log("Categ:" + resultado);
            $('<option>').val("").text("Selecione").appendTo(combo_clientes);

            $(resultado).each(function () {

                $('<option>').val(this.CliID).text(this.CliNome).appendTo(combo_clientes);
            })
        }
    })
    return false;
}


function ExibirProdutosPorCategoria(categoria) {
    console.log(categoria);
    // Limpe o conteúdo atual da seção de produtos
    $("#produtos_container").empty();

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var endpoint_produtos_por_categoria = "RetornarProdutosPorCategoria";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_produtos_por_categoria,
        categoria_id: categoria // Adicione o ID da categoria para a solicitação
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("produto_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log("produtos por categoria:", resultado);

            if (resultado != "") {
                // Construa a lista de produtos da categoria
                var produtosHtml = '<div class="owl-carousel owl-theme owl-product border-0">';
                resultado.forEach(function (produto) {
                    // Lógica para exibir produtos da categoria selecionada
                    produtosHtml += '<div class="categoria-tab_prod">' +
                        '<div class="product-details">' +
                        '<img src="' + URL_IMG + 'produto/' + produto.imagemPath + '" alt="img">' +
                        '<h6>' + produto.ProdDescricao + '</h6>' +
                        '<p>' + produto.ProdCodBarra + '</p>' +
                        '<p class="precoProduto">' + produto.ProdValorVenda + '</p>' +
                        '</div>' +
                        '</div>';
                });
                produtosHtml += '</div>';
                $("#produtos_container").html(produtosHtml);

                // Inicializar o Owl Carousel após a inserção dos produtos
                $('.owl-carousel').owlCarousel({
                    // Configurações do Owl Carousel
                    items: 4, // Altere conforme necessário
                    loop: false,
                    margin: 3,
                    nav: true,
                    dots: false,
                });
                $(".categoria-tab_prod").off("click").on("click", function () {
                    var nomeProduto = $(this).find('h6').text();
                    var precoProduto = $(this).find('.precoProduto').text(); // Alteração aqui para pegar o preço corretamente
                    adicionarProdutoAoCarrinho(nomeProduto, precoProduto);
                });
            } else {
                MensagemGenerica("Nenhum produto encontrado para esta categoria");
            }
        }
    });
}


function gerarPDFVendaDetalhada(VendaID) {
    alert(VendaID);
    let filtrar_palavra = "teste";
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var busca_nome = $("#filtrar_nome").val();
    var busca_data_os = $("#filtrar_data_os").val();
    var busca_tipo_servico = $("#servicos").val();
    var endpoint = "FiltrarVendaDetalhada";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint,
        busca_nome: busca_nome,
        busca_data_os: busca_data_os,
        busca_tipo_servico: busca_tipo_servico,
        VendaID: VendaID
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("venda_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret['result'];
            console.log(resultado);

            if (resultado) {
                let dadosJSON = JSON.stringify(resultado);
                console.log('result:' + dadosJSON);
                dadosJSON.logo_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";

                var form = $('<form action="rel_venda_pdf.php" method="post" target="_blank">' +
                    '<input type="hidden" name="desc_filtro" value="' + filtrar_palavra + '" />' +
                    '<input type="hidden" name="dados" value=\'' + dadosJSON + '\' />' +
                    '</form>');
                $('body').append(form);
                form.submit();
                form.remove();
            } else {
                MensagemGenerica("Nenhum dado encontrado");
                $("#dynamic-table").html('');
            }
        }
    });


}