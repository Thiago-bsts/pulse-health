        // Abrir o modal
        function openModal() {
            document.getElementById("myModal").style.display = "flex";
        }

        // Fechar o modal
        function closeModal() {
            document.getElementById("myModal").style.display = "none";
        }

        // Fechar o modal se clicar fora dele
        window.onclick = function(event) {
            var modal = document.getElementById("myModal");
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }