

import { 
    getVehicles,
    addVehicle,
    showCar,
    storeEvent,
    getEvent,
    getEvents
} from "/js/controller.js";

import { 
    fipeBrands,
    fipeModels,
    fipeYears,
    fipeValue
} from "/js/fipeapi.js";

document.addEventListener('DOMContentLoaded', function() {
    
    var date = new Date();
    var hours=(date.getHours())-4;
    let form = document.getElementById("form");

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale:'pt-br',
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
        },

        height: 650,
        selectable: true,

        events: url+'/calender/events',
        eventDisplay: 'block',
        displayEventTime: false,

        select: function(info) {
            createEvent()
            
        },
        eventClick: function(info){
            
            let event_id = info.event.id
            //console.log(event_id)
            $('.modal-body #event_id').val(event_id)

            let eventData = getEvent(event_id)
            vehicles()
            
            //console.log(eventData)
            $("#requested").val("")
            $("#vehicle_id").val(eventData.vehicle.id).change().prop('disabled', true)
            $("#title").val(eventData.title).change().prop('disabled', true)
            $("#date").val(dateFormatSql(eventData.start)).prop('disabled', true)
            let element = document.getElementById("date")
            element.classList.remove("is-valid")
            element.classList.remove("is-invalid")
            
            $("#btn-submit").hide()
            $("#btn-update, #btn-delete").show()
            $(".modal-title").html("Agendamento")

            $('#event').modal('show')
        },
    })

    function createEvent() {
        form.reset()
            
            vehicles()
            
            $(".modal-title").html('Agendamento')
            $("#requested").val('add')
            $("#status").val('1')
            $("#title, #date, #btn-submit").val('').prop('disabled', true)
            const current_date = new Date()
            let element = document.getElementById("date")
            element.classList.remove("is-valid")
            element.classList.remove("is-invalid")

            $("#btn-submit").show()
            $("#btn-update, #btn-delete").hide()
            
            $('#event').modal('show')
    }
    calendar.render()

    $("#btn-update").on("click", function () {
        $("#btn-submit").show().prop('disabled', false)
        $("#btn-update, #btn-delete").hide()
        $("#vehicle_id, #title, #date").prop('disabled', false)
        $("#requested").val("update")
        $(".modal-title").html("Editar Agendamento")
    })
    $("#btn-delete").on("click", function () {
        $("#btn-submit").show().prop('disabled', false)
        $("#btn-update, #btn-delete").hide()
        $("#requested").val("delete")
        $(" .modal-title").html("Remover Agendamento")
    })

    $("#btn-event").on("click", function () {
        createEvent() 
    })

    function vehicles() {
        let vehicles = getVehicles()
            //console.log(cars)
            if (vehicles) {
                $("#vehicle_id").text('').prop('disabled', false)
                let option = document.createElement("option")
                option.value = ""
                option.innerHTML = "Selecionar"
                $("#vehicle_id").append(option)
                for (let i = 0; i < vehicles.length; i++) {
                    let carValue = fipeValue(vehicles[i])
                    option = document.createElement("option")
                    option.value = vehicles[i].id
                    option.innerHTML = carValue.Modelo
                    $("#vehicle_id").append(option)
                    
                }
            } else{
                $("#vehicle_id").prop('disabled', true)
            }
    }
    

    $("#form").on("submit", function (event) {
        event.preventDefault()
        const actions = {add:"cadastrado", update:"alterado", delete0:"excluir", delete:"excluído"}
        let formdata = $( "#form" ).serializeArray()
        //console.log(formdata)
        let requested = $("#requested").val()

        let eventData = storeEvent(formdata)        
        
        if (eventData) {
            toastr.success('Agendamento ' + actions[requested] + ' com sucesso!')
            calendar.refetchEvents()
            $('#event').modal('hide')
            $(".modal-backdrop").remove()
            
        } else {
            console.log(eventData)
            toastr.warning('Verifique os campos')
        }
        
    })


    $('#vehicle_id').on('change', function() {
        let vehicle_id = $(this).val()
        
        if (vehicle_id) {
            $("#title").prop('disabled', false)
        } else {
            $("#title, #date, #btn-create").prop('disabled', true).val("")
        }

    })


    $('#title').on('keyup', function() {
        let title = $(this).val()
        //console.log(title)
        if (title) {
            $("#date").prop('disabled', false)
        } else {
            $("#date, #btn-create").prop('disabled', true)
        }

    })

    $('#date').on('change', function() {
        let element = document.getElementById("date")
        element.classList.remove("is-valid")
        element.classList.remove("is-invalid")
        let date = ($(this).val())
        //date = new Date(date[1]+"/"+date[2]+"/"+date[0])
        //console.log($(this).val())
        //console.log(date)
        let current_dt = dateFormatSql(new Date())
        //console.log(current_dt)

        if (date >= current_dt) {
            element.classList.add("is-valid")
            $("#btn-submit").prop('disabled', false)
            $("#start, #end").val(date)

        } else {
            element.classList.add("is-invalid")
            $("#btn-submit").prop('disabled', true)
            $("#start, #end").val('')
        }

    })



    function dateFormatSql(date) {
        let dt = new Date(date);
        return dt.getFullYear()+'-'+("00" + (dt.getMonth()+1)).slice(-2)+'-'+("00" + dt.getDate()).slice(-2);
    }
});

