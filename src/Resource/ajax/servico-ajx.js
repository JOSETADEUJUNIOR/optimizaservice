

function CadastrarServico(id_form) {
        if (NotificarCampos(id_form)) {
            let dadosAPI = GetTnkValue();
            if (!dadosAPI.tecnico_id) {
                Sair();
            }
            let endpoint= 'CadastrarServico';
            let nome_servico= $("#nome_servico").val();
            let valor_servico= $("#valor_servico").val();
            let descricao_servico= $("#descricao_servico").val();
            let tenant_id = dadosAPI.tenant_id;

            // Cria um objeto de FormData para enviar dados do formulário e a imagem
            var formData = new FormData();
            formData.append('nome_servico', nome_servico);
            formData.append('valor_servico', valor_servico);
            formData.append('descricao_servico', descricao_servico);
            formData.append('tenant_id', tenant_id);
            formData.append('endpoint', endpoint);
            // Faz uma requisição AJAX usando FormData para enviar a imagem e os dados
            $.ajax({
                type: "POST",
                url: BASE_URL_AJAX("servico_api"),
                data: formData,
                processData: false,  // Não processa os dados (necessário ao enviar um objeto FormData)
                contentType: false,  // Não configura o tipo de conteúdo (necessário ao enviar um objeto FormData)
                headers: {
                    'Authorization': 'Bearer ' + GetTnk(),
                },
                success: function (dados_ret) {
                    var resultado = dados_ret["result"];
                    console.log(resultado);
                    if (resultado == 1) {
                        MensagemGenerica("Serviço cadastrado com sucesso", "success");
                    } else {
                        MensagemErro();
                    }
                }
            });
        }
    
        return false;
    }

function DetalharServico() {

    var encodedId = getUrlParameter('id');
    var decodedId = atob(decodeURIComponent(encodedId));
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var id_user_logado = dadosAPI.tecnico_id;
    var endpoint_cliente = "DetalharServico";
    var id = atob(encodedId);
    var dados = {
        endpoint: endpoint_cliente,
        servico_id: decodedId,
        id_user: id_user_logado,
        tenant_id: dadosAPI.tenant_id
    }
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
            console.log(resultado);
            $("#nome_servico").val(resultado.ServNome);
            $("#valor_servico").val(resultado.ServValor);
            $("#descricao_servico").val(resultado.ServDescricao);
            $("#ServID").val(resultado.ServID);
           

        }
    })
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function EditarServico(id_form){
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        let endpoint= 'EditarServico';
        let nome_servico= $("#nome_servico").val();
        let valor_servico= $("#valor_servico").val();
        let descricao_servico= $("#descricao_servico").val();
        let servico_id= $("#ServID").val();
        let status_servico= $("#status_servico").val();
        let tenant_id = dadosAPI.tenant_id;
        let user_id = dadosAPI.tecnico_id;
    // Cria um objeto de FormData para enviar dados do formulário e a imagem
        var formData = new FormData();
        formData.append('nome_servico', nome_servico);
        formData.append('valor_servico', valor_servico);
        formData.append('descricao_servico', descricao_servico);
        formData.append('servico_id', servico_id);
        formData.append('status_servico', status_servico);
        formData.append('tenant_id', tenant_id);
        formData.append('endpoint', endpoint);
        formData.append('user_id', user_id);

        // Obtém a imagem do input de arquivo
        $.ajax({

            type: "POST",
                url: BASE_URL_AJAX("servico_api"),
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
                    MensagemGenerica("Servico editado com sucesso","success");
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

function RetornarServicos() {
    
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

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
            console.log("prd:", resultado);
            if (resultado != "") {
                var table_start = '<div class="table-responsive"><table class="table datanew"><thead>';
                var table_head = '<tr><th>Nome Servico</th>\n' +
                    '<th>Valor</th>\n' +
                    '<th>Descrição</th>\n' +
                    '<th>Status</th>\n' +
                    '<th>Ações</th>\n' +
                    '</tr></thead>';
                var table_data = '';

                $(resultado).each(function () {
                    // Criptografando o ID do cliente usando btoa
                    var idCriptografado = btoa(this.ServID);
                   
                    // Construindo a URL com o ID criptografado
                    var url = 'editar_servico.php?id=' + encodeURIComponent(idCriptografado);

  
                    table_data += '<td>' + this.ServNome + '</td>';
                    table_data += '<td>' + this.ServValor + '</td>';
                    table_data += '<td>' + this.ServDescricao + '</td>';
                    table_data += '<td>' + (this.ServStatus == "1" ? '<span class="badges bg-lightgreen">Ativa</span>' : '<span class="badges bg-lightred">Inativa</span>') + '</td>';
                    table_data += '<td>' +
                        '<a class="me-3" href="' + url + '">' +
                        '<img src="../Template/assets/img/icons/edit.svg" alt="Editar">' +
                        '</a>' +
                       
                        '</td>';
                    table_data += '</tr>';
                });

                var table_end = '</tbody></table></div>';
                var vaso = table_start + table_head + table_data + table_end;
                $("#table_servico").html(vaso);
                
            } else {
                MensagemGenerica("Nenhum chamado encontrado");
                $("#divResult").hide();
            }
        }
    });

    return false;
}


