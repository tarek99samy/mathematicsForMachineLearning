//const Vector = require('../vector/vector');
//import  Vector  from './../vector/vector.js'
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
    dotProduct(...vectors){
       
        let y = 0;
        for(let i=0;i<vectors[0].length;i++){
            let x = 1;
            for(let j=0;j<vectors.length;j++){
                x *= vectors[j][i];
            }
            y += x;
        }
        return y;
    }
    add(...vectors){
        let n = vectors.length;
        let arr = [];
        for(let j=0;j<vectors[0].length;j++){
            let x =0;
            for(let i=0;i<n;i++){
               
                x += vectors[i][j];
            }
            arr.push(x);
      }
      
      return arr;
    }
    scale(vector,x){
        let arr = []
        for(let i=0;i<vector.length;i++){
            arr.push(vector[i] * x);
        }
        return arr;
    }
    norm(vector){
        let x = 0;
        for(let i=0;i<vector.length;i++){
            x += vector[i]*vector[i];
        }
        x = Math.sqrt(x);
        return x;
    }
    gaussianElimenation(){
        let arr = [];
        let x = 0;
        let j = 0;
       
        let copyMatrix = this.matrix.map(function(arr) {
            return arr.slice();
        });
       
       
       
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
    rowEchelonForm(){
        let copyMatrix = this.matrix.map(function(arr) {
            return arr.slice();
        });
       let col = 0;
       // get 1 and zero below it
       for(let i=0;i<this.rows;i++){
           if( col < this.cols ){
            for(let j=i+1;j<this.rows;j++){
                if(copyMatrix[i][col] != 0){
                let x =  copyMatrix[j][col]/copyMatrix[i][col];  
                for(let k=0;k<this.cols;k++){
                    copyMatrix[j][k] -= x*copyMatrix[i][k];
                }
            }
            }
            col++;
        }
       }
       return new Matrix(copyMatrix);
    }
    reducedRowEchelonFoem(){
            let copyMatrix = this.rowEchelonForm().matrix.map(function(arr) {
                return arr.slice();
            });;
               //let x = copyMatrix[i][col];
               //console.log(x)
              /* if(x == 0){
                   if(i<this.rows-1){
                       let ind = -1;
                       for(let g=i+1;g<this.rows;g++){
                        if( copyMatrix[g][col] != 0 ) ind = g;
                       }
                       if(ind!= -1){
                       let temp  = copyMatrix[i];
                       copyMatrix[i] = copyMatrix[ind];
                       copyMatrix[ind] = temp;
                       }else{
                           return -1;
                       }
                   }else{
                    return new Matrix(copyMatrix);
                   }
               }
                for(let j=0;j<this.cols;j++){
                    copyMatrix[i][j] /= x;
                }
                */
                for(let i=0;i<this.rows;i++){
                    for(let j=0;j<this.cols;j++){
                        if( copyMatrix[i][j] !== 0 ){
                            let x = copyMatrix[i][j];
                            // convert the leading non zero to one
                            for(let k=0;k<this.cols;k++){
                                copyMatrix[i][k] /= x;
                            }
                            let col = j;
                            let row = i;
                            // get zeroes in all of the cols except it
                            for(let h = 0;h<this.rows;h++){
                                let x = copyMatrix[h][col];
                                for(let k=0;k<this.cols;k++){
                                    if( h !== row ){
                                        copyMatrix[h][k] -= x*copyMatrix[row][k];
                                    }
                                }
                            }
                           break; 
                        }
                    }
                }
           return new Matrix(copyMatrix);
        
    }
    inverse(){
       let copyMatrix = this.matrix.map(function(arr) {
        return arr.slice();
    });
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
        let matrix1 = this.matrix.map(function(arr) {
            return arr.slice();
        });
        let matrix2 = matrixX.matrix.map(function(arr) {
            return arr.slice();
        });
        let sol = [];
        //console.log(this.cols , matrixX.rows)
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
    transpose(){
        let aa = [];
        for(let i=0;i<this.cols;i++){
            let a =[];
            for(let j=0;j<this.rows;j++){
                a.push(this.matrix[j][i]);

            }
            aa.push(a);
        }
        return new Matrix(aa);
    }
    determinant(){
        if(this.cols != this.rows) return -1;
        let copyMatrix = this.rowEchelonForm().matrix.map(function(arr) {
            return arr.slice();
        });;
       // console.log(copyMatrix)
        let m = 1;
        for(let i=0;i<this.rows;i++){
            m *= copyMatrix[i][i];
        }
        return m;
    }
    trace(){
        if(this.cols != this.rows) return NaN;
        let x = 0;
        for(let i=0;i<this.rows;i++){
            x += this.matrix[i][i];
        }
        return x;
    }
    gramSchmidt(){
        let copyMatrix = this.matrix.map((arr)=>{
            return arr.slice();
        });
        let copyMatrixTransposed = this.transpose().matrix.map((arr)=>{
            return arr.slice();
        });
        let a = [];
        let m = 0;
        // qm = bm - { qj.bm*qj }j = 1 => m-1
       
        for(let i=0;i<this.cols;i++){
            let bm = copyMatrixTransposed[m];
           // console.log(bm);
            let sum = [];   
            for(let j=0;j<m;j++){
                let h = this.dotProduct(a[j],bm);
                let y = this.scale(a[j],h);
               // console.log('qi ',a[j],' bi ', copyMatrixTransposed[j] ,' dot ',h)
                sum.push(y);
            }
            let qm = [];
            if( sum.length > 0 ){
                let s = this.add(...sum);
               // console.log('sum ',sum,' s ',s)
                s = this.scale(s,-1);
                qm = this.add(bm,s);
                //console.log('before norm ',qm)
            }else{
                qm = bm;
            }
            let normQ = this.norm(qm);
            if( normQ != 0 ){ 
                qm = this.scale(qm,1/normQ);
            }
            a.push(qm);
            m++;
           // console.log('qm '+qm);
        }
        return new Matrix(a).transpose()
    }
    QRfactorization(){
        // A = QR
        let Q = this.gramSchmidt();
        //console.log('Q',Q)
        let R = Q.transpose().multiplication(this);
        return {
            Q:Q,
            R:R
        }

    }
    QRAlgorithm(acc){
        if( this.rows == this.cols && this.determinant() != 0 ){
        let A = new Matrix(this.matrix);
        let QF = [];
        for(let i=0;i<acc;i++){
            let QR = A.QRfactorization();
            let Q = QR.Q;
            if(i==0){
                QF = Q;
               // console.log(QF)
            }else{
                QF = QF.multiplication(Q);
            }
            //let R = QR.R;
            A = Q.transpose().multiplication(A).multiplication(Q);
           // A.print()
           
        }
        let eigVal = [];
        for(let i=0;i<A.rows;i++){
            eigVal.push(A.matrix[i][i]);
        }
        return {
            matrix:A,
            eigVal:eigVal,
            QF:QF
        }
    }else{
        return -1;
    }
    }
}

let x = new Matrix([
    [52,30,49,28],
    [30,50,8,44],
    [49,8,46,16],
    [28,44,16,22]
   
])
//x.print()
//console.log(x.rowEchelonForm())
//console.log(x.reducedRowEchelonFoem())
//console.log(...x.matrix)
//let QR = x.QRfactorization();
//console.log(QR.Q,QR.R)
let z = x.QRAlgorithm(15);
console.log(z.eigVal)
z.QF.print()