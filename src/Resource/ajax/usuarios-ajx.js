

function CadastrarUsuario(){
    alert('novo');
     let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        let id_user_tec = dadosAPI.tecnico_id;

        let dados = {
            endpoint: 'CadastrarUsuarioAPI',
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
            tipo: $("#tipo").val(),
            tenant_id: dadosAPI.tenant_id,
            empresa_id: dadosAPI.empresa_id,
        }
        $.ajax({

            type: "POST",
            url: BASE_URL_AJAX("tecnico_api"),
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
        url: BASE_URL_AJAX("tecnico_api"),
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
        url: BASE_URL_AJAX("tecnico_api"),
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



function DetalharUsuario() {

    var encodedId = getUrlParameter('id');
    var decodedId = atob(decodeURIComponent(encodedId));
    alert(decodedId);
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var id_user_logado = dadosAPI.tecnico_id;
    var endpoint_usuario = "DetalharUsuario";
    var id = atob(encodedId);
    var dados = {
        endpoint: endpoint_usuario,
        id_usuario: decodedId,
        id_user: id_user_logado,
        tenant_id: dadosAPI.tenant_id
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log(resultado);
          
            $("#nome").val(resultado.nome),
            $("#userID").val(resultado.id_user),
            $("#EndID").val(resultado.id_end),
            $("#cep").val(resultado.cep),
            $("#cidade").val(resultado.cidade),
            $("#email").val(resultado.login),
            $("#endereco").val(resultado.rua),
            $("#estado").val(resultado.sigla_estado),
            $("#bairro").val(resultado.bairro),
            $("#numero").val(resultado.numero),
            $("#telefone").val(resultado.telefone),
            $("#tipo").val(resultado.tipo),
            $("#UserID").val(resultado.id);
        }
    })
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function EditarUsuario(id_form){
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        let id_user_tec = dadosAPI.tecnico_id;

        let dados = {
            endpoint: 'EditarUsuarioAPI',
            id_user: id_user_tec,
            nome: $("#nome").val(),
            user_id: $("#userID").val(),
            end_id: $("#EndID").val(),
            cep: $("#cep").val(),
            cidade: $("#cidade").val(),
            email: $("#email").val(),
            endereco: $("#endereco").val(),
            estado: $("#estado").val(),
            bairro: $("#bairro").val(),
            numero: $("#numero").val(),
            telefone: $("#telefone").val(),
            tipo: $("#tipo").val(),
            tenant_id: dadosAPI.tenant_id,
            empresa_id: dadosAPI.empresa_id,
        }
        $.ajax({

            type: "POST",
            url: BASE_URL_AJAX("tecnico_api"),
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


function CarregarUsuarios() {
    
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var endpoint_usuarios = "RetornarUsuarios";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_usuarios
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log("usuarios:", resultado);
            if (resultado != "") {
                var table_start = '<div class="table-responsive"><table class="table datanew"><thead>';
                var table_head = '<tr><th>Nome usuario</th>\n' +
                    '<th>Telefone</th>\n' +
                    '<th>e-mail</th>\n' +
                    '<th>Tipo</th>\n' +
                    '<th>Status</th>\n' +
                    '<th>Ações</th>\n' +
                    '</tr></thead>';
                var table_data = '';

                $(resultado).each(function () {
                    // Criptografando o ID do cliente usando btoa
                    var idCriptografado = btoa(this.id);

                    // Construindo a URL com o ID criptografado
                    var url = 'editar_usuario.php?id=' + encodeURIComponent(idCriptografado);

                    table_data += '<tr>';
                    table_data += '<td>' + this.nome + '</td>';
                    table_data += '<td>' + this.telefone + '</td>';
                    table_data += '<td>' + this.login + '</td>';
                    table_data += '<td>' + this.tipo + '</td>';
                    table_data += '<td>' + this.status + '</td>';
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
                $("#table_usuarios").html(vaso);
            } else {
                MensageGenerica("Nenhum chamado encontrado");
                $("#divResult").hide();
            }
           
        }
    });

    return false;
}

