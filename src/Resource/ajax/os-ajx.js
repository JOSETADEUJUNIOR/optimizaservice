// Seu código JavaScript para inicializar o FullCalendar aqui
$(document).ready(function () {


    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var endpoint_clientes = "RetornarChamados";
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
            console.log("itens" + resultado);
            var eventos = [];
            // Itera sobre os dados e adiciona cada evento ao array de eventos
            resultado.forEach(function (item) {
                var dataAberturaMoment = moment(item.data_abertura);
                var evento = {
                    title: item.descricao_problema,  // Substitua 'titulo' pelo nome do campo correspondente nos dados do banco de dados
                    start: dataAberturaMoment.toDate(),  // Substitua 'data_inicio' pelo nome do campo correspondente nos dados do banco de dados
                    hora: dataAberturaMoment.format("HH:mm:ss"),  // Substitua 'data_inicio' pelo nome do campo correspondente nos dados do banco de dados
                    obs: item.observacao,  // Substitua 'data_inicio' pelo nome do campo correspondente nos dados do banco de dados
                    cliente_id: item.cliente_CliID,  // Substitua 'data_inicio' pelo nome do campo correspondente nos dados do banco de dados
                    // Adicione mais propriedades conforme necessário
                    nomeCliente: item.CliNome,
                };
                eventos.push(evento);
            });
            $('#calendar').fullCalendar({
                // Suas configurações do FullCalendar aqui
                // ... defaultView: 'month', // Visualização padrão do calendário (mês)
                views: {
                    list: {
                        buttonText: 'Lista'
                    }, // Configuração para a visualização de lista (grade)
                    month: {
                        buttonText: 'Mês'
                    } // Configuração para a visualização de mês (calendário)
                },
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,list' // Adicione 'list' para incluir a visualização de lista
                },
                lang: 'pt-br',
                events: eventos,
                eventClick: function (calEvent, jsEvent, view) {

                    // Preencha o formulário do modal com os dados do evento clicado
                    ClientesAgendOs();
                    var option = new Option(calEvent.nomeCliente, calEvent.cliente_id, true, true);

                    $("#clientes_agend_alt").append(option); // Adiciona a nova opção ao select
                    $("#clientes_alt").trigger('change');
                    $('#tituloNovoEvento_alt').val(calEvent.title);
                    $('#data_evento_alt').val(moment(calEvent.start).format("YYYY-MM-DD"));
                    $('#hora_evento_alt').val(moment(calEvent.hora, "HH:mm:ss").format("HH:mm"));
                    $('#texto_alt').val(calEvent.obs);



                    // Abra o modal para editar o evento
                    $('#editarEventoModal').modal('show');


                },
                // Outras configurações do FullCalendar podem ser adicionadas aqui
            });

        }
    });

    var conteudoSummernote;
    $('#summernote').summernote();

    // Capture o evento de alteração no Summernote
    $('#summernote').on('summernote.change', function () {
        // Obtenha o conteúdo do Summernote
        var conteudoSummernote = $('#summernote').summernote('code');

        // Faça algo com o conteúdo, por exemplo, exiba no console
        console.log(conteudoSummernote);
    });

    $('#salvarNovoEventoBtn').click(function () {

        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }

        let endpoint = 'CriarChamados';
        let tenant_id = dadosAPI.tenant_id;
        var titulo = $('#tituloNovoEvento_alt').val();
        var data_evento = $('#data_evento_alt').val();
        var hora_evento = $('#hora_evento_alt').val();
        let cliente_id = $("#clientes_agend_alt").val();
        var texto = $('#texto_alt').val();

        console.log("titulo" + titulo);
        console.log("data_evento" + data_evento);
        console.log("hora_evento" + hora_evento);
        console.log("texto" + conteudoSummernote);

        // Cria um objeto de FormData para enviar dados do formulário e a imagem
        var formData = new FormData();
        formData.append('cliente_id', cliente_id);
        formData.append('tenant_id', tenant_id);
        formData.append('titulo', titulo);
        formData.append('data_evento', data_evento);
        formData.append('hora_evento', hora_evento);
        formData.append('texto', texto);
        formData.append('endpoint', endpoint);
        // Faz uma requisição AJAX usando FormData para enviar a imagem e os dados
        $.ajax({
            type: "POST",
            url: BASE_URL_AJAX("ordem_api"),
            data: formData,
            processData: false,  // Não processa os dados (necessário ao enviar um objeto FormData)
            contentType: false,  // Não configura o tipo de conteúdo (necessário ao enviar um objeto FormData)
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];
                console.log(resultado);
                if (resultado != "-1") {
                    MensagemGenerica("Os criada com sucesso", "success");
                    // Adicione o novo evento ao calendário
                    $('#novoEventoModal').modal('hide');
                    $('#calendar').fullCalendar('renderEvent', {
                        title: resultado.descricao_problema,  // Substitua 'titulo' pelo nome do campo correspondente nos dados do banco de dados
                        start: resultado.data_abertura,
                        allDay: true, // Evento de dia inteiro, ajuste conforme necessário
                        editable: true // Permitir que o evento seja editado/draggable
                    }, true);

                    // Feche o modal


                    // Limpe o formulário para o próximo uso, se desejado
                    $('#tituloNovoEvento_alt').val('');
                    $('#data_evento_alt').val('');
                    $('#hora_evento_alt').val('');
                    $('#texto_alt').val('');
                } else {
                    MensagemErro();
                }
            }
        });

        // Valide os dados conforme necessário


    });
});

function HabilitaAgendamento(escolha) {
    if (escolha == 2) {
        alert('oi');
        $("#divOsAgendamento").show();
    } else {
        $("#divOsAgendamento").hide();
        $("#os_agenda").val(0);
    }

}

function fecharModalEditar() {

    $('#editarEventoModal').modal('hide');

}

