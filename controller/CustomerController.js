import {customer_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";

//load customer records
 function loadCustomerTable(){

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
generateNextId();

// generate customer ids
 function generateNextId() {
    const nextId = 'C' + String(customer_db.length + 1).padStart(3, '0');
    $('#customer_id').val(nextId);
}

// save customer
$('#customer_save').on('click', function () {
    let id = $(`#customer_id`).val();
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

        loadCustomerTable();

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


    loadCustomerTable();
    generateNextId();
});


// update customer
$(`#customer_update`).on('click',function (){
    let id = $(`#customer_id`).val();
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
    }else if (selectedCustomerIndex !== -1){

        customer_db[selectedCustomerIndex] = {
            id: id,
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            address: address
        };

        loadCustomer();
        console.log(customer_db);

        Swal.fire({
            title: "Customer updated successfully..!",
            icon: "success",
            draggable: true
        });

        $('#first_name').val("");
        $('#last_name').val("");
        $('#email').val("");
        $('#phone').val("");
        $('#address').val("");

        //rest form and index
        $(`#customer_reset`).click();



    } else {
    Swal.fire({
        icon: "warning",
        title: "No customer selected!",
        text: "Please select a customer to update."
    });
}
});

//Reset form
$(`#customer_reset`).on('click',function (){
    generateNextId();
    $(`#searchCustomer`).val("");
    $('#first_name').val("");
    $('#last_name').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#address').val("");
});

//Delete Customer
let selectedCustomerIndex = -1; // declare globally if not yet

$('#customer_delete').on('click', function () {
    if (selectedCustomerIndex !== -1) {
        // Remove the selected customer from the database
        customer_db.splice(selectedCustomerIndex, 1);

        // Reload the updated customer list into the table
        loadCustomer();

        // Show a success alert
        Swal.fire({
            title: "Deleted!",
            text: "Customer has been deleted successfully.",
            icon: "success"
        });

        // Reset the form fields
        $('#first_name').val("");
        $('#last_name').val("");
        $('#email').val("");
        $('#phone').val("");
        $('#address').val("");

        // Generate a new ID for the next customer
        generateNextId();

        // Reset the selected index
        selectedCustomerIndex = -1;
    } else {
        Swal.fire({
            icon: "warning",
            title: "No Selection",
            text: "Please select a customer to delete."
        });
    }
});




// select a customer by clicking on a table row
$(`#customer_table`).on('click', 'tr', function () {
    const selectedCustomerIndex = $(this).index();
    const selectedCustomer = customer_db[selectedCustomerIndex];

    // Fill the form with the selected customer's data
    $('#customer_id').val(selectedCustomer.id);
    $('#first_name').val(selectedCustomer.fname);
    $('#last_name').val(selectedCustomer.lname);
    $('#email').val(selectedCustomer.email);
    $('#phone').val(selectedCustomer.phone);
    $('#address').val(selectedCustomer.address);

});

//search by email
$('#searchButton').on('click', function (e) {
    e.preventDefault();

    const emailInput = $('#searchCustomer').val().toLowerCase();
    let found = false;

    // Search for customer in customer_db
    customer_db.forEach((customer, index) => {
        if (customer.email.toLowerCase() === emailInput) {
            // Match found – fill the form
            $('#customer_id').val(customer.id);
            $('#first_name').val(customer.fname);
            $('#last_name').val(customer.lname);
            $('#email').val(customer.email);
            $('#phone').val(customer.phone);
            $('#address').val(customer.address);

            selectedCustomerIndex = index;
            found = true;
            return;
        }
    });

    if (!found) {
        Swal.fire({
            icon: "error",
            title: "Not Found!",
            text: "No customer found with that email."
        });

        // Optionally clear fields
        $('#customer_reset').click();
        $('#customer_form_fieldset').prop('disabled', true);
        selectedCustomerIndex = -1;
    }
});

