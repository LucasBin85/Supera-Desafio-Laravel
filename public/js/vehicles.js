

import { 
    getVehicles,
    addVehicle,
    showCar
} from "/js/controller.js";

import { 
    fipeBrands,
    fipeModels,
    fipeYears,
    fipeValue
} from "/js/fipeapi.js";


$(document).ready(function () {
    const vehicleType = []
    vehicleType[1] = "Carro"
    vehicleType[2] = "Moto"
    vehicleType[3] = "Caminhão"

    function indexVehicles() {
        let cars = getVehicles()
        //console.log(cars)
        //let table = $("#list-cars").html()
        let table = document.createElement("table")
        table.className = "table table-hover"
        const th = ["id", "Tipo","Marca", "Modelo", "Ano", "Combustível"]
        let header = theadComponent(th)
        let tBody = table.createTBody()
    
        for (let i = 0; i < cars.length; i++) {
            let carValue = fipeValue(cars[i])
            //console.log(carValue)
            let cells = [
                cars[i].id,
                vehicleType[carValue.TipoVeiculo],
                carValue.Marca,
                carValue.Modelo,
                carValue.AnoModelo,
                carValue.Combustivel
            ]
    
            let row = trComponent(cells)
            row.setAttribute("class", "clickable-row")
            row.setAttribute("data-id", cars[i].id)
            row.setAttribute("data-bs-target", "#create")
            tBody.append(row)
        }
        table.append(header, tBody)
        $("#list-cars").html("")
        $('#list-cars table').remove()
        $("#list-cars").append(table)
        
        
        $(".clickable-row").on("click", function() {
            //console.log($(this).data('bs-target'))
            let car_id = $(this).data('id')
            let car = showCar(car_id)
            //console.log(car)
            //let carValue = fipeValue(car)
            
            $("#create .modal-title").html("Veículo")
    
            $("#id").val(car.id)
            $("#requested").val("")
            $("#type").val(car.type).change().prop('disabled', true)
            $("#brand").val(car.brand).change().prop('disabled', true)
            $("#model").val(car.model).change().prop('disabled', true)
            $("#year").val(car.year).change().prop('disabled', true)
    
            $("#btn-submit").hide()
            $("#btn-update, #btn-delete").show()
    
    
            $($(this).data('bs-target')).modal('show')
        
        })
    }

    indexVehicles()


    $("#btn-update").on("click", function () {
        $("#btn-submit").show()
        $("#btn-update, #btn-delete").hide()
        $("#type, #brand, #model, #year").prop('disabled', false)
        $("#requested").val("update")
        $("#create .modal-title").html("Editar Veículo")
    })

    $("#btn-delete").on("click", function () {
        $("#btn-submit").show()
        $("#btn-update, #btn-delete").hide()
        //$("#type, #brand, #model, #year").prop('disabled', false)
        $("#requested").val("delete")
        $("#create .modal-title").html("Remover Veículo")
    })

    $("#create_car").on("click", function () {
        let form = document.getElementById("form_car")
        form.reset()
        $("#type").prop('disabled', false)
        $("#requested").val("add")
        $("#create .modal-title").html("Cadastrar Veículo")
        $("#btn-update, #btn-delete").hide()
        $("#btn-submit").show()
    })

    $('#type').on('change', function() {
        let type = $(this).val()
        //console.log(type)
        let brands = fipeBrands(type)
        //console.log(brands)
        $("#brand, #model, #year").text("")
        
        if (brands ) {

            let option = document.createElement("option")
            option.value = ""
            option.innerHTML = "Selecionar"
            $("#brand").append(option)
            for (let i = 0; i < brands.length; i++) {
                option = document.createElement("option")
                option.value = brands[i].codigo
                option.innerHTML = brands[i].nome
                $("#brand").append(option)
                
            }
            $("#brand").prop('disabled', false)
            $("#model").prop('disabled', true)
            $("#year").prop('disabled', true)
            $("#btn-submit").prop('disabled', true)
        } else {
            $("#brand").prop('disabled', true)
            $("#model").prop('disabled', true)
            $("#year").prop('disabled', true)
            $("#btn-submit").prop('disabled', true)
        }

    })

    $('#brand').on('change', function() {
        let type = $("#type").val()
        let brand = $(this).val()
        //console.log(brand)
        let models = fipeModels(type,brand)
        models = models.modelos
        //console.log(models)
        $("#model").text("")
        $("#year").text("")
        if (models) {
            let option = document.createElement("option")
            option.value = ""
            option.innerHTML = "Selecionar"
            $("#model").append(option)
            for (let i = 0; i < models.length; i++) {
                option = document.createElement("option")
                option.value = models[i].codigo
                option.innerHTML = models[i].nome
                $("#model").append(option)
                
            }
            $("#model").prop('disabled', false)
            $("#year").prop('disabled', true)
            $("#btn-submit").prop('disabled', true)
        } else {
            $("#model").prop('disabled', true)
            $("#year").prop('disabled', true)
            $("#btn-submit").prop('disabled', true)
        }

    })

    $('#model').on('change', function() {
        let type = $("#type").val()
        let brand = $("#brand").val()
        let model = $(this).val()
        
        let years = fipeYears(type,brand,model)
        $("#year").text("")
        if (years) {
            let option = document.createElement("option")
            option.value = ""
            option.innerHTML = "Selecionar"
            $("#year").append(option)
            for (let i = 0; i < years.length; i++) {
                option = document.createElement("option")
                option.value = years[i].codigo
                option.innerHTML = years[i].nome
                $("#year").append(option)
                
            }
            $("#year").prop('disabled', false)
            $("#btn-submit").prop('disabled', true)
        } else {
            $("#year").prop('disabled', true)
            $("#btn-submit").prop('disabled', true)
        }

    })


    $('#year').on('change', function() {
        let year = $(this).val()
        
        if (year) {
            
            $("#btn-submit").prop('disabled', false)
        } else {
            $("#btn-submit").prop('disabled', true)
        }

    })


    $("#form_car").on("submit", function (event) {
        event.preventDefault()
        const actions = {add:"cadastrado", update:"alterado", delete0:"excluir", delete:"excluído"}
        let formdata = $( "#form_car" ).serializeArray()
        //console.log(formdata)
        let requested = $("#requested").val()

        let carData = addVehicle(formdata)        
        
        if (carData) {
            if (typeof(carData) == "string") {
                if (carData.includes("a foreign key constraint fails")) {
                    toastr.warning('Não foi possível ' + actions[requested+0] + ' o veículo, pois está vinculado a um ou mais agendamento.')                
                }            
            }
            else {
                toastr.success('Veículo ' + actions[requested] + ' com sucesso!')

            }

            $('#create').modal('hide')
            $(".modal-backdrop").remove()

            indexVehicles()
            
        } else {
            console.log(carData)
            toastr.warning('Verifique os campos')
        }
        
    })


    function theadComponent(header) {
        let thead = document.createElement("thead")
        let row = thead.insertRow()
    
        if (header) {
            for (let i = 0; i < header.length; i++) {
                let th = document.createElement("th")
                th.innerHTML = header[i]
                row.append(th)
            }        
        }
    
        return thead
    }

    function trComponent(cells) {

        let tr = document.createElement("tr")
    
        for (let i = 0; i < cells.length; i++) {
            let td = tr.insertCell()
            td.innerHTML = cells[i]
            //td.innerHTML = 
            //tr.append(td)
        }
    
        return tr
    }
})