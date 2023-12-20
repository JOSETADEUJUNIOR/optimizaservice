

function CadastrarUsuario(){
    alert('ss');
     let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        let id_user_tec = dadosAPI.tecnico_id;

        let dados = {
            endpoint: 'CadastrarUsuario',
            id_tec: id_user_tec,
            nome: $("#nome").val(),
            cep: $("#cep").val(),
            cidade: $("#cidade").val(),
            email: $("#email").val(),
            endereco: $("#endereco").val(),
            estado: $("#estado").val(),
            bairro: $("#bairro").val(),
            numero: $("#numero").val(),
            telefone: $("#telefone").val(),
            tipo: 1,
            empresa_id: dadosAPI.empresa_id,
        }
        $.ajax({

            type: "POST",
            url: BASE_URL_AJAX("cliente_api"),
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



function VerificarSenhaAtual() {
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    let id_user_tec = dadosAPI.tecnico_id;
    var dados = {
        endpoint: 'VerificarSenhaAtual',
        id: id_user_tec,
        senha: $("#senha").val()
    };
    $.ajax({
        type: "POST",
        // url: BASE_URL_AJAX("funcionario_api"),
        url: BASE_URL_AJAX("cliente_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];

            if (resultado == 1) {
                RemoverLoad();
                $("#divSenhaAtual").hide();
                $("#divMudarSenha").show();
            } else if (resultado == -1) {
                MensagemGenerica("Senha não confere", "info");
                $("#senha").focus();
            }
        }


    })

    return false;
}

function AtualizarSenha() {
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    let id_user_tec = dadosAPI.tecnico_id;
    var dados = {
        endpoint: "AtualizarSenha",
        id: id_user_tec,
        senha: $("#newsenha").val().trim(),
        repetir_senha: $("#resenha").val().trim()
    };
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("cliente_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];

            if (resultado == 0) {
                NotificarCampos('formNovaSenha');
                $("#newsenha").focus();
            } else if (resultado == -2) {
                NotificarCampos('formNovaSenha');
                MensagemGenerica("Senha precisa ter minimo de 6 caracteres");
                $("#newsenha").focus();
            } else if (resultado == -4) {
                NotificarCampos('formNovaSenha');
                MensagemGenerica("Senhas não conferem", 3);
                $("#resenha").focus();
            } else {
                MensagemGenerica("Sucesso ao alterar senha", 'success');
                $("#divSenhaAtual").show();
                $("#divMudarSenha").hide();
                $("#senha").val('');
                $("#newsenha").val('');
                $("#resenha").val('');
            }
            RemoverLoad();
        }


    })
    return false;
}

function VerSenha() {

    if ($("#senha").prop('type') == 'password') {
        $("#senha").prop('type', 'text');

    } else {
        $("#senha").prop('type', 'password');

    }


}



function DetalharCliente() {

    var encodedId = getUrlParameter('id');
    var decodedId = atob(decodeURIComponent(encodedId));
    alert(decodedId);
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var id_user_logado = dadosAPI.tecnico_id;
    var endpoint_cliente = "DetalharCliente";
    var id = atob(encodedId);
    var dados = {
        endpoint: endpoint_cliente,
        id_cliente: decodedId,
        id_user: id_user_logado,
        tenant_id: dadosAPI.tenant_id
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("cliente_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log(resultado);
          
            $("#CliNome").val(resultado.CliNome);
            $("#AlteracpfCnpj").val(resultado.CliCpfCnpj);
            $("#CliCep").val(resultado.CliCep);
            $("#CliTipo").val(resultado.CliTipo);
            $("#CliCidade").val(resultado.CliCidade);
            $("#CliEmail").val(resultado.CliEmail);
            $("#CliEndereco").val(resultado.CliEndereco);
            $("#CliEstado").val(resultado.CliEstado);
            $("#CliBairro").val(resultado.CliBairro);
            $("#CliDescricao").val(resultado.CliDescricao);
            $("#CliNumero").val(resultado.CliNumero);
            $("#CliID").val(resultado.CliID);
            $("#CliTelefone").val(resultado.CliTelefone);
            $("#CliDtNasc").val(formatarData(resultado.CliDtNasc));
            $("#CliStatus").val(resultado.CliStatus);
            
        }
    })
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function CadastrarCliente(id_form){
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
            url: BASE_URL_AJAX("cliente_api"),
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

function EditarCliente(id_form){
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        let id_user_tec = dadosAPI.tecnico_id;
        alert('test');
        let dados = {
            endpoint: 'EditarCliente',
            id_user: id_user_tec,
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
            empresa_id: dadosAPI.empresa_id,
            tenant_id: dadosAPI.tenant_id
        }
        $.ajax({

            type: "POST",
            url: BASE_URL_AJAX("cliente_api"),
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
            url: BASE_URL_AJAX("cliente_api"),
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

function CarregarClientes() {
    
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var endpoint_clientes = "RetornarClientes";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_clientes
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("cliente_api"),
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
                var table_head = '<tr><th>Nome Cliente</th>\n' +
                    '<th>Telefone</th>\n' +
                    '<th>e-mail</th>\n' +
                    '<th>Cidade</th>\n' +
                    '<th>Ações</th>\n' +
                    '</tr></thead>';
                var table_data = '';

                $(resultado).each(function () {
                    // Criptografando o ID do cliente usando btoa
                    var idCriptografado = btoa(this.CliID);

                    // Construindo a URL com o ID criptografado
                    var url = 'editar_cliente.php?id=' + encodeURIComponent(idCriptografado);

                    table_data += '<tr>';
                    table_data += '<td>' + this.CliNome + '</td>';
                    table_data += '<td>' + this.CliTelefone + '</td>';
                    table_data += '<td>' + this.CliEmail + '</td>';
                    table_data += '<td>' + this.CliCidade + '</td>';
                    table_data += '<td>' +
                        '<a class="me-3" href="' + url + '">' +
                        '<img src="../Template/assets/img/icons/edit.svg" alt="Editar">' +
                        '</a>' +
                        '<a class="me-3 confirm-text" href="javascript:void(0);">' +
                        '<img src="../Template/assets/img/icons/delete.svg" alt="Excluir">' +
                        '</a>' +
                        '</td>';
                    table_data += '</tr>';
                });

                var table_end = '</tbody></table></div>';
                var vaso = table_start + table_head + table_data + table_end;
                $("#table_cliente").html(vaso);
            } else {
                MensageGenerica("Nenhum chamado encontrado");
                $("#divResult").hide();
            }
        }
    });

    return false;
}

function FiltrarClientes() {
    
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var busca_nome = $("#filtrar_nome").val();
    var busca_cidade = $("#filtrar_cidade").val();
    var endpoint_clientes = "FiltrarClientes";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_clientes,
        busca_nome : busca_nome,
        busca_cidade: busca_cidade
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("cliente_api"),
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
                var table_head = '<tr><th>Nome Cliente</th>\n' +
                    '<th>Telefone</th>\n' +
                    '<th>e-mail</th>\n' +
                    '<th>Cidade</th>\n' +
                    '<th>Ações</th>\n' +
                    '</tr></thead>';
                var table_data = '';

                $(resultado).each(function () {
                    // Criptografando o ID do cliente usando btoa
                    var idCriptografado = btoa(this.CliID);

                    // Construindo a URL com o ID criptografado
                    var url = 'editar_cliente.php?id=' + encodeURIComponent(idCriptografado);

                    table_data += '<tr>';
                    table_data += '<td>' + this.CliNome + '</td>';
                    table_data += '<td>' + this.CliTelefone + '</td>';
                    table_data += '<td>' + this.CliEmail + '</td>';
                    table_data += '<td>' + this.CliCidade + '</td>';
                    table_data += '<td>' +
                        '<a class="me-3" href="' + url + '">' +
                        '<img src="../Template/assets/img/icons/edit.svg" alt="Editar">' +
                        '</a>' +
                        '<a class="me-3 confirm-text" href="javascript:void(0);">' +
                        '<img src="../Template/assets/img/icons/delete.svg" alt="Excluir">' +
                        '</a>' +
                        '</td>';
                    table_data += '</tr>';
                });

                var table_end = '</tbody></table></div>';
                var vaso = table_start + table_head + table_data + table_end;
                $("#table_cliente").html(vaso);
            } else {
                MensagemGenerica("Nenhum cliente encontrado");
                $("#table_cliente").html('Nenhum cliente encontrado');
                $("#divResult").hide();
            }
        }
    });

    return false;
}


function gerarPDFCliente() {
    let filtrar_palavra ="teste";
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var busca_nome = $("#filtrar_nome").val();
    var busca_cidade = $("#filtrar_cidade").val();
    var endpoint_clientes = "FiltrarClientes";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_clientes,
        busca_nome : busca_nome,
        busca_cidade: busca_cidade
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("cliente_api"),
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
             var form = $('<form action="cliente_pdf.php" method="post" target="_blank">' +
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


function gerarExcelCliente() {
    let filtrar_palavra ="teste";
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var busca_nome = $("#filtrar_nome").val();
    var busca_cidade = $("#filtrar_cidade").val();
    var endpoint_clientes = "FiltrarClientes";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_clientes,
        busca_nome : busca_nome,
        busca_cidade: busca_cidade
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("cliente_api"),
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
             var form = $('<form action="cliente_excel.php" method="post" target="_blank">' +
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