$("#qtd_parcela").on("input", function () {
    // Obtém o valor atual do campo de parcelas como número inteiro
    var valorParcela = parseInt($(this).val(), 10);

    // Verifica se o valor é negativo ou maior que 10
    if (valorParcela < 0 || valorParcela > 10) {
        // Se for negativo ou maior que 10, limpa o valor do campo de parcelas
        MensagemGenerica("por favor, informe uma parcela válida", "warning");
        $(this).val("");
    }
});
$("#form_pagamento_os").on("input change", function () {
    var valorPagoComMascara = $("#valor_pago").val();
    var valorPago = parseFloat(valorPagoComMascara.replace(/\./g, '').replace(',', '.')) || 0;
    var totalGeral = parseFloat($('#TotalGeral').val()) || 0;
    var desconto = parseFloat($('#valor_desconto').val()) || 0;
    var qtdParcela = $("#qtd_parcela").val();
    var ValorParcelado = parseFloat(totalGeral / qtdParcela) || 0;
    var troco = 0;
    var lblTotalGeral = (totalGeral - desconto) - valorPago;

    // Se a quantidade de parcelas for maior que zero, calcular o valor pago automaticamente
    if (qtdParcela > 0) {
        valorPago = totalGeral;
        $("#valor_pago").val(formatarValorEmReais(valorPago));
        lblTotalGeral = 0;
    }

    if (lblTotalGeral < 0) {
        troco = Math.abs(lblTotalGeral);
        lblTotalGeral = 0;
    }

    $("#lbl_valor_pago").html(formatarValorEmReais(valorPago));
    $("#lbl_valor_desconto").html(formatarValorEmReais(desconto));
    $("#lbl_valor_parcelado").html("fica " + qtdParcela + " de " + formatarValorEmReais(ValorParcelado));
    $("#lbl_troco").html(formatarValorEmReais(troco));
    $("#lbl_total_geral").html(formatarValorEmReais(lblTotalGeral));

    // Verificar se o valor pago é menor do que o total
    if ((valorPago + desconto) < totalGeral) {
        $("#btn_pagar_os").prop("disabled", true); // Desabilita o botão de encerramento
    } else {
        $("#btn_pagar_os").prop("disabled", false); // Habilita o botão de encerramento
    }
});

function StatusOS(status) {
    if (status == 1) {
        return '<span class=\"badges bg-lightred    \">Orçamento</span>';
    } else if (status == 2) {
        return '<span class=\"badges bg-lightyellow\">Agendado</span>';
    } else if (status == 3) {
        return '<span class=\"badges bg-lightyellow\">Em andamento</span>';
    } else if (status == 4) {
        return '<span class=\"badges bg-lightgreen\">concluída</span>';
    }

}


function exibirModalPagamentos(OsID, valor_total) {
    var valorTotal = formatarValorEmReais(valor_total);
    $('#OsID').val(OsID);
    $('#TotalGeral').val(valor_total);
    $('#valor_total').html(valorTotal);

    // Para abrir o modal
    $('#createpayment').modal('show');
}

function exibirModalPagamentosFeitos(OsID, valor_total) {
    var valorTotal = formatarValorEmReais(valor_total);
    $('#OsID').val(OsID);
    $('#TotalGeral').val(valor_total);
    $('#valor_total').html(valorTotal);

    // Para abrir o modal
    $('#showpayment').modal('show');
    preencherModalPagamentos(OsID);
}


