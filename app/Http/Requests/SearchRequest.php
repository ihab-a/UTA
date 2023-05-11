<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    use JsonFailedValidation;
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $method = $this->method();

        if($method === "POST")
            return [
                "q" => "required|string",
            ];
            
        return [];
    }
}
