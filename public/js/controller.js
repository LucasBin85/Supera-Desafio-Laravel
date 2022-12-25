export function getVehicles() {
    var cars = ""

    $.ajax({
        url: url+"/getVehicles",
        type:"GET",
        async: false,
        beforeSend: function () {
            //$("#btn-create").prop('disabled', true);
            //$('.spinner').show();
        },
        success:function(data){
            cars = data
        },
        error: function (){
            cars = false
        }
    })

    return cars
}


export function addVehicle(formdata) {
    let vehicleData = "";
    //console.log(formdata)
    $.ajax({
        url: url+"/vehicles/action",
        type:"POST",
        data: formdata,
        async: false,
        beforeSend: function () {

        },
        success:function(data){
            //console.log(data)
            vehicleData = data;
        },
        error: function (){
            vehicleData = false;
        }
    });
    
    return vehicleData
}


export function showCar(id) {
    
    let car= "";
    $.ajax({
        url: url+"/car/"+id,
        type:"GET",
        async: false,
        beforeSend: function () {
            //$("#btn-create").prop('disabled', true);
            //$('.spinner').show();
        },
        success:function(data){
            car = data
        },
        error: function (){
            car = false
        },
        
    })

    return car
}


export function storeEvent(eventForm) {
    
    let event = "";

    $.ajax({
        url: url+"/calender/action",
        type:"POST",
        data: eventForm,
        async: false,
        beforeSend: function () {
            let div = document.createElement('div')
            div.className = "spinner-border"
            div.setAttribute("role", "status")
            let span = document.createElement('span')
            span.className = "visually"
            span.innerHTML = 'Teste...'
            div.append(span)
            $(".modal-title").html(div)
        },
        success:function(data){
            event = data;
        },
        error: function (){
            event = false;
        },
        
    });

    return event;
}


export function getEvent(event_id) {
    let dataEvent = ""

    $.ajax({
        url: url+"/calender/event",
        type:"POST",
        data: {
            "event_id" : event_id,
            "_token"     : CSRF_TOKEN
        },
        async: false,
        beforeSend: function () {
            
        },
        success:function(data){
            dataEvent = data
        },
        error: function (){
            dataEvent = false
        },
        
    })

    return dataEvent
}

export function getEvents(start, end) {
    let dataEvents = ""
    console.log(start)
    $.ajax({
        url: url+"/calender/events?start="+start+"T00%3A00%3A00-03%3A00&"+"end="+end+"T00%3A00%3A00-03%3A00",
        type:"GET",
        async: false,
        beforeSend: function () {
            
        },
        success:function(data){
            dataEvents = data
        },
        error: function (){
            dataEvents = false
        },
        
    })

    return dataEvents
}