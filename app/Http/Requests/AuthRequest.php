<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;

class AuthRequest extends FormRequest
{
    use jsonFailedValidation;
    public function authorize(): bool
    {
        // AUTH_USER and AUTH_TOKEN are insured by the middleware Auth
        $method = $this->method();

        if($method === "DELETE")
            return Hash::check($this->password, AUTH_USER->password);

        if($method === "PUT" && isset($this->password) && isset($this->oldPassword))
            return Hash::check($this->oldPassword, AUTH_USER->password);

        return true;
    }

    public function rules(): array
    {
        $url = $this->url();
        $method = $this->method();

        // signup
        if($method === "POST" && preg_match("/signup/", $url))
            return [
                "username" => "required|string|unique:users,username",
                "firstname" => "string",
                "lastname" => "string",
                "email" => "required|email|unique:users,email",
                "password" => "required|string|min:6",
            ];

        // login
        if($method === "POST" && preg_match("/login/", $url))
            return [
                "email" => "required|email",
                "password" => "required|string|min:6",
            ];

        if($method === "PUT")
            return [
                "username" => "string|unique:users,username",
                "firstname" => "string",
                "lastname" => "string",
                "email" => "email|unique:users,email",
                "password" => "string|min:6",
                "oldPassword" => "min:6" . (($this->password ?? false) ? "|required" : ""),
            ];

        if($method === "DELETE")
            return [
                "password" => "required|string|min:6",
            ];

        return [];
    }
}
