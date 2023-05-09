<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NotificationRequest extends FormRequest
{
    use JsonFailedValidation;
    public function authorize(): bool
    {
        $method = $this->method();

        if($method === "GET")
            return true;

        // when updating / deleting check notification belongs to user
        if(in_array($method, ["DELETE", "PUT"])){
            return $this->notification->user === AUTH_USER->id;
        }

        return false;
    }

    public function rules(): array
    {
        $method = $this->method();

        if($method === "PUT")
            return [
                "read" => "required|boolean",
            ];

        return [];
    }
}
