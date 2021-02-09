const txtNome = document.getElementById("nome");
const txtEmail = document.getElementById("email");
const txtCelular = document.getElementById("celular");
const txtEndereco = document.getElementById("endereco");
const txtNumero = document.getElementById("numero");
const txtBairro = document.getElementById("bairro");
const txtCidade = document.getElementById("cidade");
const txtCep = document.getElementById("cep");
const rdoSexo = document.getElementsByName("sexo");
const cmbEstado = document.getElementById("estado");

window.onload = mostrarBD();

// TABELA USUÁRIOS

function mostrarBD() {

	let url = 'http://127.0.0.1:3000/cliente';
	const token = sessionStorage.getItem('token');

	$.ajax({
		url: url,
		dataType: "json",
		method: 'get',
		headers: { 'x-access-token': token },
		contentType: 'application/json',

		success: function (response) {

			let tabela = document.getElementById('bd');

			while (tabela.firstChild) {
				tabela.removeChild(tabela.firstChild);
			};

			response.map((usuario) => tabela.insertAdjacentHTML("beforeend", `
			<tr>
				<td>${usuario.id_cliente}</td>
				<td>${usuario.nome}</td>
				<td>${usuario.email}</td>
				<td>${usuario.celular}</td>
				<td>
					<button class="border-0 bg-light" >
						<svg class="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
				  		</svg>
					</button>
					<button class="border-0">
						<svg class="bi bi-eye" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"/>
							<path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
						</svg>
					</button>
					<input type="submit"/>
				</td>
			</tr>`)
			);
		}
	});
}