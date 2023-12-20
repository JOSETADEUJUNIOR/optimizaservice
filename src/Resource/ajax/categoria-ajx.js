

function CadastrarCategoria(){
    alert('ss');
     let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        let id_user_tec = dadosAPI.tecnico_id;

        let dados = {
            endpoint: 'CadastrarCategoria',
            id_tec: id_user_tec,
            nome_categoria: $("#nome_categoria").val(),
            cod_categoria: $("#cod_categoria").val(),
            
            tipo: 1,
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






    function CadastrarCategoria(id_form) {
        if (NotificarCampos(id_form)) {
            let dadosAPI = GetTnkValue();
            if (!dadosAPI.tecnico_id) {
                Sair();
            }
            let tenant_id = dadosAPI.tenant_id;
            let nome_categoria = $("#nome_categoria").val();
            let cod_categoria = $("#cod_categoria").val();
            let descricao_categoria = $("#descricao_categoria").val();
            // Obtém a imagem do input de arquivo
            var imagem = document.getElementById('imgCategoria').files[0];
            console.log(imagem);
            // Cria um objeto de FormData para enviar dados do formulário e a imagem
            var formData = new FormData();
            formData.append('imagem', imagem);
            formData.append('nome_categoria', nome_categoria);
            formData.append('cod_categoria', cod_categoria);
            formData.append('descricao_categoria', descricao_categoria);
            formData.append('endpoint', 'CadastrarCategoria');
            formData.append('tenant_id', tenant_id);
            // Faz uma requisição AJAX usando FormData para enviar a imagem e os dados
            $.ajax({
                type: "POST",
                url: BASE_URL_AJAX("categoria_api"),
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
                        MensagemGenerica("Dados alterados com sucesso", "success");
                    } else {
                        MensagemErro();
                    }
                }
            });
        }
    
        return false;
    }

