var btnCadastrar = document.getElementById("cadastrar");
var btnDeletar = document.getElementById("deletar");
var btnAtualizar = document.getElementById("atualizar");

const txtNome = document.getElementById("nome");
const txtEmail = document.getElementById("email");
const txtCelular = document.getElementById("celular");
const txtEndereco = document.getElementById("endereco");
const txtNumero= document.getElementById("numero");
const txtBairro = document.getElementById("bairro");
const txtCidade = document.getElementById("cidade");
const txtCep = document.getElementById("cep");
const rdoSexo = document.getElementsByName("sexo");
const cmbEstado = document.getElementById("estado");

window.onload = mostrarBD();
 
const cep = () =>{
	let url = `https://viacep.com.br/ws/${txtCep.value}/json/`;

	fetch (url).then(res => res.json()).then(dado => {
		txtBairro.value = dado.bairro
		txtCidade.value = dado.localidade
		txtEndereco.value = dado.logradouro
	});
}

//LIMPAR CAMPOS
const limparCampos = () =>{
	$(":input").val("");
}

const emailValido = (email) =>{
	const er = /[0-9a-z._-]+@[0-9a-z]+([.][a-z]+)+/
	return er.test(email);

	
};

const celularValido = (celular) =>{
	const er = /[(][0-9]{2}[)] ?9[0-9]{4}-[0-9]{4}/
	return er.test(celular);

}

const verificarCampos = () =>{
	
	let semErro = true;

	// Trim remove os espaços em branco
	if (txtNome.value.trim() == ""){
		txtNome.classList.add("erro");
		semErro = false;
		
	};

	if (!emailValido(txtEmail.value)){
		txtEmail.classList.add("erro");
		semErro = false;

	};

	if (!celularValido(txtCelular.value)){
		txtCelular.classList.add("erro");
		semErro = false;
	};

	if(semErro === false){

		$("#frm").submit(function(event){
			event.preventDefault();
		});
	}

	return semErro;
};

const cadastrarAluno = () => {
	
	if (verificarCampos()){

		let nome = txtNome.value;
		let email = txtEmail.value;
		let celular = txtCelular.value;
		let endereco = txtEndereco.value;
		let numero = txtNumero.value;
		let bairro = txtBairro.value;
		let cidade = txtCidade.value;
		let estado = cmbEstado.value;
		let cep = txtCep.value;
		let sexo = $("input[name='sexo']:checked").val();

		let url = 'http://127.0.0.1:3000/cliente';

		$.ajax({
			url: url,
			dataType: "json",
			method: 'POST',
			data:{ 
				nome 	: nome,
				email 	: email,
				celular : celular,
				endereco: endereco,
				numero 	: numero,
				bairro 	: bairro,
				cidade 	: cidade,
				estado 	: estado,
				cep 	: cep,
				sexo	: sexo
			},
			contentType: 'application/x-www-form-urlencoded',
			
			success: function (response) {
				mostrarBD();
				limparCampos();

			},
			error: function (request, status, erro) {
				console.log("Problema ocorrido: " + status + "\nDescição: " + erro);
				//Abaixo está listando os header do conteudo que você requisitou, só para confirmar se você setou os header e dataType corretos
				console.log("Informações da requisição: \n" + request.getAllResponseHeaders());
			}
		});
	
	verificarCampos();

	}else{
		alert("Preencha os campos em destaque!")
	}
};

function atualizarAluno(){

	let nome = txtNome.value;
	let email = txtEmail.value;
	let celular = txtCelular.value;
	let endereco = txtEndereco.value;
	let numero = txtNumero.value;
	let bairro = txtBairro.value;
	let cidade = txtCidade.value;
	let estado = cmbEstado.value;
	let cep = txtCep.value;
	let sexo = $("input[name='sexo']:checked").val();

	let id = sessionStorage.getItem('id');
	let url = `http://127.0.0.1:3000/cliente/${id}`;

	$('#cadastrar').click(function() {

		$("#frm").submit(function(event){
			event.preventDefault();
		});
	})

	$.ajax({

		url: url,
		dataType: "json",
		method: 'PATCH',
		data:{ 
			id		: id, 
			nome 	: nome, 
			email 	: email, 
			celular : celular,
			endereco: endereco,
			numero 	: numero,
			bairro 	: bairro,
			cidade 	: cidade,
			estado 	: estado,
			cep 	: cep,
			sexo	: sexo	
		},
		contentType: 'application/x-www-form-urlencoded',
		
		success: function (result,status,request) {
		
			limparCampos();
			mostrarBD();
			mudarEstado("normal");

			console.log("Estado atual---\n" + status + "\nResultado: " + result);
			//Abaixo está listando os header do conteudo que você requisitou, só para confirmar se você setou os header e dataType corretos
			console.log("Informações da requisição: \n" + request.getAllResponseHeaders());
			confirmationValue = result; //Repassa o retorno da requisição para teste futuro
		},
		error: function (request, status, erro) {
			console.log("Problema ocorrido: " + status + "\nDescição: " + erro);
			//Abaixo está listando os header do conteudo que você requisitou, só para confirmar se você setou os header e dataType corretos
			console.log("Informações da requisição: \n" + request.getAllResponseHeaders());
		},
		complete: function (jqXHR, textStatus) {
			console.log("Chegou ao fim: : " + textStatus);
			//Exibindo o valor que você obeteve e repassou para o confirmationValue
			console.log("Confirmation value: " + confirmationValue);
		}
	});
}

