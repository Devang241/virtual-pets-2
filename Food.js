class Food {
    constructor() {
        this.foodStock = 0;
        this.lastFed;
        this.milkImage = loadImage("images/Milk.png");
    }

    
    getFoodStock() {
        return this.foodStock;
    }

    
    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    
    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock - 1
            this.foodS=this.foodS-1
        }
    }

    getFedTime(lastFed) {
        this.lastFed = lastFed;
    }
    display() {
        var x = 80;
        var y = 100;
        imageMode(CENTER);
        image(this.milkImage, 250, 250, 70, 70);

        if (this.foodStock != 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 === 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.milkImage, x, y, 50, 50);
                x = x + 30;
            }
        }
    }

}

