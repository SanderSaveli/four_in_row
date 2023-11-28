<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TurnManager;

use function PHPUnit\Framework\isNull;

class TurnController extends Controller
{
    function makeMove(Request $request){
        $data = $request->json()->all();
        if (isset($data['field']) && isset($data['move']['circle'])) {
            $turnManager = new TurnManager();
            $answer = $turnManager->MakeMove($data); 

            return response()->json([
                'answer' => $answer,
                'message' => 'Данные успешно обработаны'
            ]);
        } else {
            return response()->json(['message' => 'Массив не содержит данных'], 400);
        }
    }
}
