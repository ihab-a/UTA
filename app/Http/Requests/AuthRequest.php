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
        // this is only used by signup
        if($this -> method() === "POST")
            return [
                "username" => "required|string",
                "email" => "required|email",
                "password" => "required|string|min:6",
            ];

        return [];
    }
}