function HabilitaParcelas(change) {
    if (change == "4" || change == "5") {
        $("#divQtdParcela").show();
        $("#divValorPago").hide();
        $("#valor_pago").val(0);
    } else {
        $("#divQtdParcela").hide();
        $("#divValorPago").show();
        $("#qtd_parcela").val(0);

    }
}
function CarregarOS() {

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var endpoint = "RetornarOS";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint
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
            console.log("os:", resultado);
            if (resultado != "") {
                var table_start = '<div class="table-responsive"><table class="table datanew"><thead>';
                var table_head = '<tr><th>Data da Os</th>\n' +
                    '<th>Nome Cliente</th>\n' +
                    '<th>Status</th>\n' +
                    '<th>Pagamento</th>\n' +
                    '<th>Total</th>\n' +
                    '<th>Pago</th>\n' +
                    '<th>Desconto</th>\n' +
                    '<th>Devido</th>\n' +
                    '<th>Ações</th>\n' +
                    '</tr></thead>';
                var table_data = '';

                $(resultado).each(function () {
                    // Criptografando o ID do cliente usando btoa
                    var idCriptografado = btoa(this.OsID);

                    // Construindo a URL com o ID criptografado
                    var url = 'editar_os.php?id=' + encodeURIComponent(idCriptografado);

                    table_data += '<tr>';
                    table_data += '<td>' + exibirDataHoraBr(this.OsDtInicial) + '</td>';
                    table_data += '<td>' + this.nomeCliente + '</td>';
                    table_data += '<td>' + StatusOS(this.OsStatus) + '</td>';
                    table_data += '<td>' + (this.OsFaturado == "N" ? '<span class="badges bg-lightred">Não Pago</span>' : '<span class="badges bg-lightgreen">Pago</span>') + '</td>';
                    table_data += '<td>' + this.OsValorTotal + '</td>';
                    table_data += '<td>' + this.OsValorPago + '</td>';
                    table_data += '<td>' + this.OsDesconto + '</td>';
                    table_data += '<td>' + this.OsValorDevido + '</td>';
                    table_data += '<td class="text-center">' +
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
                        '<a onclick="exibirModalPagamentosFeitos(' + this.OsID + ')" class="dropdown-item" data-toggle="modal" data-target="#showpayment">' +
                        '<img src="../Template/assets/img/icons/dollar-square.svg" class="me-2" alt="img">Verificar pagamentos' +
                        '</a>' +
                        '</li>' +
                        '<li>' +
                        '<a onclick="exibirModalPagamentos(' + this.OsID + ', ' + (this.OsValorDevido <= 0 ? this.OsValorTotal : this.OsValorDevido) + ')" class="dropdown-item" data-toggle="modal" data-target="#createpayment">' +
                        '<img src="../Template/assets/img/icons/plus-circle.svg" class="me-2" alt="img">Create Payment' +
                        '</a>' +
                        '</li>' +
                        '<li>' +
                        '<a onclick="gerarPDFOSDetalhada(' + this.OsID + ')" class="dropdown-item">' +
                        '<img src="../Template/assets/img/icons/download.svg" class="me-2" alt="img">Emitir pdf' +
                        '</a>' +
                        '</li>' +
                        '</ul>' +
                        '</td>';

                    table_data += '</tr>';
                });
                var table_end = '</tbody></table></div>';
                var vaso = table_start + table_head + table_data + table_end;
                $("#table_os").html(vaso);

            } else {
                MensageGenerica("Nenhum chamado encontrado");
                $("#divResult").hide();
            }
        }
    });

    return false;
}
function realizarPagamento(id_form) {
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }

        let endpoint = 'realizarPagamentoOS';
        let OsID = $("#OsID").val();
        let data_pagamento = $("#data_pagamento").val();
        let data_vencimento = $("#data_vencimento").val();
        let valor_pago = $("#valor_pago").val();
        let valor_desconto = $("#valor_desconto").val();
        let valor_total = $("#TotalGeral").val();
        console.log("valorTot" + valor_pago);
        let qtd_parcela = $("#qtd_parcela").val();
        let tipo_pagamento = $("#tipo_pagamento").val();
        let observacao = $("#os_obs").val();
        let tenant_id = dadosAPI.tenant_id;

        if (valor_pago <= 0) {
            MensagemGenerica("Preencher o valor a pagar", "warning");
            return false;
        }

        // Cria um objeto de FormData para enviar dados do formulário e a imagem
        var formData = new FormData();
        formData.append('OsID', OsID);
        formData.append('data_pagamento', data_pagamento);
        formData.append('data_vencimento', data_vencimento);
        formData.append('valor_pago', valor_pago);
        formData.append('valor_desconto', valor_desconto);
        formData.append('valor_total', valor_total);
        formData.append('tipo_pagamento', tipo_pagamento);
        formData.append('qtd_parcela', qtd_parcela);
        formData.append('observacao', observacao);
        formData.append('tenant_id', tenant_id);
        formData.append('endpoint', endpoint);
        // Faz uma requisição AJAX usando FormData para enviar a imagem e os dados
        $.ajax({
            type: "POST",
            url: BASE_URL_AJAX("ordem_api"),
            data: formData,
            processData: false,  // Não processa os dados (necessário ao enviar um objeto FormData)
            contentType: false,  // Não configura o tipo de conteúdo (necessário ao enviar um objeto FormData)
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];
                console.log(resultado);
                if (resultado != "-1") {
                    MensagemGenerica("Os criada com sucesso", "success");
                    //window.location.href = "os.php";
                } else {
                    MensagemErro();
                }
            }
        });
    }

    return false;

}
function CarregarCategoriaProduto() {

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var combo_categoria = $("#prodCat");
    combo_categoria.empty();
    var endpoint_clientes = "RetornarCategorias";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_clientes
    };
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("categoria_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log(resultado);
            $('<option>').val("").text("Selecione").appendTo(combo_categoria);

            $(resultado).each(function () {

                $('<option>').val(this.id).text('nome: ' + this.nome_categoria + ' /cod: ' + this.cod).appendTo(combo_categoria);
            })
        }
    })
    return false;
}

function CadastrarOS(id_form) {
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }

        let endpoint = 'CadastrarOS';
        let cliente_id = $("#clientes_alt").val();
        let os_tecnico = $("#os_tecnico").val();
        let os_data_inicio = $("#os_data_inicio").val();
        let os_data_fim = $("#os_data_fim").val();
        let os_descricao = $("#os_descricao").val();
        let os_garantia = $("#os_garantia").val();
        let os_defeito = $("#os_defeito").val();
        let os_obs = $("#os_obs").val();
        let os_laudo = $("#os_laudo").val();
        let os_status = $("#os_status").val();
        let os_agenda = $("#os_agenda").val();
        let os_tp_servico = $("#os_tp_servico").val();
        let tenant_id = dadosAPI.tenant_id;

        // Cria um objeto de FormData para enviar dados do formulário e a imagem
        var formData = new FormData();
        formData.append('cliente_id', cliente_id);
        formData.append('os_tecnico', os_tecnico);
        formData.append('os_data_inicio', os_data_inicio);
        formData.append('os_data_fim', os_data_fim);
        formData.append('os_descricao', os_descricao);
        formData.append('os_garantia', os_garantia);
        formData.append('os_defeito', os_defeito);
        formData.append('os_obs', os_obs);
        formData.append('os_laudo', os_laudo);
        formData.append('os_status', os_status);
        formData.append('os_agenda', os_agenda);
        formData.append('os_tp_servico', os_tp_servico);
        formData.append('tenant_id', tenant_id);
        formData.append('endpoint', endpoint);
        // Faz uma requisição AJAX usando FormData para enviar a imagem e os dados
        $.ajax({
            type: "POST",
            url: BASE_URL_AJAX("ordem_api"),
            data: formData,
            processData: false,  // Não processa os dados (necessário ao enviar um objeto FormData)
            contentType: false,  // Não configura o tipo de conteúdo (necessário ao enviar um objeto FormData)
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];
                console.log(resultado);
                if (resultado != "-1") {
                    MensagemGenerica("Os criada com sucesso", "success");
                    window.location.href = "os.php";
                } else {
                    MensagemErro();
                }
            }
        });
    }

    return false;
}