const cadastrarSalvar = () =>{
	if (btnCadastrar.textContent == "Salvar"){
		atualizarAluno();
		
	}else{
		cadastrarAluno();

	};
}

const atualizar = () =>{

	if(btnAtualizar.textContent === "Atualizar"){
		preencherCampos();
		mudarEstado("atualizar");

	}else if(btnAtualizar.textContent === "Cancelar"){
		limparCampos();
		mudarEstado("normal");
	}
}

const mudarEstado = (estado) => {
	if(estado == "normal"){
		btnDeletar.style.display = "inline";
		btnCadastrar.textContent = "Cadastrar";
		btnAtualizar.textContent = "Atualizar";
	
	}if(estado == "atualizar"){
		btnDeletar.style.display = "none";
		btnCadastrar.textContent = "Salvar";
		btnAtualizar.textContent = "Cancelar";
	}
}

const preencherCampos = () => {

	let codigo = parseInt(prompt("Digite o codigo do funcionário: "));

	while(isNaN(codigo)){
		codigo = parseInt(prompt("Codigo não existe! Digite novamente"));
	}

	let url = `http://127.0.0.1:3000/cliente/${codigo}`;
	sessionStorage.setItem('id', `${codigo}`);

	removerErro(txtNome, txtEmail,txtCelular);

	$.ajax({

		url: url,
		dataType: "json",
		method: 'GET',
		token: token,
		contentType: 'application/x-www-form-urlencoded',
		success: function (response){
			
			response.map((res) => {
				$('#nome').val(res.nome);
				$('#email').val(res.email);
				$('#celular').val(res.celular);
				$('#endereco').val(res.endereco);
				$('#numero').val(res.numero);
				$('#bairro').val(res.bairro);
				$('#cidade').val(res.cidade);
				$('#estado').val(res.estado);
				$('#cep').val(res.cep);

				if(res.sexo === 'm'){
					$('#masculino').prop("checked", true);

				}else{
					$('#feminino').prop("checked", true);

				}
			});
		},
		error: function (request, status, erro) {
			console.log("Problema ocorrido: " + status + "\nDescrição: " + erro);
			console.log("Informações da requisição: \n" + request.getAllResponseHeaders());

		},
	});

	$("#frm").submit(function(event){
		event.preventDefault();
	});
}

// DELETAR USUÁRIOS

const deletarNome = () =>{

	let codigo = prompt("Digite o código para deletar:");
	let url = `http://127.0.0.1:3000/cliente/${codigo}`;

	$.ajax({
		url: url,
		dataType: "json",
		method: 'delete',
		contentType: 'application/json',
		success: function (status){
			mostrarBD();
			console.log(status);

		},
		error: function(erro){
			console.log(erro);
		}
	});
}

// TABELA USUÁRIOS

function mostrarBD(){
	
	let url = 'http://127.0.0.1:3000/cliente';
	const token = sessionStorage.getItem('token');

	$.ajax({
		url: url,
		dataType: "json",
		method: 'get',
		headers: {'x-access-token': token},
		contentType: 'application/json',
		
		success: function (response) {
			
			let tabela = document.getElementById('bd');
		
			while (tabela.firstChild){
				tabela.removeChild(tabela.firstChild);
			};

			response.map((usuario) => tabela.insertAdjacentHTML("beforeend", `
			<tr>
				<td>${usuario.id}</td>
				<td>${usuario.nome}</td>
				<td>${usuario.email}</td>
				<td>${usuario.celular}</td>
			</tr>`)
			);
		}
	});
}

const removerErro = (elem1 = null, elem2 = null, elem3 = null) =>{
	
	const elementos = [elem1,elem2,elem3];

	for(let i in elementos.length){

		elementos[i].classList.remove("erro");
	}
}

const mascNome = () =>{
	let texto = txtNome.value;
	
	texto = texto.replace((/[^a-zA-Z À-Ÿ]/),"");
	txtNome.value = texto;
}

const mascCelular = () =>{
	let texto = txtCelular.value;

	texto = texto.replace(/[^0-9]/g,"");
	texto = texto.replace(/(^.)/,"($1");
	texto = texto.replace(/^(.{3})/,"$1) ");
	texto = texto.replace(/^(.{10})/,"$1-");
	txtCelular.value = texto;
}

btnCadastrar.addEventListener('click', cadastrarSalvar);
btnDeletar.addEventListener('click', deletarNome);
btnAtualizar.addEventListener('click', atualizar);
txtNome.addEventListener("change", () => removerErro (txtNome));
txtEmail.addEventListener("change", () => removerErro (txtEmail));
txtCelular.addEventListener("change", () => removerErro (txtCelular));
txtNome.addEventListener("keyup", mascNome);
txtCelular.addEventListener("keyup", mascCelular);
txtCep.addEventListener('blur', cep);