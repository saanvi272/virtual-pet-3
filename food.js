class Food{
    constructor(){
    this.foodStock;
    this.lastFed;
    this.image=loadImage("Milk.png");
    }

    getFoodStock(){
    var foodstockref = database.ref("food");
     foodstockref.on("value",function(data){
         foodS=data.val()
     });
    }

    updateStock(stock){
        database.ref("/").update({
            food:stock
        })
    }
    deductFood(){
        foodS=foodS-1;
    }

    display(){
        var x=80;
        var y=150;
        imageMode(CENTER);
        image(this.image,1100,50,50);
        if(foodS!=0){
            for(var i = 0;i<foodS;i++){
                if(i%10===0){
                    x=80;
                    y=y+90;
                }
                image(this.image,x,y,100,100);
                x=x+50;
            }
        }
    }

    bedroom(){
        background(bedroom,550,550);
    }
    garden(){
        background(garden,550,950);
    }
    washroom(){
        background(washroom,1100,600);
    }
}