function EditarOS(id_form) {
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        alert('editando OS');

        let endpoint = 'EditarOS';
        let cliente_id = $("#clientes_alt").val();
        let os_tecnico = $("#os_tecnico_alt").val();
        let os_data_inicio = $("#os_data_inicio_alt").val();
        let os_data_fim = $("#os_data_fim_alt").val();
        let os_descricao = $("#os_descricao_alt").val();
        let os_garantia = $("#os_garantia_alt").val();
        let os_defeito = $("#os_defeito_alt").val();
        let os_obs = $("#os_obs_alt").val();
        let os_laudo = $("#os_laudo_alt").val();
        let os_status = $("#os_status").val();
        let OsID = $("#OsID").val();
        let tenant_id = dadosAPI.tenant_id;

        // Cria um objeto de FormData para enviar dados do formulário e a imagem
        var formData = new FormData();
        formData.append('cliente_id', cliente_id);
        formData.append('os_tecnico', os_tecnico);
        formData.append('os_data_inicio', os_data_inicio);
        formData.append('os_data_fim', os_data_fim);
        formData.append('os_descricao', os_descricao);
        formData.append('os_garantia', os_garantia);
        formData.append('os_defeito', os_defeito);
        formData.append('os_obs', os_obs);
        formData.append('os_laudo', os_laudo);
        formData.append('os_status', os_status);
        formData.append('OsID', OsID);
        formData.append('tenant_id', tenant_id);
        formData.append('endpoint', endpoint);
        // Faz uma requisição AJAX usando FormData para enviar a imagem e os dados
        $.ajax({
            type: "POST",
            url: BASE_URL_AJAX("ordem_api"),
            data: formData,
            processData: false,  // Não processa os dados (necessário ao enviar um objeto FormData)
            contentType: false,  // Não configura o tipo de conteúdo (necessário ao enviar um objeto FormData)
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];
                console.log(resultado);
                if (resultado != "-1") {
                    MensagemGenerica("Os editada com sucesso", "success");
                } else {
                    MensagemErro();
                }
            }
        });
    }

    return false;
}



function preencherModalPagamentos(OsID) {

    var tabelaPagamentos = $('#tabelaPagamentos tbody');
    tabelaPagamentos.empty();

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var endpoint_clientes = "RetornarPagamentosOS";
    var OsID = OsID;
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_clientes,
        OsID: OsID
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
            console.log("detalharPg" + resultado);
            resultado.forEach(function (pagamento) {
                var newRow = $('<tr>');
                newRow.append('<td>' + exibirDataBr(pagamento.LancDtVencimento) + '</td>');
                newRow.append('<td>' + pagamento.LancValorPago + '</td>');
                newRow.append('<td>' + pagamento.LancValorTotal + '</td>');
                newRow.append('<td>' + pagamento.NumeroParcela + '</td>');
                newRow.append('<td>' + pagamento.ValorParcela + '</td>');
                newRow.append('<td>' + pagamento.DataVencimento + '</td>');
                newRow.append('<td>' +
                    '<a class="me-2" href="javascript:void(0);" onclick="imprimirPagamento(' + pagamento.id + ')">' +
                    '<img src="../Template/assets/img/icons/printer.svg" alt="img">' +
                    '</a>' +
                    '<a class="me-2" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#editpayment" ' +
                    'onclick="detalharPagamento(' + pagamento.id + ')">' +
                    '<img src="../Template/assets/img/icons/edit.svg" alt="img">' +
                    '</a>' +
                    '<a class="me-2 confirm-text" href="javascript:void(0);" ' +
                    'onclick="excluirPagamento(' + pagamento.id + ')">' +
                    '<img src="../Template/assets/img/icons/delete.svg" alt="img">' +
                    '</a>' +
                    '</td>'
                );

                tabelaPagamentos.append(newRow);
            });
        }
    })
    return false;

}

function detalharPagamento(id) {
    // Lógica para preencher o modal de detalhes do pagamento com base no ID
    // ...
}




function DetalharOS() {

    var encodedId = getUrlParameter('id');
    var decodedId = atob(decodeURIComponent(encodedId));
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var id_user_logado = dadosAPI.tecnico_id;
    var endpoint_cliente = "DetalharOS";
    var id = atob(encodedId);
    var dados = {
        endpoint: endpoint_cliente,
        id_ordem: decodedId,
        id_user: id_user_logado,
        tenant_id: dadosAPI.tenant_id
    }
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
            console.log(resultado);
            var novaURL = URL_IMG + "os/" + resultado.imagemPath;
            console.log(novaURL);
            $("#alt_imagemProduto").attr("src", novaURL);
            var statusNome = StatusNomeOS(resultado.OsStatus);
            console.log(statusNome);
            var option = new Option(resultado.nomeCliente, resultado.OsCliID, true, true);
            var option_status = new Option(statusNome, resultado.OsStatus, true, true);

            $("#clientes_alt").append(option); // Adiciona a nova opção ao select
            $("#clientes_alt").trigger('change');
            $("#OsID").val(resultado.OsID);
            $("#os_tecnico_alt").val(resultado.OsTecID);
            $("#os_data_inicio_alt").val(resultado.OsDtInicial);
            $("#os_data_fim_alt").val(resultado.OsDtFinal);
            $("#os_descricao_alt").val(resultado.OsDescProdServ);
            $("#os_garantia_alt").val(resultado.OsGarantia);
            $("#os_defeito_alt").val(resultado.OsDefeito);
            $("#os_obs_alt").val(resultado.OsObs);
            $("#os_laudo_alt").val(resultado.OsLaudoTec);
            $("#os_status_alt").append(option_status);
            $("#os_status_alt").trigger('change');
            CarregarProdutosOs(resultado.OsID);
            CarregarServicosOs(resultado.OsID);
            CarregarAnexosOS(resultado.OsID);

        }
    })
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function CadastrarCliente(id_form) {
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        let id_user_tec = dadosAPI.tecnico_id;
        let dados = {
            endpoint: 'CadastrarCliente',
            id_tec: id_user_tec,
            CliNome: $("#CliNome").val(),
            CliCpfCnpj: $("#AlteracpfCnpj").val(),
            CliCep: $("#CliCep").val(),
            CliCidade: $("#CliCidade").val(),
            CliEmail: $("#CliEmail").val(),
            CliEndereco: $("#CliEndereco").val(),
            CliEstado: $("#CliEstado").val(),
            CliBairro: $("#CliBairro").val(),
            CliDescricao: $("#CliDescricao").val(),
            CliNumero: $("#CliNumero").val(),
            CliID: $("#CliID").val(),
            CliTelefone: $("#CliTelefone").val(),
            CliDtNasc: $("#CliDtNasc").val(),
            CliTipo: $("#CliStatus").val(),
            userEmpID: id_user_tec,
            tenant_id: dadosAPI.tenant_id
        }
        $.ajax({

            type: "POST",
            url: BASE_URL_AJAX("categoria_api"),
            data: JSON.stringify(dados),
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];
                console.log(resultado);
                if (resultado == '1') {
                    MensagemSucesso();
                    FiltrarChamado();
                    $("#finalizarChamado").modal('hide');
                } else {
                    MensagemErro();
                }
            }
        })


    }
    return false;
}

