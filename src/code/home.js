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
        const idade = document.getElementById('idade').value;
        const prioridade = document.getElementById('prioridade').value;

        // Verifica se todos os campos estão preenchidos
        if (nome && idade && prioridade) {
            // Adiciona o paciente à lista
            adicionarPacienteNaLista(nome, idade, prioridade);

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
        novoPaciente.classList.add('paciente-item');

        // Adiciona classes de cor conforme prioridade
        if (prioridade === "Baixa") {
            novoPaciente.classList.add('prioridade-baixa');
        } else if (prioridade === "Média") {
            novoPaciente.classList.add('prioridade-media');
        } else if (prioridade === "Alta") {
            novoPaciente.classList.add('prioridade-alta');
        }

        // Define o conteúdo do paciente
        novoPaciente.textContent = `Nome: ${nome}, Idade: ${idade}, Prioridade: ${prioridade}`;

        // Adicionar o novo paciente à lista de pacientes
        listaPacientes.appendChild(novoPaciente);
    }

    // Abrir e fechar a barra lateral
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menuIcon');

    menuIcon.addEventListener('click', function () {
        sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
    });
});