// function Pessoa(_nome) {
//     this.Nome = _nome;
// }

// var rubens = new Pessoa('Rubens') 

// console.log(rubens)

// var carro = {
//     marca: "Ford",
//     modelo: "Ka",
//     getDetalhes: function () {
//         return this.marca + ' - ' + this.modelo;
//     }
// }

	
// carro.modelo = "Novo Ka";
// console.log(carro.getDetalhes());

// function Carro()
// {
//   var Marca = "Sem marca";
//   var Modelo = "Sem modelo";
//   this.SetMarca = SetMarca;
//   this.SetModelo = SetModelo;
//   this.ShowMarca = DisplayMarca;
//   this.ShowModelo = DisplayModelo; 
    
//   function DisplayMarca(){
//     console.log(Marca);
//   }
    
//   function DisplayModelo(){
//     console.log(Modelo);
//   }
    
//   function SetMarca(_marca) {
//     Marca = _marca;
//   }
    
//   function SetModelo(_modelo) {
//       Modelo = _modelo;
//   }
    
//   }
//   var carro = new Carro();
//   carro.SetMarca("Ford");
//   carro.SetModelo("Ka");
//   carro.ShowMarca(); 
//   carro.ShowModelo(); 


// carro = {
//     Marca : "Ford",
//     Modelo : "Ka",
//     Caracteristicas : ["Preto", 1.0, "2 portas"],
      
//     exibirDetalhes : function(){
//       console.log("Marca: " + this.Marca + " - Modelo: " + this.Modelo)
//     }  
// }
  
// carro.exibirDetalhes();
// console.log(carro.Caracteristicas[0])
   
var Pessoa = { nome : "Maria", idade : 30, sexo: "F" } 
  
var mapa = { 
    cantoSuperiorEsquerdo : { x : 1, y : 1 },
    cantoSuperiorDireito : { x : 10, y : 1 },
    cantoInferiorEsquerdo : { x : 1, y : 10 },
    cantoInferiorDireito : { x : 10, y : 10 }
}
  
console.log(mapa.cantoSuperiorDireito.y); 