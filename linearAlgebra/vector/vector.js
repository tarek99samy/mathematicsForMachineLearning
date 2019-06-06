class Vector {
    constructor(vector){
        this.vector = vector;
        this.size = vector.length;
    }
    unitVector(){
        let norm = this.norm();
        let arr =[];
        for(let i=0;i<this.size;i++){
            arr.push(this.vector[i]/norm);
        }
        return new Vector(arr);
    }
    add(...vectors){
        let n = vectors.length;
        let arr = [];
        for(let j=0;j<this.size;j++){
            let x = this.vector[j];
            for(let i=0;i<n;i++){
               
                x += vectors[i].vector[j] ;
            }
            arr.push(x);
      }
      let v = new Vector(arr);
      return v;
    }
    scale(x){
        let arr = []
        for(let i=0;i<this.size;i++){
            arr.push(this.vector[i] * x);
        }
        return new Vector(arr);
    }
    norm(){
        let x = 0;
        for(let i=0;i<this.size;i++){
            x += this.vector[i]*this.vector[i];
        }
        x = Math.sqrt(x);
        return x;
    }
    dotProduct(...vectors){
       
        let y = 0;
        for(let i=0;i<this.size;i++){
            let x = this.vector[i];
            for(let j=0;j<vectors.length;j++){
                x *= vectors[j].vector[i];
            }
            y += x;
        }
        return y;
    }
    theta(vector2){
        let theta = 0;
        let product = this.dotProduct(vector2);
        let norm1 = this.norm();
        let norm2 = vector2.norm();
        theta = Math.acos( (product)/(norm1*norm2) );
        return theta;
    }
    projection(vector2){
        let product = this.dotProduct(vector2);
        let norm1 = vector2.norm();
        return product/norm1; 
    }
    projectionVector(vector2){
        let arr = [];
        let proj = this.projection(vector2);
        let unity = vector2.unitVector();
        for(let i=0;i<this.size;i++){
            arr.push(unity.vector[i]*proj);
        }
        return new Vector(arr);
    }
}
let a = new Vector([1,2,3,4])
let b = new Vector([1,2,3,4])
let c = new Vector([1,2,3,4])
console.log( a.dotProduct(b))


