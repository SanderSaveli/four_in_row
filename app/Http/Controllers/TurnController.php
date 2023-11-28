<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TurnManager;

class TurnController extends Controller
{
    function makeMove(Request $request){
        $data = $request->json()->all();
        if (!empty($data) && is_array($data)) {
            $turnManager = new TurnManager();
            $invertedArray = $turnManager->MakeMove($data); 

            return response()->json([
                'number' => $invertedArray,
                'message' => 'Данные успешно обработаны'
            ]);
        } else {
            return response()->json(['message' => 'Массив не содержит данных'], 400);
        }
    }
}
