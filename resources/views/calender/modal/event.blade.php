<div class="modal fade " id="event" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">
                    <span class="iconify" data-icon="akar-icons:schedule"></span>
                    Modal title
                </h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            
            <form action="" id='form'>
                <div class="modal-body">
                    @csrf
                    <input type="hidden" name="requested" id="requested">
                    <input type="hidden" name="event_id" id="event_id" placeholder='event_id'>
                    <input type="hidden" name="start" id="start" placeholder='start'>
                    <input type="hidden" name="end" id="end" placeholder='end'>
                    

                    <div class="form-row"> <!-- veículos -->
                        <div class="form-group col"> 
                            <label class="col-form-label">Meus Veículos</label>                                
                            <select class="form-select" id="vehicle_id" name="vehicle_id" disabled required></select>
                        </div>
                    </div>

                    <div class="form-row"> <!-- descrição -->
                        <div class="form-group col"> 
                            <label class="col-form-label">Descrição</label>
                            <input type="text" class="form-control" id="title" name="title" disabled required>
                        </div>
                    </div>


                    <div class='form-row'> <!-- data e hora -->
                        <div class="form-group col">
                            <label for="date" >Data:</label>                                        
                            <input class="form-control" type="date" min="{{ date('Y-m-d') }}" name='date' id="date" disabled required>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" id="btn-update">Editar</button>
                    <button type="button" class="btn btn-danger" id="btn-delete">Remover</button>
                    <button type="submit" class="btn btn-success" id="btn-submit" disabled>Salvar</button>
                </div>
            </form>
        </div>
    </div>
</div>