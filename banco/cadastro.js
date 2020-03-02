var btnCadastrar = document.getElementById("cadastrar");
var btnDeletar = document.getElementById("deletar");
var btnAtualizar = document.getElementById("atualizar");

var txtNome = document.getElementById("nome");
var txtEmail = document.getElementById("email");
var txtCelular = document.getElementById("celular");
const txtEnd = document.getElementById("endereco");
const txtNumero= document.getElementById("numero");
const txtBairro = document.getElementById("bairro");
const txtCidade = document.getElementById("cidade");
const txtCep = document.getElementById("cep");
const rdoSexo = document.getElementsByName("sexo");
const cmbEstado = document.getElementById("estado");

window.onload = mostrarBD();

// Constante cep vai receber uma função anonima que vai pegar o json retornado da api do viacep  
const cep = () =>{
	const url = `https://viacep.com.br/ws/${txtCep.value}/json/`;

	fetch (url).then(res => res.json()).then(dado => {
		txtBairro.value = dado.bairro
		txtCidade.value = dado.localidade
		txtEnd.value = dado.logradouro
	});
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

	return semErro;
};

const cadastrarAluno = () => {
	
	if (verificarCampos()){

		var nome = txtNome.value;
		var email = txtEmail.value;
		var celular = txtCelular.value;

		var url = 'http://127.0.0.1:3000/clientes';

		$.ajax({
			url: url,
			dataType: "json",
			method: 'post',
			data:{ Nome : nome, email : email, celular  : celular },
			contentType: 'application/x-www-form-urlencoded',
			
			success: function (result,status,request) {
				
				alert("Estado atual---\n" + status + "\nResultado: " + result);
				//Abaixo está listando os header do conteudo que você requisitou, só para confirmar se você setou os header e dataType corretos
				alert("Informações da requisição: \n" + request.getAllResponseHeaders());
				confirmationValue = result; //Repassa o retorno da requisição para teste futuro
			},
			error: function (request, status, erro) {
				alert("Problema ocorrido: " + status + "\nDescição: " + erro);
				//Abaixo está listando os header do conteudo que você requisitou, só para confirmar se você setou os header e dataType corretos
				alert("Informações da requisição: \n" + request.getAllResponseHeaders());
			},
			complete: function (jqXHR, textStatus) {
				alert("Chegou ao fim: : " + textStatus);
				//Exibindo o valor que você obeteve e repassou para o confirmationValue
				alert("Confirmation value: " + confirmationValue);
			}
		});
	
	verificarCampos();

	}else{
		alert ("Preencha os campos em destaque!")
	}
};

// function atualizarAluno(){

// 	const nome = txtNome.value;
// 	const email = txtEmail.value;
// 	const celular = txtCelular.value;

// 	const url = `http://127.0.0.1:3000/clientes/${codigo}`;

// 	$.ajax({

// 		url: url,
// 		dataType: "json",
// 		method: 'PATCH',
// 		data:{ id: codigo, nome : nome, email :email, celular  : celular },
// 		contentType: 'application/x-www-form-urlencoded',
		
// 		success: function (result,status,request) {
				
// 			alert("Estado atual---\n" + status + "\nResultado: " + result);
// 			//Abaixo está listando os header do conteudo que você requisitou, só para confirmar se você setou os header e dataType corretos
// 			alert("Informações da requisição: \n" + request.getAllResponseHeaders());
// 			confirmationValue = result; //Repassa o retorno da requisição para teste futuro
// 		},
// 		error: function (request, status, erro) {
// 			alert("Problema ocorrido: " + status + "\nDescição: " + erro);
// 			//Abaixo está listando os header do conteudo que você requisitou, só para confirmar se você setou os header e dataType corretos
// 			alert("Informações da requisição: \n" + request.getAllResponseHeaders());
// 		},
// 		complete: function (jqXHR, textStatus) {
// 			alert("Chegou ao fim: : " + textStatus);
// 			//Exibindo o valor que você obeteve e repassou para o confirmationValue
// 			alert("Confirmation value: " + confirmationValue);
// 		}
// 	});
// }

