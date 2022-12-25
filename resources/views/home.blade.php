@extends('adminlte::page')
@csrf


@section('plugins.Autocomplete', true)
@section('plugins.FontAwesome', true)
@section('plugins.Toastr', true)
@section('plugins.Iconify', true)
@section('plugins.FullCalendar', true)

@section('title', 'Home')

@section('content_header')
<div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
            <h1>Home</h1>
        </div>
        <div class="col-sm-6">
            <div class="breadcrumb float-sm-right">
                <button type="button" 
                    class="btn btn-outline-info" 
                    
                    id="btn-event">
                    Novo
                </button>

            </div>
        </div>
    </div>
</div><!-- /.container-fluid -->
@stop

@section('content')

            <div class="d-flex align-items-center" id="fc-spinner">
                <strong>Loading...</strong>
                <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div>
    <div class= "card card-solid" id="div_calendar">
        <div class="card-body pb-0">
            <div class="row">
                <div class="col-12 col-sm-6 col-md-12 d-flex align-items-stretch flex-column">
                    <div id="calendar" ></div>
                </div>
            </div>
        </div>
        <!-- /.card-body -->
    </div>
    <!-- /.card -->

<!-- Modal -->

@include('calender.modal.event')




@stop

@section('css')
<style>
    .ui-autocomplete{
	z-index: 1050 !important;
 }
</style>
@stop

@section('js')
<script type="text/javascript">
    // CSRF Token
    var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
    var url         = @json(url("/"));
    var route       = @json(Request::path());
    
</script>
    <script type="module" src="{{ url('/') }}/js/calendar.js" ></script>
@stop