// Inimigos nosso jogador deve evitar
class Item {
    constructor(sprite, posCol, posRow ) {
      this.sprite = sprite;
      this.x = posCol * 101;
      this.y = posRow * 75;

    }
    // Desenhe o inimigo na tela, método obrigatório para o jogo
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt){
        
    }
  }
  
     // Variáveis aplicadas a cada uma das nossas instâncias aqui,
      // nós fornecemos um para você começar
      // A imagem / sprite dos nossos inimigos, isso usa
      // um ajudante que fornecemos para carregar facilmente imagens
  class Enemy extends Item{
      constructor(sprite, posCol, posRow, speed){
          super(sprite, posCol, posRow, speed);
          this.speed = speed;
      }

      // Atualiza a posição do inimigo, método obrigatório para o jogo
    // Parâmetro: dt, um delta de tempo entre carrapatos
      update(dt){
        this.x += this.speed * dt * 45;
        if(this.x >= 505){
            this.x = -40 * this.speed;
        }
       
        this.checkCollisions();
       
       
      }


    checkCollisions(){
     
        if( (player.x  -40<= this.x &&  player.x  + 40 >=  this.x) &&
            (player.y  -50<= this.y && player.y  +50>= this.y)){
                
             player.reiniciarPos()
                
        }
    
        
    }

    
  }
  
 



// Agora escreva sua própria classe de jogador
// Esta classe requer uma atualização (), render () e
// um método handleInput ().
class Player extends Item{
    constructor(sprite, posCol, posRow){
        super(sprite, posCol, posRow);
    }

   
    update(dt){
        
        this.vitoria();
        
        
    }

    handleInput(tecla){

        switch(tecla){
            
            case('up'):
                this.y -= (this.y <= 5) ? 0: 83;
                break;
            case('left'):
                this.x -= (this.x <= 5) ? 0: 102;
                break;
                case('down'):
                this.y += (this.y >= 300 )? 0: 83;
                break;
            case('right'):
                this.x += (this.x >= 400)? 0: 102;
                break;
           
        }
    }

    vitoria(){
        if(this.y <= 10){
           
            setTimeout(function(){ player.reiniciarPos(); }, 350); 

        }
        
       
    }


    reiniciarPos(){
        this.x = 202;
        this.y = 375;
    }

}





// Agora instancie seus objetos.

// Coloque o objeto jogador em uma variável chamada jogador
let player = new Player('images/char-boy.png',2,5);

// Coloque todos os objetos inimigos em uma matriz chamada allEnemies

let allEnemies = [

    new Enemy('images/enemy-bug.png', -1, 1, 2),
    new Enemy('images/enemy-bug.png', -3, 2, 3),
    new Enemy('images/enemy-bug.png', -5, 3, 2),
    new Enemy('images/enemy-bug.png', -6, 1, 4),
    new Enemy('images/enemy-bug.png', -8, 2, 3),
    new Enemy('images/enemy-bug.png', -10, 3, 1),
  
  ];

// Isso escuta as teclas pressionadas e envia as chaves para o seu
// Método Player.handleInput (). Você não precisa modificar isso.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
