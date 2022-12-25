@extends('adminlte::page')

@csrf

@section('plugins.Toastr', true)
@section('plugins.Select2', true)
@section('plugins.Datatables', true)

@section('title', 'Veículos')

@section('content_header')


<div class="container-fluid">
    <div class="row">
        <div class="col">
            @if(session('msg'))
            <div class="alert alert-success" role="alert">
                {{ session('msg')}}
            </div>
            @endif

            @yield('content')
        </div>

    </div>
    <div class="row mb-2">
        <div class="col-sm-6">
            <h1>Veículos</h1>
        </div>
        <div class="col-sm-6">
            <div class="breadcrumb float-sm-right">
                <button type="button" 
                    class="btn btn-outline-info" 
                    id='create_car'
                    data-bs-toggle="modal" 
                    data-bs-target="#create">
                    Novo
                </button>

            </div>
        </div>
    </div>
</div><!-- /.container-fluid -->
@stop

@section('content')


<!-- Default box -->
<div class="card card-solid">
    <div class="card-body pb-0">
        <div class="row">
            <div class="col-12 col-sm-6 col-md-12 d-flex align-items-stretch flex-column">
                
                <div class='table-responsive' id="list-cars"></div>
                
            </div>
        </div>
    </div>
    <!-- /.card-body -->
</div>
<!-- /.card -->



<!-- Modal -->

@include('vehicles.modal.create')
@include('vehicles.modal.show')



@stop

@section('css')

<!--
<link rel="stylesheet"  href="{{ url('/') }}/css/main.css">
-->
<style>
.clickable-row{
cursor:pointer;
}
</style>

@stop

@section('js')


<script type="module" src="{{ url('/') }}/js/vehicles.js" ></script>

<script type="text/javascript">
    var url         = @json(url("/"));
    var route       = @json(Request::path());

</script>
@stop