function EditarProduto(id_form) {
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        let endpoint = 'EditarProduto';
        let nome_produto = $("#nome_produto_alt").val();
        let categoria_id = $("#categoria_id_alt").val();
        let SKU = $("#sku_alt").val();
        let cod_barra = $("#cod_barra_alt").val();
        let qtd_minima = $("#qtd_minima_alt").val();
        let qtd = $("#qtd").val();
        let valor_compra = $("#valor_compra").val();
        let valor_venda = $("#valor_venda").val();
        let descricao_produto = $("#prod_comentario").val();
        let produto_id = $("#ProdID").val();
        let empresa_id = dadosAPI.empresa_id;
        let tenant_id = dadosAPI.tenant_id;

        // Obtém a imagem do input de arquivo
        var imagem = document.getElementById('imgProd').files[0];
        console.log(imagem);
        // Cria um objeto de FormData para enviar dados do formulário e a imagem
        var formData = new FormData();
        formData.append('imagem', imagem);
        formData.append('nome_produto', nome_produto);
        formData.append('cod_barra', cod_barra);
        formData.append('categoria_id', categoria_id);
        formData.append('SKU', SKU);
        formData.append('qtd_minima', qtd_minima);
        formData.append('qtd', qtd);
        formData.append('valor_compra', valor_compra);
        formData.append('valor_venda', valor_venda);
        formData.append('descricao_produto', descricao_produto);
        formData.append('produto_id', produto_id);
        formData.append('tenant_id', tenant_id);
        formData.append('endpoint', endpoint);
        // Obtém a imagem do input de arquivo



        $.ajax({

            type: "POST",
            url: BASE_URL_AJAX("produto_api"),
            data: formData,
            processData: false,  // Não processa os dados (necessário ao enviar um objeto FormData)
            contentType: false,  // Não configura o tipo de conteúdo (necessário ao enviar um objeto FormData)
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];
                console.log(resultado);
                if (resultado == '1') {
                    MensagemGenerica("Categoria Editada com sucesso", "success");
                    DetalharCategoria();
                    $("#finalizarChamado").modal('hide');
                } else {
                    MensagemErro();
                }
            }
        })


    }
    return false;
}

/* function EditarCliente(id_form){
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        let id_user_tec = dadosAPI.tecnico_id;

        let dados = {
            endpoint: 'EditarCliente',
            id_tec: id_user_tec,
            CliNome: $("#CliNome").val(),
            CliCpfCnpj: $("#AlteracpfCnpj").val(),
            CliCep: $("#CliCep").val(),
            CliCidade: $("#CliCidade").val(),
            CliEmail: $("#CliEmail").val(),
            CliEndereco: $("#CliEndereco").val(),
            CliEstado: $("#CliEstado").val(),
            CliBairro: $("#CliBairro").val(),
            CliDescricao: $("#CliDescricao").val(),
            CliNumero: $("#CliNumero").val(),
            CliID: $("#CliID").val(),
            CliTelefone: $("#CliTelefone").val(),
            CliDtNasc: $("#CliDtNasc").val(),
            CliTipo: 1,
            empresa_id: dadosAPI.empresa_id,
        }
        $.ajax({

            type: "POST",
            url: BASE_URL_AJAX("categoria_api"),
            data: JSON.stringify(dados),
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];
                console.log(resultado);
                if (resultado == '1') {
                    MensagemSucesso();
                    FiltrarChamado();
                    $("#finalizarChamado").modal('hide');
                } else {
                    MensagemErro();
                }
            }
        })


    }
    return false;
} */

function RetornarProdutosOS() {//carregar produto na combo

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var combo_produtos = $("#produtos_os");
    combo_produtos.empty();
    var endpoint_clientes = "RetornarProdutosOs";
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
            $('<option>').val("").text("Selecione").appendTo(combo_produtos);

            $(resultado).each(function () {

                $('<option>').val(this.ProdID).text(this.ProdDescricao).appendTo(combo_produtos);
            })
        }
    })
    return false;
}
function RetornarServicosOS() {//carregar produto na combo

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var combo_servico = $("#servicos_os");
    combo_servico.empty();
    var endpoint_clientes = "RetornarServicosOs";
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
            console.log("servicos:" + resultado);
            $('<option>').val("").text("Selecione").appendTo(combo_servico);

            $(resultado).each(function () {

                $('<option>').val(this.ServID).text(this.ServDescricao).appendTo(combo_servico);
            })
        }
    })
    return false;
}

