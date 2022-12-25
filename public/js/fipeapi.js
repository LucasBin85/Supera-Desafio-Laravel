

export function fipeBrands(type) {
    let brands = ""
    //console.log("teste")

    $.ajax({
        url: "https://parallelum.com.br/fipe/api/v1/"+type+"/marcas",
        type:   "GET",
        async: false,
        beforeSend: function () {
            //$("#btn-create").prop('disabled', true);
            //$('.spinner').show();
        },
        success:function(data){
            brands = data
        },
        error: function (){
            brands = false
        }
    });
    return brands;
}


export function fipeModels(type, brand) {
    let models = ""
    //console.log("teste")

    $.ajax({
        url: "https://parallelum.com.br/fipe/api/v1/"+type+"/marcas/"+brand+"/modelos",
        type:   "GET",
        async: false,
        beforeSend: function () {
            //$("#btn-create").prop('disabled', true);
            //$('.spinner').show();
        },
        success:function(data){
            models = data
        },
        error: function (){
            models = false
        }
    });
    return models;
}


export function fipeYears(type, brand, model) {
    let years = ""
    //console.log("teste")

    $.ajax({
        url: "https://parallelum.com.br/fipe/api/v1/"+type+"/marcas/"+brand+"/modelos/"+model+"/anos",
        type:   "GET",
        async: false,
        beforeSend: function () {
            //$("#btn-create").prop('disabled', true);
            //$('.spinner').show();
        },
        success:function(data){
            years = data
        },
        error: function (){
            years = false
        }
    });
    return years;
}


export function fipeValue(cars) {
    //console.log(cars)
    let carValue = ""

    $.ajax({
        url: "https://parallelum.com.br/fipe/api/v1/"+cars.type+"/marcas/"+cars.brand+"/modelos/"+cars.model+"/anos/"+cars.year,
        type:   "GET",
        async: false,
        beforeSend: function () {
            //$("#btn-create").prop('disabled', true);
            //$('.spinner').show();
        },
        success:function(data){
            carValue = data
        },
        error: function (){
            carValue = false
        }
    });
    return carValue;
}