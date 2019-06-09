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
    reducedEchelomForm(){
        let copyMatrix = this.matrix;
      
       let col = 0;
       // get 1 and zero below it
       for(let i=0;i<this.rows;i++){
           let x = copyMatrix[i][col];
           if(x == 0){
               if(i<this.rows-1){
                   let ind = -1;
                   for(let g=i+1;h<this.rows;g++){
                    if( copyMatrix[g][col] != 0 ) ind = g;
                   }
                   if(ind!= -1){
                   let temp  = copyMatrix[i];
                   copyMatrix[i] = copyMatrix[ind];
                   copyMatrix[ind] = temp;
                   }else{
                       return -1;
                   }
               }
           }
            for(let j=0;j<this.cols;j++){
                copyMatrix[i][j] /= x;
            }
            for(let j=i+1;j<this.rows;j++){
                let x = copyMatrix[j][col];
                for(let k=0;k<this.cols;k++){
                    copyMatrix[j][k] -= x*copyMatrix[i][k];
                }
            }
            col++;
       }
       return new Matrix(copyMatrix);
    }
    inverse(){
       let copyMatrix = this.matrix;
       // add identity
       for(let i=0;i<this.rows;i++){
           for(let j=0;j<this.cols;j++){
               if(j==i){
                   
                   copyMatrix[i].push(1);
               }else{

               copyMatrix[i].push(0);
               }
           }
       }
      // console.log(copyMatrix)
       let col = 0;
       // get 1 and zero below it
       for(let i=0;i<this.rows;i++){
           let x = copyMatrix[i][col];
          
           if(x == 0){
               if(i<this.rows-1){
                   let ind = -1;
                   for(let g=i+1;h<this.rows;g++){
                    if( copyMatrix[g][col] != 0 ) ind = g;
                   }
                   if(ind!= -1){
                   let temp  = copyMatrix[i];
                   copyMatrix[i] = copyMatrix[ind];
                   copyMatrix[ind] = temp;
                   }else{
                       return -1;
                   }
               }
           }
            for(let j=0;j<copyMatrix[0].length;j++){
                copyMatrix[i][j] /= x;
            }
            for(let j=i+1;j<this.rows;j++){
                let x = copyMatrix[j][col];
                for(let k=0;k<copyMatrix[0].length;k++){
                    copyMatrix[j][k] -= x*copyMatrix[i][k];
                }
            }
            col++;
       }
       //console.log(copyMatrix)
       // lvl up and get zeroes
       let curr = this.cols-1;
       for(let i=this.rows-1;i>=0;i--){
           for(let j=i-1;j>=0;j--){
                let x = copyMatrix[j][curr];
                for(let k=0;k<copyMatrix[0].length;k++){
                    copyMatrix[j][k] -= x*copyMatrix[i][k];
                }
           }
           curr--;
       }
       let m = [];
       for(let i=0;i<this.rows;i++){
           let t = [];
           for(let j=0;j<this.cols;j++){
                t.push(copyMatrix[i][j+this.cols]);
           }
           m.push(t)
       }
      // console.log(copyMatrix)
      return new Matrix(m);

    }
    multiplication(matrixX){
        let matrix1 = this.matrix;
        let matrix2 = matrixX.matrix;
        let sol = [];
        if( this.cols != matrixX.rows ) return -1;
        for(let i=0;i<this.rows;i++){
            sol.push([]);
            for(let j=0;j<matrixX.cols;j++){
                let no = 0;
                for(let k=0;k<matrixX.rows;k++){
                    no += matrix1[i][k]*matrix2[k][j];
                }
                 sol[i].push(no);
            }
        }
        return new Matrix(sol);
    }
}

let h = new Matrix([
   [1,2,3],
   [4,5,6]
]);
let k = new Matrix([
    [7,8],
    [9,10],
    [11,12]
])
console.log(h.multiplication(k))
//h.reducedEchelomForm()
//console.log(h.inverse())
//console.log(h.inverse())
//console.log(h.inverse())
// h.print()
 //let g = h.gaussianElimenation()
 //let x = h.solveLinearEquations();
// console.log(x)
//console.log(g['guassianMatrix'].print())