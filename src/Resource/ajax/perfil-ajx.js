function ValidarAcesso(id_form) {
    if (NotificarCampos(id_form)) {
        var dados = {
            email: $("#login").val(),
            senha: $("#senha").val(),
            endpoint: 'Autenticar'

        }
        $.ajax({
            type: "POST",
            url: BASE_URL_AJAX("tecnico_api"),
            data: JSON.stringify(dados),
            headers: {

                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var ret = dados_ret['result'];
                console.log(ret);
                if (ret == -3) {
                    MensagemGenerica('Não autorizado', 'info');
                } else if (ret == 0) {
                    MensagemGenerica('Preencha os campos obrigatórios', 'warning');
                    if ($("#login").val() == '') {
                        $("#login").focus();
                    } else {
                        $("#senha").focus();
                    }
                } else if (ret == -4) {
                    MensagemGenerica('Usuário não ativo ou inexistente, contate o administrador', 'info');

                } else if (ret === undefined) {
                    MensagemGenerica('Token não validado', 'info');

                } 
                else {
                    AddTnk(ret);
                   // window.location.href = 'index.php';
                  
                    MensagemLogar('Sucesso, você será direcioando ao sistema');
                }

            }
        })
    }

    return false;
}

function CarregarMeusDados() {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var id_user_logado = dadosAPI.tecnico_id;
    
    alert(id_user_logado);  
    var endpoint_cliente = "DetalharMeusDados";
    var dados = {
        endpoint: endpoint_cliente,
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
            
            var novaURL = URL_IMG + "user/" + resultado.imagemPath;
            console.log(novaURL);
            $("#imgUser").attr("src", novaURL);
            $("#nome").val(resultado.nome);
            $("#user").val(resultado.nome);
            $("#empresa").val(resultado.empresa_tecnico);
            $("#email").val(resultado.login);
            $("#telefone").val(resultado.telefone);
            $("#rua").val(resultado.rua);
            $("#cidade").val(resultado.cidade);
            $("#estado").val(resultado.sigla_estado);
            $("#id_end").val(resultado.id_end);
            $("#bairro").val(resultado.bairro);
            $("#cep").val(resultado.cep);
        }
    })
}


function AlterarMeusDados(id_form) {
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        let id_user_tec = dadosAPI.tecnico_id;
        let tenant_id= dadosAPI.tenant_id
        var formData = new FormData();
        formData.append('id_user', id_user_tec);
        formData.append('endpoint', 'AlterarMeusDados');
        formData.append('nome', $("#nome").val());
        formData.append('empresa', $("#empresa").val());
        formData.append('login', $("#email").val());
        formData.append('telefone', $("#telefone").val());
        formData.append('rua', $("#rua").val());
        formData.append('cidade', $("#cidade").val());
        formData.append('estado', $("#estado").val());
        formData.append('id_end', $("#id_end").val());
        formData.append('bairro', $("#bairro").val());
        formData.append('senha', $("#senha").val());
        formData.append('cep', $("#cep").val());
        formData.append('tenant_id', tenant_id);

        // Faz uma requisição AJAX usando FormData para enviar a imagem e os dados
        $.ajax({
            type: "POST",
            url: BASE_URL_AJAX("tecnico_api"),
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
                    CarregarMeusDados();
                    MensagemGenerica("Dados alterados com sucesso", "success");
                } else {
                    MensagemErro();
                }
            }
        });
    }

    return false;
}


function AlterarImagem(id_form) {
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        let id_user_tec = dadosAPI.tecnico_id;
        let tenant_id = dadosAPI.tenant_id;

        // Obtém a imagem do input de arquivo
        var imagem = document.getElementById('imgInp').files[0];
        console.log(imagem);
        // Cria um objeto de FormData para enviar dados do formulário e a imagem
        var formData = new FormData();
        formData.append('imagem', imagem);
        formData.append('id_user', id_user_tec);
        formData.append('tenant_id', tenant_id);
        formData.append('endpoint', 'AlterarImagemUser');
        // Faz uma requisição AJAX usando FormData para enviar a imagem e os dados
        $.ajax({
            type: "POST",
            url: BASE_URL_AJAX("tecnico_api"),
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
                    CarregarMeusDados();
                    MensagemGenerica("Dados alterados com sucesso", "success");
                } else {
                    MensagemErro();
                }
            }
        });
    }

    return false;
}