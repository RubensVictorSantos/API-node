// import { response } from "express";

let btnCadastrar = document.getElementById("cadastrar");
let btnDeletar = document.getElementById("deletar");
const btnAtualizar = document.getElementById("atualizar");
const txtNome = document.getElementById("nome");
const txtEmail = document.getElementById("email");
const txtCelular = document.getElementById("celular");
const txtEnd = document.getElementById("endereco");
const txtNumero= document.getElementById("numero");
const txtBairro = document.getElementById("bairro");
const txtCidade = document.getElementById("cidade");
var txtCep = document.getElementById("cep");
const rdoSexo = document.getElementsByName("sexo");
const cmbEstado = document.getElementById("estado");

//variavel simula o campo numeracao automatica com chave primaria do bd
let codigo = 2;

//indice do aluno para atualizar
let indiceAluno = -1;

// Constante cep vai receber uma função anonima que vai pegar o json retornado da api do viacep  
const cep = () =>{
	const url = `https://viacep.com.br/ws/${txtCep.value}/json/`;

	fetch (url).then(res => res.json()).then(dado => {
		txtBairro.value = dado.bairro
		txtCidade.value = dado.localidade
		txtEnd.value = dado.logradouro
	});
}

const limparCampos = () =>{
	const campos = Array.from(document.querySelectorAll("input[type='text'], select"));
	campos.map(tag => tag.value = "");
	Array.from(rdoSexo).map(opt => opt.checked = false);
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

	alert(txtNome.value + "\n" + txtEmail.value + "\n" +txtNumero.value);
	
	if (verificarCampos()){
	codigo++;

		var nome = txtNome.value;
		var cpf = txtEmail.value;
		var senha = txtNumero.value;
		
		alert(nome + "\n" + cpf + "\n" +senha);

		var url = 'http://127.0.0.1:3000/clientes';
		$.ajax({
			url: url,
			dataType: "json",
			method: 'post',
			body:{ nome : nome, cpf : cpf, senha  : senha },
			contentType: '',
			
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

	limparCampos();
	
	verificarCampos();
	// mostrarBD();
	}else{
		alert ("Preencha os campos em destaque!")
	}
};

// const atualizarAluno = () => {
// 	const codigo = bd[indiceAluno].codigo;
	
// 	bd.splice (indiceAluno,1,{
// 	codigo: bd[indiceAluno].codigo,
// 	nome:txtNome.value,
// 	sexo:rdoSexo[0].checked ? "M":"F",
// 	email:txtEmail.value,
// 	celular:txtCelular.value,
// 	end:txtEnd.value,
// 	cidade:txtCidade.value,
// 	numero:txtNumero.value,
// 	bairro:txtBairro.value,
// 	uf: cmbEstado.value,
// 	cep:txtCep.value,
// 	});
// 	mudarEstado("normal");
// 	limparCampos();
// 	mostrarBD();
// }

const cadastrarSalvar = () =>{
	if (btnCadastrar.textContent == "Salvar"){
		// atualizarAluno();
	}else{
		cadastrarAluno();
	};
}

const mudarEstado = (estado) => {
	if(estado == "normal"){
		btnDeletar.style.display = "inline";
		btnCadastrar.textContent = "Cadastrar Aluno";
		btnAtualizar.textContent = "Atualizar Aluno";
	}else {
		btnDeletar.style.display = "none";
		btnCadastrar.textContent = "Salvar";
		btnAtualizar.textContent = "Cancelar";
	}
}

// const atualizarNome =() =>{

// 	const codigo = prompt("Digite o código para modificar: ");
	
// 	preencherCampos = (i) => {
// 		const iSexo = bd[i].sexo == "M"? 0 : 1;
// 		const iEstado = ["SP", "RJ", "MG", "ES"].indexOf(bd[i].uf);
		
// 		txtNome.value = bd[i].nome;
// 		rdoSexo[iSexo].checked = true;
// 		txtEmail.value = bd[i].email;
// 		txtCelular.value = bd[i].celular;
// 		txtEnd.value = bd[i].end;
// 		txtNumero.value = bd[i].numero;
// 		txtBairro.value = bd[i].bairro;
// 		txtCidade.value = bd[i].cidade;
// 		cmbEstado.selectedIndex = iEstado;
// 		txtCep.value = bd[i].cep;
			
// 	}
		
// 	indiceAluno = bd.findIndex(aluno=>aluno.codigo == codigo);
	
// 	if(indiceAluno == -1){
// 		alert("Aluno não encontrado!")
// 	}else{
// 		preencherCampos(indiceAluno);
// 		mostrarBD();
// 		mudarEstado("");
// 	}
// }

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
			console.log(`Usuário excluido com sucesso!`);
		}

	});

	mostrarBD();
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
			
			const tabela = document.getElementById('test');

			while (tabela.firstChild){
				tabela.removeChild(tabela.firstChild);
			}

			response.map((usuario) => tabela.insertAdjacentHTML("beforeend", `
			<tr>
				<td>${usuario.ID}</td>
				<td>${usuario.Nome}</td>
				<td>${usuario.CPF}</td>
				
			</tr>`));
		}
	});
}

// const atualizarCancelar = () =>{
// 	if (btnAtualizar.textContent == "Cancelar"){
// 		cancelarAtualizacao();
// 	}else{
// 		atualizarNome();
// 	}
// }

// const cancelarAtualizacao = () =>{
// 	mudarEstado("normal");
// 	limparCampos();
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

mostrarBD();

btnCadastrar.addEventListener('click', cadastrarSalvar);
btnDeletar.addEventListener('click', deletarNome);
// btnDeletar.addEventListener('click', teste);
// btnAtualizar.addEventListener('click', atualizarCancelar);
txtCep.addEventListener('blur', cep);
txtNome.addEventListener("change", () => removerErro (txtNome));
txtEmail.addEventListener("change", () => removerErro (txtEmail));
txtCelular.addEventListener("change", () => removerErro (txtCelular));
txtNome.addEventListener("keyup", mascNome);
txtCelular.addEventListener("keyup", mascCelular);
