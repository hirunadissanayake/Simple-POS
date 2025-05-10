import {customer_db} from "../db/db";
import {CustomerModel} from "../model/CustomerModel";

//load customer records
function loadCustomer(){

    $('#customer_table').empty();

    customer_db.map((item, index) => {
        let fname = item.fname;
        let lname = item.lname;
        let email = item.email;
        let phone = item.phone;
        let address = item.address;

        let data = `<tr>
                             <td>${'C' + String(index + 1).padStart(3, '0')}</td> 
                             <td>${fname}</td>
                             <td>${lname}</td>
                             <td>${email}</td>
                             <td>${phone}</td>
                             <td>${address}</td>
                           </tr>`

        $('#customer_table').append(data);

    });
}

// to generate customer ids automatically
function generateNextId() {
    const nextId = 'C' + String(customer_db.length + 1).padStart(3, '0');
    $('#nextId').val(nextId);
}

// save customer
$('#customer_save').on('click', function () {
    let customer_id = $(`#customer_id`).val();
    let fname = $(`#first_name`).val();
    let lname = $(`#last_name`).val();
    let email = $(`#email`).val();
    let phone = $(`#phone`).val();
    let address = $(`#address`).val();

    if (fname === '' || lname === '' || email === '' || phone === '' || address === '') {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Please enter valid inputs..!"
        });
    }else{
        let customer_data = {
            id: id,
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            address: address
        };

        customer_db.push(customer_data);
        console.log(customer_db);

        loadCustomer();

        Swal.fire({
            title: "Customer Added successfully..!",
            icon: "success",
            draggable: true
        });
    }
    $('#first_name').val("");
    $('#last_name').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#address').val("");

    generateNextId();
});