document.addEventListener('DOMContentLoaded', function() {
    // Abrir o popup
    document.getElementById('openPopupBtn').addEventListener('click', function() {
        document.getElementById('popupForm').style.display = 'flex';
    });

    // Fechar o popup
    document.querySelector('.closeBtn').addEventListener('click', function() {
        document.getElementById('popupForm').style.display = 'none';
    });

    // Enviar o formulário e cadastrar paciente
    document.getElementById('cadastroPacienteForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário
        
        // Captura os valores do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const idade = document.getElementById('idade').value;
        const prioridade = document.getElementById('prioridade').value;

        // Verifica se todos os campos estão preenchidos
        if (nome && email && idade && prioridade) {
            // Adiciona o paciente à lista
            adicionarPacienteNaLista(nome, email, idade, prioridade);

            // Limpa os campos do formulário após o cadastro
            document.getElementById('cadastroPacienteForm').reset();

            // Fechar o popup após o cadastro
            document.getElementById('popupForm').style.display = 'none';
        } else {
            alert("Preencha todos os campos!");
        }
    });

    // Função para adicionar paciente na lista de pacientes
    function adicionarPacienteNaLista(nome, idade, prioridade) {
        const listaPacientes = document.getElementById('listaPacientes');

        // Criar um novo item de lista (li) para o paciente
        const novoPaciente = document.createElement('li');
        novoPaciente.textContent = `Nome: ${nome}, Idade: ${idade}, Prioridade: ${prioridade}`;

        // Adicionar o novo paciente à lista
        listaPacientes.appendChild(novoPaciente);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menuIcon');
    const closePopup = document.querySelector('.closeBtn');
    const openPopupBtn = document.getElementById('openPopupBtn');
    const popupForm = document.getElementById('popupForm');

    // Abrir a barra lateral ao clicar no ícone
    menuIcon.addEventListener('click', function () {
        if (sidebar.style.width === "250px") {
            sidebar.style.width = "0"; // Fecha a barra lateral
        } else {
            sidebar.style.width = "250px"; // Abre a barra lateral
        }
    });

});