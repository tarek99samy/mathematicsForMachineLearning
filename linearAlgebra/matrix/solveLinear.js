const form = document.getElementById('noF');
const input = document.getElementById('noOfEqs');
let frame = document.getElementById('matrixInput');
let sub = document.getElementById('sub');
let reset = document.getElementById('reset');
let active = 0;
let n = 0;
form.addEventListener('click',(e)=>{
    if(active == 0){
    let no = Number(input.value);
    n = no;
    for(let i=0;i<no;i++){
        for(let j=0;j<no;j++){
            let inp = document.createElement('input');
            let name = document.createElement('label');
            name.classList.add('sp')
            if( j == no-1 ){
                name.innerText = 'X'+(j+1)+' = ';
            }else{
                name.innerText = 'X'+(j+1)+' + ';
            }
            
            name.classList.add('variable')
            inp.setAttribute('type','number');
            inp.classList.add('inM');
            frame.append(inp);
            frame.append(name);
        }
        let inp = document.createElement('input');
            
        inp.setAttribute('type','number');
        inp.classList.add('inM');
        frame.append(inp);
        frame.append(document.createElement('div'))
    }
    //sub.style.display= 'inine-block';
    active = 1;
    }
})
sub.addEventListener('click',()=>{
    let inps = document.querySelectorAll('.inM');
    let a = [];
    let c = [];
   let k = 0;
    for(let i=0;i<n;i++){
        for(let j=0;j<=n;j++){
            a.push(Number(inps[k].value))
         
            k++;
        }
        
        c.push(a);
        
        a = [];
    }

    console.log(c);
    let mat = new Matrix(c);
   let sol = mat.solveLinearEquations();
    for(let i=0;i<sol.length;i++){
        let span = document.createElement('span');
        span.classList.add('sp');
        span.innerText = 'x'+(i+1)+' = '+sol[i]+ '  , ';
        frame.append(span)
    }

})
reset.addEventListener('click',()=>{
    let inps = document.querySelectorAll('.inM');
    let ss = document.querySelectorAll('.sp');
    for(inp of inps){
        inp.parentNode.removeChild(inp);
    }
    for(inp of ss){
        inp.parentNode.removeChild(inp);
    }
    active = 0;
})
