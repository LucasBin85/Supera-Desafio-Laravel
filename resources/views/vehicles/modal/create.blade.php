<div class="modal fade" id="create" tabindex="-1" aria-hidden="true">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-info text-white">
                
                <h4 class="modal-title"></h4>
                
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                
            </div>

                <form class="needs-validation" id='form_car' method='POST' enctype="multipart/form-data">
                    @csrf
                    <div class="modal-body">
                        <input type="hidden" name="requested" id="requested">
                        <input type="hidden" name="id" id="id">

                        <div class="container shadow-sm p-3 mb-5 bg-white rounded">

                            <div class="form-row">
                                <div class="form-group col">
                                    <label class="col-form-label">Tipo</label>
                                    <select class="form-select" id="type" name="type">
                                        <option value="" selected>Selecionar</option>
                                        <option value="motos">Moto</option>
                                        <option value="carros">Carros</option>
                                        <option value="caminhoes">Caminhões</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-row"> <!-- select marca -->
                                <div class="form-group col"> 
                                    <label class="col-form-label">Marca</label>                                
                                    <select class="form-select" id="brand" name="brand" disabled></select>    
                                </div>
                            </div>

                            <div class="form-row"> <!-- select modelo -->
                                <div class="form-group col"> 
                                    <label class="col-form-label">Modelo</label>                                
                                    <select class="form-select" id="model" name="model" disabled></select>    
                                </div>
                            </div>

                            <div class="form-row"> <!-- select modelo -->
                                <div class="form-group col"> 
                                    <label class="col-form-label">Ano</label>                                
                                    <select class="form-select" id="year" name="year" disabled></select>    
                                </div>
                            </div>
    
                                                
                        </div> <!-- /container -->                     

                    </div> <!-- /modal-body -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" id="btn-update">Editar</button>
                        <button type="button" class="btn btn-danger" id="btn-delete">Remover</button>
                        <button type="submit" class="btn btn-outline-primary" id='btn-submit' disabled>Salvar</button>
                        
                    </div>
                
                </form>

            
        </div>
    </div>
</div>