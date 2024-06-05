//total
//create product
//local storge
//clear
//read data
//count
//delete
//update
//search
//clean data


let title =document.getElementById('title');
let prices =document.getElementById('price');
let taxess =document.getElementById('taxes');
let adss =document.getElementById('ads');
let discount =document.getElementById('discount');
let totals =document.getElementById('total');
let count = document.getElementById('count');
let category =document.getElementById('category');
let create =document.getElementById('create');
let mood = 'create';
let tmp;
function getTotal()
{
    if (price.value != ''){
        let result = (+prices.value + +taxess.value + +adss.value)
        - +discount.value;
        totals.innerHTML = result; 
        totals.style.background = 'green';
    }
    else{
        totals.innerHTML = '';
        totals.style.background = 'red';   
    }
}

let dataPro;

if (localStorage.getItem('products') != null) {
    dataPro = JSON.parse(localStorage.getItem('products'));
} else {
    dataPro = [];
}

function createPro() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: prices.value,
        taxes: taxess.value,
        ads: adss.value,
        discount: discount.value,
        total: totals.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };


    if (title.value != '' && price.value != '' && category.value!='' &&  newPro.count <= 50 ){
        if(mood === 'create'){
            if(newPro.count > 1)
    {
        for(let i = 0 ; i < newPro.count ; i++){
            dataPro.push(newPro);
        } 
    }else {
        dataPro.push(newPro);
    }
        }else{
            dataPro[tmp] = newPro;
            mood = 'create';
            document.getElementById('create').innerHTML='create';
            count.style.display = 'block';
        } clearData();
    }

  


    
    localStorage.setItem('products', JSON.stringify(dataPro));
   
    
    showData();
}

function clearData (){
    title.value ='';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showData (){
    getTotal()
    let table ='';
    for (var i = 0 ;  i < dataPro.length ; i++)
    {
        
        table += `
        <tr>
                        <th scope="row">${i +1 }</th>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button type="button" onclick="updateData(${i})" class="btn btn-primary btn-sm" id="update-btn">Update</button></td>
                        <td><button type="button" onclick="deleteData(${i})" class="btn btn-danger btn-sm" id="delete-btn">Delete</button></td>
                      </tr>
        `
    }


    document.getElementById('tbody').innerHTML = table;
    let deletAll=document.getElementById('deletAll');
    if (dataPro.length > 0)
    {
        deletAll.innerHTML =`
         <button onclick="deleteAll()" class="btn btn-primary w-100 ">Delete ALL ${dataPro.length}</button>
         `
    }else{
        deletAll.innerHTML='';
    }
}
showData();

function deleteData(i){
    dataPro.splice(i,1)
    localStorage.products = JSON.stringify(dataPro)
    showData()
}
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0)
    showData()
}

function updateData(i) {
    title.value = dataPro[i].title;
    prices.value = dataPro[i].price;
    taxess.value = dataPro[i].taxes;
    adss.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    document.getElementById('create').innerHTML='update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
    
}
let searchMood = 'title';

function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title'
        search.placeholder = 'search by title'
    }else{
        searchMood = 'category'
        search.placeholder = 'search by category'
    }
    search.focus()
    search.value='';
    showData()
}
function searchByData(value){
    let table = '';
    if (searchMood === 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                 
        table += `
        <tr>
                        <th scope="row">${i +1 }</th>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button type="button" onclick="updateData(${i})" class="btn btn-primary btn-sm" id="update-btn">Update</button></td>
                        <td><button type="button" onclick="deleteData(${i})" class="btn btn-danger btn-sm" id="delete-btn">Delete</button></td>
                      </tr>
        `
            }
            
        }
    }


    else{
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                  console.log(i);
        table += `
        <tr>
                        <th scope="row">${i +1 }</th>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button type="button" onclick="updateData(${i})" class="btn btn-primary btn-sm" id="update-btn">Update</button></td>
                        <td><button type="button" onclick="deleteData(${i})" class="btn btn-danger btn-sm" id="delete-btn">Delete</button></td>
                      </tr>
        `
            }
            
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

