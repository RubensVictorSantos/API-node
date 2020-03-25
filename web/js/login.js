const btnEntrar = document.getElementById("btnentrar");
const txtNome = document.getElementById("txtNome");
const txtSenha = document.getElementById("txtSenha");


const limparCampos = () =>{
	$(":input").val("");
}

const entrar = () =>{

    let url = `http://127.0.0.1:3000/login`;
    let nome = txtNome.value;
    let senha = txtSenha.value;

    $.ajax({
        url: url,
        dataType: "json",
        method: 'POST',
        data:{
            nome: nome,
            senha: senha,
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function (result) {

            let token = result.token

            sessionStorage.setItem('token', `${token}`);
            window.location.replace("file:///C:/Users/Rubens/Desktop/pessoal/node/web/index.html");
        },
		error: function (request, status, error) {

            if(request.status === 404){ 
                alert("Usuário invalido!");
                // limparCampos();
            }
        }
    });

    $("#frm-login").submit(function(event){
        event.preventDefault();
    });
}

btnEntrar.addEventListener('click', entrar);