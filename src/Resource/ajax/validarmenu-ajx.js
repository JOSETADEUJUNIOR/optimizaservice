function validarMenu(role) {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    const menus = document.querySelectorAll('.submenu'); // Seletor apropriado para seus menus

    menus.forEach(menu => {
        var menuRole = menu.dataset.role;
        var isVisible = false;

        if (menuRole === "Administrador" && dadosAPI.permissao_user === "1" || dadosAPI.permissao_user==="5") {
            isVisible = true; // Admin pode ver qualquer menu de Administrador
        } else if (menuRole === "Funcionario" && (dadosAPI.permissao_user === "1" || dadosAPI.permissao_user === "2" || dadosAPI.permissao_user==="5")) {
            isVisible = true; // Admin e Funcionário podem ver menus de Funcionário
        } else if (menuRole === "Financeiro" && dadosAPI.permissao_user === "1" || dadosAPI.permissao_user==="5") {
            isVisible = true; // Apenas Admin pode ver menus de Financeiro
        } else {
            isVisible = false; // Outros menus são ocultados
        }

        if (isVisible) {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    });
}
