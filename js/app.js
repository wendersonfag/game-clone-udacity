// class item e usa como extação para class enemy e player
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
  
     
      // class enemy e usada para clicar o inimigos
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
       
        this.checkCollisions(player);
     
       
      }

    //verifica se teve a colisao entre o player e o enemy
    checkCollisions(jogador){
     
        if( (jogador.x  -40<= this.x &&  jogador.x  + 40 >=  this.x) &&
            (jogador.y  -50<= this.y && jogador.y  +50>= this.y)){
                
             jogador.reiniciarPos();
                
        }
        
        
    }

    
  }
  
 



// Agora escreva sua própria classe de jogador
// Esta classe requer uma atualização (), render () e
// um método handleInput ().
// class para criar o player
class Player extends Item{
    constructor(sprite, posCol, posRow){
        super(sprite, posCol, posRow);
    }

   
    update(dt){
        
        this.vitoria();
        
        
    }
    //verifica se foi utilizadas as teclas define qual posição o player vai
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
    //verifica se o player chegou até o rio e renicia o player na posição inial
    vitoria(){
        if(this.y <= 10){
           
            //tem alguma outra maneira de fazer com this.
            setTimeout( ()=> { this.reiniciarPos(); }, 350); 

        }
        
       
    }

    //Reinicia a posição do player
    reiniciarPos(){
        this.x = 202;
        this.y = 375;
    }

}





// Agora instancie seus objetos.

// Coloque o objeto jogador em uma variável chamada jogador
let player = new Player('images/char-boy.png',2,5);

//let enemy = new Enemy();
//enemy.checkCollisions(player);
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
