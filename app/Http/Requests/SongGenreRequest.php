<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SongGenreRequest extends FormRequest
{
    use JsonFailedValidation;
    public function authorize(): bool
    {
        return $this->song->user === AUTH_USER->id;
    }

    public function rules(): array
    {
        return [
            "genres" => "required",
            "genres.*" => "int|exists:genres,id",
        ];
    }
}