function InserirProdutoOs() {//Inserir produto na OS
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    let id_user_tec = dadosAPI.tecnico_id;
    OsID = $("#OsID").val();
    let dados = {
        endpoint: 'InserirItemOrdemController',
        id_tec: id_user_tec,
        OsID: OsID,
        produto_os: $("#produtos_os").val(),
        qtd_produto_os: $("#qtd_produtos_os").val(),
        tenant_id: dadosAPI.tenant_id
    }
    console.log("OSID:" + $("#produtos_os").val());
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
            console.log(resultado);
            if (resultado == '1') {
                MensagemSucesso();
                CarregarProdutosOs(OsID)


            } else if (resultado == '-13') {
                MensagemGenerica("Saldo insulficiente", "warning");
            } else {
                MensagemGenerica("Não foi possível gravar o produto, tente mais tarde", "error");
            }
        }
    })


}


function InserirServicoOs() {//Inserir produto na OS
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    let id_user_tec = dadosAPI.tecnico_id;
    OsID = $("#OsID").val();
    let dados = {
        endpoint: 'InserirServicoOrdemController',
        id_tec: id_user_tec,
        OsID: OsID,
        servicos_os: $("#servicos_os").val(),
        qtd_servico_os: $("#qtd_servico_os").val(),
        tenant_id: dadosAPI.tenant_id
    }
    console.log("OSIDServ:" + $("#qtd_servico_os").val());
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
            console.log(resultado);
            if (resultado == '1') {
                MensagemSucesso();
                CarregarServicosOs(OsID)

            } else if (resultado == '-13') {
                MensagemGenerica("Saldo insulficiente", "warning");
            } else {
                MensagemGenerica("Não foi possível gravar o produto, tente mais tarde", "error");
            }
        }
    })


}





function InserirAnexoOs() {//Inserir produto na OS
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var imagem = document.getElementById('imagem_os').files[0];
    console.log(imagem);
    var OsID = $("#OsID").val();
    let id_user_tec = dadosAPI.tecnico_id;
    let tenant_id = dadosAPI.tenant_id;

    var formData = new FormData();

    formData.append('imagem', imagem);
    formData.append('OsID', OsID);
    formData.append('endpoint', 'InserirAnexoOs');
    formData.append('tenant_id', tenant_id);

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("ordem_api"),
        data: formData,
        processData: false,  // Não processa os dados (necessário ao enviar um objeto FormData)
        contentType: false,  // Não configura o tipo de conteúdo (necessário ao enviar um objeto FormData)
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log(resultado);
            if (resultado == '1') {
                MensagemSucesso();
                CarregarAnexosOS(OsID);

            } else if (resultado == '-13') {
                MensagemGenerica("Saldo insulficiente", "warning");
            } else {
                MensagemGenerica("Não foi possível gravar o produto, tente mais tarde", "error");
            }
        }
    })


}

function ClientesAgendOs() {

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var combo_clientes = $("#clientes_agend_alt");
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

function ClientesOs() {

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

function TpServicosOS() {

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var combo_clientes = $("#os_tp_servico");
    combo_clientes.empty();
    var endpoint_clientes = "RetornarTpServicoOS";
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

                $('<option>').val(this.id).text(this.nome).appendTo(combo_clientes);
            })
        }
    })
    return false;
}




function CarregarAnexosOS(OsID) {
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var endpoint = "RetornaAnxOS";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint,
        OsID: OsID
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
            console.log("anexos:", resultado);
            if (resultado && resultado.length > 0) {
                var container = $("#anexos-container");
                container.empty();
                var tiposPermitidos = ['jpeg', 'jpg', 'png', 'pdf', 'txt'];
                resultado.forEach(function (anexo, index) {
                    if (anexo.imagemLogo && typeof anexo.imagemLogo === 'string') {
                        var tipoImagem = anexo.imagemLogo.split('.').pop().toLowerCase();
                        // Restante do seu código...
                    }
                    if (tiposPermitidos.indexOf(tipoImagem) !== -1) {
                        var novaURL = URL_IMG + "os/" + anexo.imagemPath;
                        if (tipoImagem === 'pdf' || tipoImagem === 'txt') {
                            // Se for PDF ou TXT, adiciona um link para download
                            var downloadBtn = $('<a class="btn btn-primary" href="' + novaURL + '" download="' + anexo.imagemPath + '">Download ' + tipoImagem.toUpperCase() + '</a>');
                            container.append(downloadBtn);
                        } else if (tipoImagem === 'jpeg' || tipoImagem === 'jpg' || tipoImagem === 'png') {
                            // Se for uma imagem, exibe a imagem
                            var img = $('<img class="img-thumbnail" src="' + novaURL + '" alt="Imagem da OS">');
                            container.append(img);
                        }
                    }
                });

                // Adiciona um botão para baixar todos os arquivos
                var downloadAllBtn = $('<a class="btn btn-primary" href="#" id="downloadAllBtn">Download Todos</a>');
                container.append(downloadAllBtn);

                // Adiciona um evento de clique ao botão para baixar todos os arquivos
                downloadAllBtn.on('click', function () {
                    resultado.forEach(function (anexo) {
                        var tipoImagem = anexo.imagemLogo.split('.').pop().toLowerCase();
                        if (tiposPermitidos.indexOf(tipoImagem) !== -1) {
                            var novaURL = URL_IMG + "os/" + anexo.imagemPath;
                            var link = document.createElement('a');
                            link.href = novaURL;
                            link.download = anexo.imagemPath;
                            link.click();
                        }
                    });
                });


            } else {
                $("#anexos-container").empty();
                MensagemGenerica("Nenhum anexo ou imagem encontrado");
            }
        }
    });
}