const cadastrarSalvar = () =>{
	// if (btnCadastrar.textContent == "Salvar"){
	// 	atualizarAluno();
		
	// }else{
		cadastrarAluno();
	// };
}


const atualizar = () =>{
	if(btnAtualizar.textContent === "Atualizar"){
		
		btnAtualizar.textContent = "Cancelar";
		btnCadastrar.textContent = "Salvar";
		btnDeletar.style.display = "none";

		preencherCampos();

	}else{
		btnDeletar.style.display = "inline";
		btnCadastrar.textContent = "Cadastrar";
		btnAtualizar.textContent = "Atualizar";
	}
	
	// alert(btnAtualizar.textContent);

	// console.log(btnAtualizar.textContent);

	// if(btnAtualizar.textContent == "Cancelar"){
	// 	mudarEstado("normal");
	// }else{
		
	// 	mudarEstado();
		// atualizarAluno();
	// }
}

// const mudarEstado = (estado) => {
// 	if(estado == "normal"){
// 		btnDeletar.style.display = "inline";
// 		btnCadastrar.textContent = "Cadastrar";
// 		btnAtualizar.textContent = "Atualizar";
// 	}else {
// 		btnDeletar.style.display = "none";
// 		btnCadastrar.textContent = "Salvar";
// 		btnAtualizar.textContent = "Cancelar";
// 	}
// }

function preencherCampos(){

	const codigo = prompt("Digite o código para modificar: ");

	const url = `http://127.0.0.1:3000/clientes/${codigo}`;

	$.ajax({

		url: url,
		dataType: "json",
		method: 'get',
		contentType: 'application/x-www-form-urlencoded',
		
		success: function (result,status,request){

			txtNome.value = result[0].Nome;
			txtEmail.value = result[0].email;
			txtCelular.value = result[0].celular;

			return result[0].Nome
		},
		error: function (request, status, erro) {
			alert("Problema ocorrido: " + status + "\nDescição: " + erro);
			//Abaixo está listando os header do conteudo que você requisitou, só para confirmar se você setou os header e dataType corretos
			alert("Informações da requisição: \n" + request.getAllResponseHeaders());
		},
		complete: function (jqXHR, textStatus,confirmationValue) {
			alert("Chegou ao fim: : " + textStatus);
			//Exibindo o valor que você obeteve e repassou para o confirmationValue
			alert("Confirmation value: " + confirmationValue);
		}
	});
}

// DELETAR USUÁRIOS

const deletarNome = () =>{

	const codigo = prompt("Digite o código para deletar:");

	const url = `http://127.0.0.1:3000/clientes/${codigo}`;

	$.ajax({
		url: url,
		dataType: "json",
		method: 'delete',
		contentType: 'application/json',
		
		success: function (response) {
			alert(response)
		}

	});
}

// TABELA USUÁRIOS

function mostrarBD(){
	
	var url = 'http://127.0.0.1:3000/clientes';
	$.ajax({
		url: url,
		dataType: "json",
		method: 'get',
		contentType: 'application/json',
		
		success: function (response) {
			
			const tabela = document.getElementById('bd');
			
			while (tabela.firstChild){
				tabela.removeChild(tabela.firstChild);
			};

			response.map((usuario) => tabela.insertAdjacentHTML("beforeend", `
			<tr>
				<td>${usuario.ID}</td>
				<td>${usuario.Nome}</td>
				<td>${usuario.email}</td>
				<td>${usuario.celular}</td>
			</tr>`));
		}
	});
}

// const atualizarCancelar = () =>{
// 	if (btnAtualizar.textContent == "Cancelar"){
// 		mudarEstado("normal");
// 	}else{
// 		mudarEstado("atualizar");
// 	}
// }

// const cancelarAtualizacao = () =>{
	
// }

const removerErro = (elem) =>{
	elem.classList.remove("erro");
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
// btnAtualizar.addEventListener('click', atualizarAluno);

txtNome.addEventListener("change", () => removerErro (txtNome));
txtEmail.addEventListener("change", () => removerErro (txtEmail));
txtCelular.addEventListener("change", () => removerErro (txtCelular));
txtNome.addEventListener("keyup", mascNome);
txtCelular.addEventListener("keyup", mascCelular);
txtCep.addEventListener('blur', cep);