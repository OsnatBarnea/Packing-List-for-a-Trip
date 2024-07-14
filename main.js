//get elements:
const equipmentBox = document.getElementById("equipmentBox");
const amountBox = document.getElementById("amountBox");
const purchaseBox = document.getElementById('purchaseBox');
const container = document.getElementById("container");

equipmentBox.focus();

////when user type's the background color is default (even if validation was applied)
equipmentBox.addEventListener(`input`, function(){
equipmentBox.style.backgroundColor = "";
});

amountBox.addEventListener(`input`, function(){
amountBox.style.backgroundColor = "";
});

document.getElementById('subButton').addEventListener('click', function() {
document.getElementById('purchaseBox').selectedIndex = 0;
});





//array to get the user's list 
let equipmentList = [];

//load saved list from the local storage
function loadList(){
    const json = localStorage.getItem("equipmentList");

    if(!json) return;

    equipmentList = JSON.parse(json);

    addToTableList(equipmentList);
}


//add data from the user
function submit(){

    if (!validation()) return;
    

    const oneEquipment = {equipment: equipmentBox.value, 
                            amount: +amountBox.value, 
                            purchase:purchaseBox.value};

    equipmentList.push(oneEquipment);

    addToTableList(equipmentList);

    // equipmentBox.value = amountBox.value = purchaseBox.value = "";
    equipmentBox.focus();
    clear();
    saveList();
}


function clear(){
    equipmentBox.value = amountBox.value = purchaseBox.value.innerHTML = "";
    // purchase.checked = false; //clear
    equipmentBox.focus();
}

//missing items:
function validation(){
    // radioValue();
    if (!equipmentBox.value){
        alert("You did not enter the equipment name");
        equipmentBox.focus();
        equipmentBox.style.backgroundColor = "#FFD4C6";
        return false;
    }
    if (!amountBox.value){
        alert("Please enter the amount needed");
        amountBox.focus();
        amountBox.style.backgroundColor = "#FFD4C6";
        return false;
    }
    if (amountBox.value<=0){
        alert("Please enter a positive number");
        amountBox.focus();
        amountBox.style.backgroundColor = "#FFD4C6";
        return false;
    }
    if(purchaseBox.value === "select an option..."){
        alert("Please choose an option - do you need to purchase the item?");
                return false;
    }
    return true;
}

//present the list in table:
function addToTableList(equipmentList){

    if(equipmentList.length === 0) return;

   let html = `<table class="tableList">
                    <thead>
                        <tr class="row">
                            <th>Equipment</th>
                            <th>Amount</th>
                            <th>Purchase</th>
                            
                        </tr>    
                    </thead>        
                <tbody>`; 
    for (let i = 0; i < equipmentList.length; i++){
        html += `<tr class="bodyRow">
                    <td contentEditable>${equipmentList[i].equipment}</td>
                    <td contentEditable>${equipmentList[i].amount}</td>
                    <td contentEditable>${equipmentList[i].purchase}</td>
                    <td><button onclick="deleteItem(${i})" class="deleteButton"><img src="assets/images/trash.svg" class="trashImg" alt="delete"></button></td>
                 </tr>`;
    }            
    html += `</tbody></table>`;

    //add the list to the div
    container.innerHTML = html;

    // Hide delete buttons initially
let deleteButtons = document.querySelectorAll('.deleteButton');
deleteButtons.forEach(button => {
        button.style.visibility = 'hidden';
    });

        // Add hover effect to show delete button
        let bodyRow = document.querySelectorAll('.bodyRow');
        bodyRow.forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.querySelector('.deleteButton').style.visibility = 'visible';
            });
            row.addEventListener('mouseleave', () => {
                row.querySelector('.deleteButton').style.visibility = 'hidden';
            });
        });
}

function deleteItem(index){
    const sure = confirm("are you sure you want to delete " + equipmentList[index].equipment +"?");
    if(!sure) return;

    equipmentList.splice(index, 1);  

    addToTableList(equipmentList);

    saveList();
}




function saveList(){
    const json = JSON.stringify(equipmentList);

    localStorage.setItem("equipmentList", json);
}