function CarregarProdutosOs(OsID) {

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var endpoint = "CarregarProdutosOs";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint,
        OsID: OsID
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
            console.log("clientes:", resultado);
            if (resultado && resultado.length > 0) {
                var tbody = $("#tabela_ordem_produto tbody");
                tbody.empty();

                resultado.forEach(function (produto, index) {
                    var newRow = $("<tr>");
                    newRow.append("<td>" + (index + 1) + "</td>");
                    newRow.append("<td>" + produto.ProdDescricao + "</td>");
                    newRow.append("<td>" + produto.ProdOsQtd + "</td>");
                    newRow.append("<td>" + produto.ProdValorVenda + "</td>");
                    newRow.append("<td>" + (produto.ProdOsQtd + produto.ProdValorVenda) + "</td>");
                    newRow.append('<td>' +
                        '<a onclick="deletarProdutoOS(' + produto.ProdOsID + ',' + produto.ProdID + ',' + produto.ProdOsQtd + ',' + produto.ProdOs_osID + ')" ><img src="../Template/assets/img/icons/delete.svg" alt="svg"></a>' +
                        '</td>');

                    tbody.append(newRow);
                });
            } else {
                $("#tabela_ordem_produto tbody").empty();
                MensagemGenerica("Nenhum produto encontrado");
            }
        },
        error: function () {
            $("#tabela_ordem_produto tbody").empty();
            MensagemGenerica("Erro ao carregar produtos");
        }

    });

    return false;
}

function deletarProdutoOS(ProdOsID, ProdID, ProdOsQtd, OsID) {//Inserir produto na OS
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    let id_user_tec = dadosAPI.tecnico_id;
    let dados = {
        endpoint: 'DeletarProdutoOs',
        id_tec: id_user_tec,
        ProdID: ProdID,
        ProdOsID: ProdOsID,
        ProdOsQtd: ProdOsQtd,
        tenant_id: dadosAPI.tenant_id
    }
    console.log("OSIDServ:" + $("#qtd_servico_os").val());
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
            console.log(resultado);
            if (resultado == '1') {
                MensagemSucesso();
                CarregarProdutosOs(OsID);

            } else if (resultado == '-13') {
                MensagemGenerica("Saldo insulficiente", "warning");
            } else {
                MensagemGenerica("Não foi possível gravar o produto, tente mais tarde", "error");
            }
        }
    })


}


function deletarServicoOS(ServOsID, ServID, ServOsQtd, OsID) {//Inserir produto na OS
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    let id_user_tec = dadosAPI.tecnico_id;
    let dados = {
        endpoint: 'DeletarServicoOs',
        id_tec: id_user_tec,
        ServID: ServID,
        ServOsID: ServOsID,
        ServOsQtd: ServOsQtd,
        tenant_id: dadosAPI.tenant_id
    }
    console.log("OSIDServ:" + $("#qtd_servico_os").val());
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
            console.log(resultado);
            if (resultado == '1') {
                MensagemSucesso();
                CarregarProdutosOs(OsID);

            } else if (resultado == '-13') {
                MensagemGenerica("Saldo insulficiente", "warning");
            } else {
                MensagemGenerica("Não foi possível gravar o produto, tente mais tarde", "error");
            }
        }
    })


}



function CarregarServicosOs(OsID) {

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var endpoint = "CarregarServicosOs";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint,
        OsID: OsID
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
            console.log("serv:", resultado);
            if (resultado && resultado.length > 0) {
                var tbody = $("#tabela_ordem_servico tbody");
                tbody.empty();

                resultado.forEach(function (servico, index) {
                    var newRow = $("<tr>");
                    newRow.append("<td>" + (index + 1) + "</td>");
                    newRow.append("<td>" + servico.ServDescricao + "</td>");
                    newRow.append("<td>" + servico.ServOsQtd + "</td>");
                    newRow.append("<td>" + servico.ServValor + "</td>");
                    newRow.append("<td>" + (servico.ServOsQtd + servico.ServValor) + "</td>");
                    newRow.append('<td>' +
                        '<a onclick="deletarServicoOS(' + servico.ServOsID + ',' + servico.ServID + ',' + servico.ServOsQtd + ',' + servico.ServOs_osID + ')" ><img src="../Template/assets/img/icons/delete.svg" alt="svg"></a>' +
                        '</td>');

                    tbody.append(newRow);
                });
            } else {
                $("#tabela_ordem_servico tbody").empty();
                MensagemGenerica("Nenhum produto encontrado");
            }
        },
        error: function () {
            $("#tabela_ordem_servico tbody").empty();
            MensagemGenerica("Erro ao carregar produtos");
        }

    });

    return false;
}


/*let dadosAPI = GetTnkValue();
if (!dadosAPI.tecnico_id) {
    Sair();
}
let id_user_tec = dadosAPI.tecnico_id;
let dados = {
    endpoint: 'InserirItemOrdemController',
    id_tec: id_user_tec,
    OsID: $("#OsID").val(),
    produto_os: $("#produtos_os").val(),
    qtd_produto_os: $("#qtd_produtos_os").val(),
    tenant_id: dadosAPI.tenant_id
}
console.log("OSID:"+$("#produtos_os").val());
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
        console.log(resultado);
        if (resultado == '1') {
            MensagemSucesso();
            FiltrarChamado();
            
        }else if(resultado == '-13'){
            MensagemGenerica("Saldo insulficiente", "warning");
        } else {
            MensagemGenerica("Não foi possível gravar o produto, tente mais tarde", "error");
        }
    }
})
*/

