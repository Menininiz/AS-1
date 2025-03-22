// Função para salvar os dados do usuário no localStorage
function salvarCadastro(nome, email, senha) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('Usuário cadastrado:', { nome, email, senha });
}

// Lógica do cadastro
document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    salvarCadastro(nome, email, senha); // Salva o usuário no localStorage

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';  // Redireciona para a página de login
});

// Função para autenticar o usuário
function autenticarUsuario(email, senha) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log('Verificando login com', email, senha); // Log para verificação
    return usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
}

// Lógica do login
document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    const usuario = autenticarUsuario(email, senha); // Verifica se o usuário existe

    if (usuario) {
        console.log('Usuário autenticado:', usuario); // Log do usuário autenticado
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario)); // Armazena o usuário no localStorage

        window.location.href = 'dashboard.html';  // Redireciona para a página do dashboard
    } else {
        alert('Credenciais inválidas!');
        console.log('Falha na autenticação!'); // Log de falha na autenticação
    }
});

// Exibe o nome do usuário na dashboard
window.onload = function() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
        document.getElementById('userNome').textContent = usuarioLogado.nome;
    } else {
        console.log('Nenhum usuário logado. Redirecionando para o login.');
        window.location.href = 'login.html';  // Se não houver usuário logado, redireciona para o login
    }
};