function CarregarCategoriasProd() {

    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    
     var combo_categoria = $("#categoria_id_alt");
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
            console.log("Categ:" + resultado);
            $('<option>').val("").text("Selecione").appendTo(combo_categoria);

            $(resultado).each(function () {

                $('<option>').val(this.id).text(this.nome_categoria).appendTo(combo_categoria);
            })
        }
    })
    return false;
}




function FiltrarServico() {
    
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var filtrar_nome = $("#filtrar_nome").val();
    var filtrar_valor = $("#filtrar_valor").val();
    var endpoint = "FiltrarServico";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint,
        busca_nome : filtrar_nome,
        busca_valor: filtrar_valor
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
            console.log("clientes:", resultado);
            if (resultado != "") {
                var table_start = '<div class="table-responsive"><table class="table datanew"><thead>';
                var table_head = '<tr><th>Nome Servico</th>\n' +
                    '<th>Valor</th>\n' +
                    '<th>Descrição</th>\n' +
                    '<th>Status</th>\n' +
                    '<th>Ações</th>\n' +
                    '</tr></thead>';
                var table_data = '';

                $(resultado).each(function () {
                    // Criptografando o ID do cliente usando btoa
                    var idCriptografado = btoa(this.ServID);
                   
                    // Construindo a URL com o ID criptografado
                    var url = 'editar_servico.php?id=' + encodeURIComponent(idCriptografado);

  
                    table_data += '<td>' + this.ServNome + '</td>';
                    table_data += '<td>' + this.ServValor + '</td>';
                    table_data += '<td>' + this.ServDescricao + '</td>';
                    table_data += '<td>' + (this.ServStatus == "1" ? '<span class="badges bg-lightgreen">Ativa</span>' : '<span class="badges bg-lightred">Inativa</span>') + '</td>';
                    table_data += '<td>' +
                        '<a class="me-3" href="' + url + '">' +
                        '<img src="../Template/assets/img/icons/edit.svg" alt="Editar">' +
                        '</a>' +
                       
                        '</td>';
                    table_data += '</tr>';
                });

                var table_end = '</tbody></table></div>';
                var vaso = table_start + table_head + table_data + table_end;
                $("#table_servico").html(vaso);
                
            } else {
                MensagemGenerica("Nenhum chamado encontrado");
                $("#divResult").hide();
            }
        }
    });

    return false;
}


function gerarPDFCategoria() {
    let filtrar_palavra ="teste";
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var busca_nome = $("#filtrar_nome").val();
    var busca_cod = $("#filtrar_cod").val();
    var endpoint = "FiltrarCategoria";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint,
        busca_nome : busca_nome,
        busca_cod: busca_cod
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
         var resultado = dados_ret['result'];
         console.log('result:'+resultado);
         if (resultado) {
             let dadosJSON = JSON.stringify(resultado);
             dadosJSON.logo_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."; 
             var form = $('<form action="categoria_pdf.php" method="post" target="_blank">' +
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


function gerarExcelCategoria() {
    let filtrar_palavra ="teste";
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var busca_nome = $("#filtrar_nome").val();
    var busca_cod = $("#filtrar_cod").val();
    var endpoint = "FiltrarCategoria";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint,
        busca_nome : busca_nome,
        busca_cod: busca_cod
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
         var resultado = dados_ret['result'];
         console.log('result:'+resultado);
         if (resultado) {
             let dadosJSON = JSON.stringify(resultado);
             dadosJSON.logo_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."; 
             var form = $('<form action="categoria_excel.php" method="post" target="_blank">' +
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