function FiltrarOS() {

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var busca_nome = $("#filtrar_nome").val();
    var busca_data_os = $("#filtrar_data_os").val();
    var busca_tipo_servico = $("#servicos").val();
    var endpoint = "FiltrarOS";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint,
        busca_nome: busca_nome,
        busca_data_os: busca_data_os,
        busca_tipo_servico: busca_tipo_servico
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
            console.log("clientes:", resultado);
            if (resultado != "") {
                var table_start = '<div class="table-responsive"><table class="table datanew"><thead>';
                var table_head = '<tr><th>Data da Os</th>\n' +
                    '<th>Nome Cliente</th>\n' +
                    '<th>Status</th>\n' +
                    '<th>Pagamento</th>\n' +
                    '<th>Total</th>\n' +
                    '<th>Pago</th>\n' +
                    '<th>Desconto</th>\n' +
                    '<th>Devido</th>\n' +
                    '<th>Ações</th>\n' +
                    '</tr></thead>';
                var table_data = '';

                $(resultado).each(function () {
                    // Criptografando o ID do cliente usando btoa
                    var idCriptografado = btoa(this.OsID);

                    // Construindo a URL com o ID criptografado
                    var url = 'editar_os.php?id=' + encodeURIComponent(idCriptografado);

                    table_data += '<tr>';
                    table_data += '<td>' + exibirDataHoraBr(this.OsDtInicial) + '</td>';
                    table_data += '<td>' + this.nomeCliente + '</td>';
                    table_data += '<td>' + StatusOS(this.OsStatus) + '</td>';
                    table_data += '<td>' + (this.OsFaturado == "N" ? '<span class="badges bg-lightred">Não Pago</span>' : '<span class="badges bg-lightgreen">Pago</span>') + '</td>';
                    table_data += '<td>' + this.OsValorTotal + '</td>';
                    table_data += '<td>' + this.OsValorPago + '</td>';
                    table_data += '<td>' + this.OsDesconto + '</td>';
                    table_data += '<td>' + this.OsValorDevido + '</td>';
                    table_data += '<td class="text-center">' +
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
                        '<a onclick="exibirModalPagamentosFeitos(' + this.OsID + ')" class="dropdown-item" data-toggle="modal" data-target="#showpayment">' +
                        '<img src="../Template/assets/img/icons/dollar-square.svg" class="me-2" alt="img">Verificar pagamentos' +
                        '</a>' +
                        '</li>' +
                        '<li>' +
                        '<a onclick="exibirModalPagamentos(' + this.OsID + ', ' + (this.OsValorDevido <= 0 ? this.OsValorTotal : this.OsValorDevido) + ')" class="dropdown-item" data-toggle="modal" data-target="#createpayment">' +
                        '<img src="../Template/assets/img/icons/plus-circle.svg" class="me-2" alt="img">Create Payment' +
                        '</a>' +
                        '</li>' +
                        '<li>' +
                        '<a href="javascript:void(0);" class="dropdown-item">' +
                        '<img src="../Template/assets/img/icons/download.svg" class="me-2" alt="img">Emitir pdf' +
                        '</a>' +
                        '</li>' +
                        '</ul>' +
                        '</td>';

                    table_data += '</tr>';
                });
                var table_end = '</tbody></table></div>';
                var vaso = table_start + table_head + table_data + table_end;
                $("#table_os").html(vaso);

            } else {
                MensagemGenerica("Nenhuma ordem de serviço encontrada", "warning");
                $("#divResult").hide();
            }
        }
    });

    return false;
}

function CarregarServicos() {

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var combo_servico = $("#servicos");
    combo_servico.empty();
    var endpoint_clientes = "RetornarServicos";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_clientes
    };
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("servico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log("servicosOS:" + resultado);
            $('<option>').val("").text("Filtrar por tipo de serviço").appendTo(combo_servico);

            $(resultado).each(function () {

                $('<option>').val(this.ServID).text(this.ServNome).appendTo(combo_servico);
            })
        }
    })
    return false;
}

function gerarPDFOS(OsID) {
    alert(OsID);
    let filtrar_palavra = "teste";
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var busca_nome = $("#filtrar_nome").val();
    var busca_data_os = $("#filtrar_data_os").val();
    var busca_tipo_servico = $("#servicos").val();
    var endpoint = "FiltrarOS";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint,
        busca_nome: busca_nome,
        busca_data_os: busca_data_os,
        busca_tipo_servico: busca_tipo_servico,
        OsID: OsID
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
            var resultado = dados_ret['result'];
            console.log('result:' + resultado);
            if (resultado) {
                let dadosJSON = JSON.stringify(resultado);
                console.log('result:' + dadosJSON);
                dadosJSON.logo_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
                var form = $('<form action="os_pdf.php" method="post" target="_blank">' +
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
function gerarPDFOSDetalhada(OsID) {
    alert(OsID);
    let filtrar_palavra = "teste";
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var busca_nome = $("#filtrar_nome").val();
    var busca_data_os = $("#filtrar_data_os").val();
    var busca_tipo_servico = $("#servicos").val();
    var endpoint = "FiltrarOSDetalhada";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint,
        busca_nome: busca_nome,
        busca_data_os: busca_data_os,
        busca_tipo_servico: busca_tipo_servico,
        OsID: OsID
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
            var resultado = dados_ret['result'];
            console.log(resultado);
    
            if (resultado) {
                let dadosJSON = JSON.stringify(resultado);
                console.log('result:' + dadosJSON);
                dadosJSON.logo_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
    
                var form = $('<form action="rel_os_pdf.php" method="post" target="_blank">' +
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




function gerarExcelOS() {
    let filtrar_palavra = "teste";
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var busca_nome = $("#filtrar_nome").val();
    var busca_data_os = $("#filtrar_data_os").val();
    var endpoint = "FiltrarOS";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint,
        busca_nome: busca_nome,
        busca_data_os: busca_data_os
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
            var resultado = dados_ret['result'];
            console.log('result:' + resultado);
            if (resultado) {
                let dadosJSON = JSON.stringify(resultado);
                dadosJSON.logo_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
                var form = $('<form action="os_excel.php" method="post" target="_blank">' +
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