function DetalharCategoria() {

    var encodedId = getUrlParameter('id');
    var decodedId = atob(decodeURIComponent(encodedId));
    alert(decodedId);
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var id_user_logado = dadosAPI.tecnico_id;
    var endpoint_cliente = "DetalharCategoria";
    var id = atob(encodedId);
    var dados = {
        endpoint: endpoint_cliente,
        id_categoria: decodedId,
        id_user: id_user_logado,
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
            var novaURL = URL_IMG + "categoria/" + resultado.imagemPath;
            console.log(novaURL);
            $("#alt_imagemCategoria").attr("src", novaURL);
            $("#categoria_id").val(resultado.id);
            $("#imagem_id").val(resultado.imagemID);
            $("#alt_nome_categoria").val(resultado.nome_categoria);
            $("#alt_cod_categoria").val(resultado.cod);
            $("#alt_descricao_categoria").val(resultado.descricao_categoria);
            $("#nomeCatImg").html(resultado.nome_categoria);
            
            
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

function EditarCategoria(id_form){
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
            Sair();
        }
        let id_user_tec = dadosAPI.tecnico_id;
        let tenant_id = dadosAPI.tenant_id;
        let nome_categoria = $("#alt_nome_categoria").val();
        let categoria_id = $("#categoria_id").val();
        let imagem_id = $("#imagem_id").val();
        console.log("categoria_id:" + categoria_id);
        let cod_categoria = $("#alt_cod_categoria").val();
        let descricao_categoria = $("#alt_descricao_categoria").val();
        // Obtém a imagem do input de arquivo
        var imagem = document.getElementById('alt_imgCategoria').files[0];
        console.log(imagem);
        // Cria um objeto de FormData para enviar dados do formulário e a imagem
        var formData = new FormData();
        formData.append('imagem', imagem);
        formData.append('nome_categoria', nome_categoria);
        formData.append('categoria_id', categoria_id);
        formData.append('cod_categoria', cod_categoria);
        formData.append('descricao_categoria', descricao_categoria);
        formData.append('endpoint', 'EditarCategoria');
        formData.append('tenant_id', tenant_id);
        formData.append('imagem_id', imagem_id);
        $.ajax({

            type: "POST",
                url: BASE_URL_AJAX("categoria_api"),
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
                    MensagemGenerica("Categoria Editada com sucesso","success");
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










function RetornarCategorias() {
    
    var dadosAPI = GetTnkValue();

    if (!dadosAPI.tecnico_id) {
        Sair();
    }

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
            console.log("clientes:", resultado);
            if (resultado != "") {
                var table_start = '<div class="table-responsive"><table class="table datanew"><thead>';
                var table_head = '<tr><th>Nome Categoria</th>\n' +
                    '<th>Codigo</th>\n' +
                    '<th>Descrição</th>\n' +
                    '<th>Status</th>\n' +
                    '<th>Ações</th>\n' +
                    '</tr></thead>';
                var table_data = '';

                $(resultado).each(function () {
                    // Criptografando o ID do cliente usando btoa
                    var idCriptografado = btoa(this.id);
                    var novaURL = URL_IMG + "categoria/" + this.imagemPath;
                    console.log(novaURL);
                    
                    // Construindo a URL com o ID criptografado
                    var url = 'editar_categoria.php?id=' + encodeURIComponent(idCriptografado);

                    var categoryTd = '<td class="productimgname">' +
                    '<a onclick="abrirImagemModal()" href="javascript:void(0);" class="product-img">' +
                    '<img src="'+novaURL+'" alt="product">' +
                    '</a>' +
                    '<a href="javascript:void(0);" class="category-link">' + this.nome_categoria + '</a>' +
                    '</td>';


                    table_data += '<tr>' + categoryTd
                    table_data += '<td>' + this.cod + '</td>';
                    table_data += '<td>' + this.descricao_categoria + '</td>';
                    table_data += '<td>' + (this.status == "1" ? '<span class="badges bg-lightgreen">Ativa</span>' : '<span class="badges bg-lightred">Inativa</span>') + '</td>';
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
                $("#table_categoria").html(vaso);
            } else {
                MensageGenerica("Nenhum chamado encontrado");
                $("#divResult").hide();
            }
        }
    });

    return false;
}

function FiltrarCategoria() {
    
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
            var resultado = dados_ret["result"];
            console.log("clientes:", resultado);
            if (resultado != "") {
                var table_start = '<div class="table-responsive"><table class="table datanew"><thead>';
                var table_head = '<tr><th>Nome Categoria</th>\n' +
                    '<th>Codigo</th>\n' +
                    '<th>Descrição</th>\n' +
                    '<th>Status</th>\n' +
                    '<th>Ações</th>\n' +
                    '</tr></thead>';
                var table_data = '';

                $(resultado).each(function () {
                    // Criptografando o ID do cliente usando btoa
                    var idCriptografado = btoa(this.id);
                    var novaURL = URL_IMG + "categoria/" + this.imagemPath;
                    console.log(novaURL);
                    
                    // Construindo a URL com o ID criptografado
                    var url = 'editar_categoria.php?id=' + encodeURIComponent(idCriptografado);

                    var categoryTd = '<td class="productimgname">' +
                    '<a href="javascript:void(0);" class="product-img">' +
                    '<img src="'+novaURL+'" alt="product">' +
                    '</a>' +
                    '<a href="javascript:void(0);" class="category-link">' + this.nome_categoria + '</a>' +
                    '</td>';


                    table_data += '<tr>' + categoryTd
                    table_data += '<td>' + this.cod + '</td>';
                    table_data += '<td>' + this.descricao_categoria + '</td>';
                    table_data += '<td>' + (this.status == "1" ? '<span class="badges bg-lightgreen">Ativa</span>' : '<span class="badges bg-lightred">Inativa</span>') + '</td>';
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
                $("#table_categoria").html(vaso);
            } else {
                MensagemGenerica("Nenhum cliente encontrado");
                $("#table_cliente").html('Nenhum cliente encontrado');
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
