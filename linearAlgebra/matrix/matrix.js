//const Vector = require('../vector/vector');
class Matrix {
    constructor(matrix){
        this.matrix = matrix;
        this.rows = matrix.length;
        this.cols = matrix[0].length;
    }
    print(){
        let s = ''
        for(let i=0;i<this.rows;i++){
           s += '| ';
            for(let j=0;j<this.cols;j++){
              s+= this.matrix[i][j]+' ';
            }
           s+= '| \n';
        }
        console.log(s)
    }
    gaussianElimenation(){
        let arr = [];
        let x = 0;
        let j = 0;
       
        let copyMatrix = this.matrix;
       
       
       
        for(let i=0;i<this.rows-1;i++){
            let arr1 = [];
            for(let l = i+1;l<this.rows;l++){
                x = -1*copyMatrix[l][j]/copyMatrix[i][j];
                for(let n=0;n<i;n++){
                    arr1.push(0)
                }
                arr1.push(x);
                let a = [];
                for(let k=0;k<this.cols;k++){
                    a.push(x*copyMatrix[i][k]);
                }
            
                 for(let k=0;k<this.cols;k++){
                 let newElement = a[k] + copyMatrix[l][k];
                 copyMatrix[l][k] = newElement;

               }
            }
            arr.push(arr1);
           
             j++;
            
        }
        return {
            'guassianMatrix': new Matrix(copyMatrix),
            'operationsArray': arr
        };
    }
    solveLinearEquations(){
        let sol = [];
         
        let guassianMatrix = this.gaussianElimenation()['guassianMatrix'];
        let guassianMatrixArray = this.gaussianElimenation()['guassianMatrix'].matrix;
        let curr = guassianMatrix.cols-2;
        let h = 0;
        for(let i=guassianMatrix.rows-1;i>=0;i--){
            let el = guassianMatrixArray[i][guassianMatrix.cols-1];
            let s = 0;
            for(let j=0;j<h;j++){
                el -= guassianMatrixArray[i][guassianMatrix.cols-2-j]*sol[j];
            }
            s = el/guassianMatrixArray[i][curr];
            curr--;
            h++;
            sol.push(s);
        }
        return sol.reverse();
    }
    
}

// let h = new Matrix([
//     [1,5,6,7],
//     [4,6,3,2],
//     [1,4,7,8],
// ]);
// h.print()
// let g = h.gaussianElimenation()
// let x = h.solveLinearEquations();
// console.log(x)
//console.log(g['guassianMatrix'].print())