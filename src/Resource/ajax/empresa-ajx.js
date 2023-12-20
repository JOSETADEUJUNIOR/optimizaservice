

function CadastrarUsuarioAdmin() {
    alert('novo');
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
        tipo: $("#tipo").val(),
        nome_empresa: $("#nomeEmpresa").val(),
        plano: $("#plano").val(),
        tenant_id: dadosAPI.tenant_id,
        empresa_id: dadosAPI.empresa_id,
    }
    $.ajax({

        type: "POST",
        url: BASE_URL_AJAX("empresa_api"),
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

function AlterarEmpresa() {
    alert('editarEmpresa');
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    let id_user_tec = dadosAPI.tecnico_id;

    let dados = {
        endpoint: 'AlterarEmpresa',
        id_tec: id_user_tec,
        EmpRazao:$("#EmpRazao").val(),
        EmpCnpj:$("#EmpCnpj").val(),
        EmpID:$("#EmpID").val(),
        EmpDtCadastro:$("#EmpDtCadastro").val(),
        EmpDtVencimento:$("#EmpDtVencimento").val(),
        cep:$("#cep").val(),
        rua:$("#rua").val(),
        cidade:$("#cidade").val(),
        numero:$("#numero").val(),
        EmpPlano:$("#EmpPlano").val(),
        EmpStatus:$("#EmpStatus").val(),
        tenant_id: dadosAPI.tenant_id
    }
    $.ajax({

        type: "POST",
        url: BASE_URL_AJAX("empresa_api"),
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
        url: BASE_URL_AJAX("empresa_api"),
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
        url: BASE_URL_AJAX("empresa_api"),
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



function DetalharEmpresa() {

    var encodedId = getUrlParameter('id');
    var decodedId = atob(decodeURIComponent(encodedId));
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var permissao = dadosAPI.permission_user;
    var endpoint_usuario = "DetalharEmpresa";
    var id = atob(encodedId);
    var dados = {
        endpoint: endpoint_usuario,
        empresa_id: decodedId,
        permission_user: 1,
        tenant_id: dadosAPI.tenant_id
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("empresa_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log(resultado);
            var novaURL = URL_IMG + "emp/" + resultado.EmpLogoPath;
            console.log(novaURL);
            $("#imgEmpresa").attr("src", novaURL);
            $("#EmpRazao").val(resultado.EmpNome),
            $("#EmpCnpj").val(resultado.EmpCNPJ),
            $("#EmpID").val(resultado.EmpID),
            $("#EmpDtCadastro").val(exibirDataBr(resultado.EmpDtCadastro)),
            $("#EmpDtVencimento").val(exibirDataBr(resultado.EmpDtVencimento)),
            $("#cep").val(resultado.EmpCep),
            $("#rua").val(resultado.EmpEnd),
            $("#cidade").val(resultado.EmpCidade),
            $("#numero").val(resultado.EmpNumero),
            $("#EmpPlano").val(resultado.EmpPlano),
            $("#EmpStatus").val(resultado.EmpStatus)

        }
    })
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function EditarUsuario(id_form) {
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
            url: BASE_URL_AJAX("empresa_api"),
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
        url: BASE_URL_AJAX("empresa_api"),
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

function CarregarEmpresas() {
    alert('ss');
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var endpoint_usuarios = "RetornarEmpresas";
    var dados = {
        tenant_id: dadosAPI.tenant_id,
        endpoint: endpoint_usuarios
    };

    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("empresa_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log("empresas:", resultado);
            if (resultado != "") {
                var table_start = '<div class="table-responsive"><table class="table datanew"><thead>';
                var table_head = '<tr><th>Empresa Nome</th>\n' +
                    '<th>CNPJ</th>\n' +
                    '<th>Plano</th>\n' +
                    '<th>Status</th>\n' +
                    '<th>EmpDtVencimento</th>\n' +
                    '<th>Ações</th>\n' +
                    '</tr></thead>';
                var table_data = '';

                $(resultado).each(function () {
                    // Criptografando o ID do cliente usando btoa
                    var idCriptografado = btoa(this.EmpID);

                    // Construindo a URL com o ID criptografado
                    var url = 'editar_empresa.php?id=' + encodeURIComponent(idCriptografado);

                    table_data += '<tr>';
                    table_data += '<td>' + this.EmpNome + '</td>';
                    table_data += '<td>' + this.EmpCNPJ + '</td>';
                    table_data += '<td>' + (this.EmpPlano == "1" ? '<span class="badges bg-lightgreen">1 mês</span>' : this.EmpPlano == '2' ? '<span class="badges bg-lightgreen">3 mêses</span>' : this.EmpPlano == '3' ? '<span class="badges bg-lightgreen">1 ano</span>' : '') + '</td>';
                    table_data += '<td>' + (this.EmpStatus == "1" ? '<span class="badges bg-lightgreen">Ativa</span>' : '<span class="badges bg-lightred">Inativa</span>') + '</td>';
                    table_data += '<td>' + exibirDataBr(this.EmpDtVencimento) + '</td>';
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
                $("#table_empresas").html(vaso);
            } else {
                MensageGenerica("Nenhuma empresa encontrada");
                $("#divResult").hide();
            }

        }
    });

    return false;
}

function AlterarImagemEmpresa(id_form) {
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        let empresa_id = $("#EmpID").val();
        let tenant_id = dadosAPI.tenant_id;

        // Obtém a imagem do input de arquivo
        var imagem = document.getElementById('imgInp').files[0];
        console.log(imagem);
        // Cria um objeto de FormData para enviar dados do formulário e a imagem
        var formData = new FormData();
        formData.append('imagem', imagem);
        formData.append('id_emp', empresa_id);
        formData.append('endpoint', 'AlterarImagemEmp');
        formData.append('tenant_id', tenant_id);
        // Faz uma requisição AJAX usando FormData para enviar a imagem e os dados
        $.ajax({
            type: "POST",
            url: BASE_URL_AJAX("empresa_api"),
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
                    DetalharEmpresa();
                    MensagemGenerica("Dados alterados com sucesso", "success");
                } else {
                    MensagemErro();
                }
            }
        });
    }

    return false;
}