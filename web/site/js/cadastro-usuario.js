const btnsalvar = document.getElementById("btnsalvar");
const txtemail = document.getElementById("txtemail");
const txtsenha1 = document.getElementById("txtsenha1");
const txtsenha2 = document.getElementById("txtsenha2");

const cadastrar = () =>{
    
    let email = txtemail.value;
    let senha = txtsenha1.value;
    let csenha = txtsenha2.value;
    let url = `http://localhost:3000/cadastrar`;

    if(senha !== csenha || senha.length > 7){
        
        alert("Senha incorreta");

        $("#frm-cadastro-login").attr("action","cadastro-login.html");

    }else{

        $.ajax({
            url: url,
            dataType: "json",
            method: 'POST',
            data:{
                email: email,
                senha: senha,
            },
            contentType: 'application/x-www-form-urlencoded',
            success: function (response) {

			}
        })
    }
}

const validarSenha = (senha) =>{

    
    txtsenha1.classList.add("erro");
}


btnsalvar.addEventListener('click', cadastrar);