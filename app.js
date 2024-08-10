//here select some html elements..................
let submitBtn = document.querySelector("#sub");
let password = document.querySelector("#password");
let email = document.querySelector("#email")
let websiteName = document.querySelector("#website");
let checkInnerText = document.querySelector("#check");

let table = document.querySelector("table");

//here we how password in ****** ..................

const markPassword = (pass) =>{
    let str = "";
    for(let i= 0; i<pass.length ; i++){
        str += "*";
    };
    return str;
};
//here we are copy email and password..................

const copyicon = (copyText, check) => {
    navigator.clipboard.writeText(copyText);
    if (check === "email") {
        checkInnerText.innerText = check + " copyed";
    } else if (check === "password") {
        checkInnerText.innerText = check + " copyed";
    };
    setTimeout(() => {
        checkInnerText.innerText = "";
    }, 5000)
};

//function for delete buttons........................
const dataDelete = (userAccount) => {
    if (confirm(`You are sure for delete ${userAccount}'s  Account `)) {

        data = localStorage.getItem("data");
        arr = JSON.parse(data);

        let updateArr = arr.filter((e) => {
            return e.userAccount != userAccount;//here which button click the button userAccount not add in updataArr
        });

        localStorage.setItem("data", JSON.stringify(updateArr));
    }
    load()

};

let load = () => {

    let data = localStorage.getItem("data");
    if (data === null || JSON.parse(localStorage.getItem("data").length) == 0) {
        table.innerText = "No Data Found !!";
    } else {
        let arr = JSON.parse(data);

        table.innerHTML = `
      <tr>
                <th>Websit</th>
                <th>Email or Number</th>
                <th>Password</th>
                <th>Delete</th>
            </tr>
    `
        for (i = 0; i < arr.length; i++) {
            const element = arr[i];
            table.innerHTML += ` 
      <tr>
        <td>${element.userAccount}</td>
        <td> ${element.userEmail}<i onclick = "copyicon('${element.userEmail}','email')" class="fa-regular fa-copy"></i></td>
        <td>${markPassword(element.userPassword)}<i onclick = "copyicon('${element.userPassword}' ,'password')" class="fa-regular fa-copy"></i></td>
        <td><Button class="delBtn"  onclick= "dataDelete('${element.userAccount}')">Delete</Button></td>
    </tr>`;
        };
    };
}
load();

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    load();
    if (websiteName.value !== "" && email.value !== "" && password.value !== "") {
        let locdata = localStorage.getItem("data");

        //here set account datiels in localstorage.................
        if (locdata === null) {
            let json = [];
            json.push({ userAccount: websiteName.value, userEmail: email.value, userPassword: password.value });
            alert("Your Password Is saved")
            localStorage.setItem("data", JSON.stringify(json));


        } else {
            json = JSON.parse(localStorage.getItem("data"));
            json.push({ userAccount: websiteName.value, userEmail: email.value, userPassword: password.value });
            alert("Your Password Is saved");
            localStorage.setItem("data", JSON.stringify(json));
        };
        load();
        password.value = "";
        email.value = "";
        websiteName.value = "";
    } else {
        alert("Form is not filled !! please fill form");
    };
});
window.addEventListener("load", () => {

    password.value = "";
    email.value = "";
    websiteName.value = "";
});














