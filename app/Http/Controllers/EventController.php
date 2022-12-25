<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Event;

class EventController extends Controller
{
    //
    public function show(){
		$user = Auth::user();
		$event_id = request('event_id');
		$events = [];
        if ($event_id) {
			try {
				// Validate the value...
				$events = Event::with('vehicle')
				->where('user_id','=', $user->id)
				->findOrfail($event_id);

			} catch (\Exception $e) {
				$msg = json_encode($e->getMessage(), true);
				return response()->json($msg);
				//return false;
			}


        }else {
            //dd($user->id);
			$data = Event::with('vehicle')
				->where('user_id','=', $user->id)
				->whereDate('start', '>=', request('start'))
				->whereDate('end',   '<=', request('end'))
				->get();
			
			
			foreach ($data as $row_event) {
				//var_dump($row_event->vehicle->type);
				$jsonurl = "https://parallelum.com.br/fipe/api/v1/" . $row_event->vehicle->type 
							. "/" . "marcas/" . $row_event->vehicle->brand 
							. "/" . "modelos/". $row_event->vehicle->model 
							. "/" . "anos/" . $row_event->vehicle->year;
				$json = file_get_contents($jsonurl);
				$vehicle = json_decode($json, TRUE);
   				
				//var_dump(json_decode($vehicle));
		
				$events[] = [
					'id'	=> $row_event->id, 
					'title' => $row_event->title . " - " . $vehicle["Modelo"],
					'start' => $row_event->start, 
					'end' 	=> $row_event->end,
					
				];
			}

			
	
    	}
		
		return response()->json($events);
	}


	public function action(Request $request){
    	if($request->ajax()){
    		if($request->requested == 'add'){
                
                $user = Auth::user();
                $input = $request->all();
                $input['user_id'] = $user->id;
    			
                $event = Event::create($input);
                
    			return response()->json($event);
                
    		} else if($request->requested == 'update'){
				$input = $request->all();
    			$vehicle = Event::find($request->event_id)->update($input);

    			return response()->json($vehicle);
    		} else if($request->requested == 'delete'){
    			$event = Event::find($request->event_id)->delete();

    			return response()->json($event);
    		}
    	}
    }
}
