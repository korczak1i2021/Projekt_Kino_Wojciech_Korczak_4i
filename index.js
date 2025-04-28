let rows
let cols
let seats = []
let editState = true

function redirect() {
    document.getElementById("generator").style.display = "none"
    document.getElementById("seats").style.display = "block"
}

function generateSeats() {
    for (let y = 0; y < rows; y++) {
        let row = []
        for (let x = 0; x < cols; x++) {
            row.push("w")
        }
        seats.push(row)
    }
}

function updateSeatsButtons() {
    let containerSeats = document.getElementById("container_seats")
    console.log(seats)
    let innerHTML = ''
    for (let y = 0; y < rows; y++) {
        innerHTML += '<div class="container_seats_row">'

        for (let x = 0; x < cols; x++) {
            if (seats[y][x] === 'w') {
                innerHTML += '<button class="container_seats_seat seat_empty" onclick = "reservarte(' + y + ',' + x + ') ">' + (y + 1) + '/' + (x + 1) + '</button>'
            }
            else if (seats[y][x] === 'e') {
                innerHTML += '<button class="container_seats_seat seat_chosen" onclick = "reservarte(' + y + ',' + x + ') ">' + (y + 1) + '/' + (x + 1) + '</button>'
            }
            else {
                innerHTML += '<button class="container_seats_seat seat_taken">' + (y + 1) + '/' + (x + 1) + '</button>'
            }
        }
        innerHTML += '</div>'
    }
    containerSeats.innerHTML=innerHTML
}

function generation() {
    rows = document.getElementById("rows").value
    cols = document.getElementById("cols").value

    redirect()
    generateSeats()
    updateSeatsButtons()
}

function reservarte(y, x) {
    if (editState === true) {
        if (seats[y][x] === 'w') {
            seats[y][x] = 'e'
        }
        else {
            seats[y][x] = 'w'
        }
        updateSeatsButtons()
    }
}

function chosenSeats() {
    let reseved = []
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (seats[y][x] === 'e') {
                reseved.push([y + 1, x + 1])
            }
        }
    }
    if (reseved.length === 0) {
        document.getElementsByClassName("container_seats_validation")[0].style.display = "block"
    }
    else {
        let seatList = document.getElementById('container_seats_list')
        seatList.innerHTML = "<ul>"
        for (let i = 0; i < reseved.length; i++) {
            seatList.innerHTML += '<li> rząd: ' + reseved[i][0] + ' miejsce: ' + reseved[i][1] + '&nbsp;<label for="list_checkbox_' + i + '"> bilet ulgowy: </label> <input type="checkbox" id="list_checkbox_' + i + '" class="list_checkbox"></li>'
        }
        "</ul>"
        document.getElementsByClassName("container_seats_reservation")[0].style.display = "block"
        document.getElementById("container_order").style.display = "block"
        editState = false
        document.getElementsByClassName("container_seats_validation")[0].style.display = "none"
        document.getElementsByClassName("container_buttons_button")[0].disabled=true
        document.getElementsByClassName("container_buttons_button")[1].disabled=false
    }
}


function changeChoise() {
    editState = true
    document.getElementsByClassName("container_seats_reservation")[0].style.display = "none"
    let seatList = document.getElementById('container_seats_list')
    seatList.innerHTML = ""
    document.getElementById("container_order").style.display = "none"
    document.getElementsByClassName("container_buttons_button")[1].disabled=true
    document.getElementsByClassName("container_buttons_button")[0].disabled=false
}

function blockPeakedSeats() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (seats[y][x] === 'e') {
                seats[y][x] = 'z'
            }
        }
    }
}

function placeOrder() {
    document.getElementById("container_new-order").style.display = "block"
    let container_price = document.getElementById("container_price")
    container_price.style.display = "block"
    let list_checkbox = document.getElementsByClassName("list_checkbox")
    let suma = 0
    for (let i = 0; i < list_checkbox.length; i++) {
        if (list_checkbox[i].checked === true) {
            suma += 25
        }
        else {
            suma += 30
        }
        list_checkbox[i].disabled = true
    }
    container_price.innerText = suma
    blockPeakedSeats()
    updateSeatsButtons()
    document.getElementsByClassName("container_buttons_button")[1].disabled=true
    document.getElementsByClassName("container_buttons_button")[0].disabled=true
    document.getElementById("container_order").disabled=true
}


function newOrder() {
    document.getElementsByClassName("container_buttons_button")[0].disabled=false
    document.getElementsByClassName("container_seats_reservation")[0].style.display = "none"
    document.getElementById('container_seats_list').innerHTML=''
    document.getElementById("container_new-order").style.display = "none"
    document.getElementById("container_price").innerHTML=''
    document.getElementById("container_order").style.display = "none"
    editState = true
    document.getElementById("container_order").disabled=false
}

