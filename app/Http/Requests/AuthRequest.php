<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    use jsonFailedValidation;
    public function authorize(): bool
    {
        // AUTH_USER and AUTH_TOKEN are insured by the middleware Auth
        return true;
    }

    public function rules(): array
    {
        if($this -> method() === "POST")
            return [
                "email" => "required|email",    
                "password" => "required|string",    
            ];

        return [];
    }
}
