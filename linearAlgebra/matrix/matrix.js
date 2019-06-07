const Vector = require('../vector/vector');
class Matrix{
    constructor(matrix){
        this.matrix = matrix;
        this.rows = matrix.length;
        this.cols = matrix[0].length;
    }
    gaussianElimenation(arr){
        arr = [];
        let x = 0;
        let j = 0;
       
        let copyMatrix = this.matrix;
       
       
       
        for(let i=0;i<this.rows-1;i++){
            for(let l = i+1;l<this.rows;l++){
                x = -1*copyMatrix[l][j]/copyMatrix[i][j];
               // arr.push(x);
                let a = [];
                for(let k=0;k<this.cols;k++){
                    a.push(x*copyMatrix[i][k]);
                }
            
                 for(let k=0;k<this.cols;k++){
                 let newElement = a[k] + copyMatrix[l][k];
                 copyMatrix[l][k] = newElement;

               }
            }
            // for(let k=0;k<this.cols;k++){
            //     let newElement = a[k] + copyMatrix[i+1][k];
            //     copyMatrix[i+1][k] = newElement;

            // }
             j++;
        }
        return copyMatrix;
    }
    
}

let h = new Matrix([
    [1,2,3],
    [4,5,6],
    [7,8,19]
]);
let g = []
console.log(h.gaussianElimenation(g))