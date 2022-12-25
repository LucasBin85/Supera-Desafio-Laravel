<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Vehicle;

class VehicleController extends Controller
{
    //
    public function index(){
        $user = Auth::user();
        $vehicles = Vehicle::
        where('user_id','=', $user->id)
        ->get();

        return response()->json($vehicles);
    
    }

	public function show($id){
        //$account = Account::where('id','=',$id)->get();
        $vehicle = Vehicle::findOrfail($id);
        return response()->json($vehicle);
	}


    public function action(Request $request){
    	if($request->ajax()){
    		if($request->requested == 'add'){
                
                $user = Auth::user();
                $input = $request->all();
                $input['user_id'] = $user->id;
    			
                $vehicle = Vehicle::create($input);
                
    			return response()->json($vehicle);
                
    		} else if($request->requested == 'update'){
				$input = $request->all();
    			$vehicle = Vehicle::find($request->id)->update($input);

    			return response()->json($vehicle);
    		} else if($request->requested == 'delete'){

                try {
                    // Validate the value...
                    $vehicle = Vehicle::find($request->id)->delete();
                    return response()->json($vehicle);
                } catch (\Exception $e) {
                    $msg = json_encode($e->getMessage(), true);
                    return response()->json($msg);
                    //return false;
                }



    		}
    	}
    }


}
