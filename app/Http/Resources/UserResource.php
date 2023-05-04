<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    static $wrap = false;
    public function toArray(Request $request): array
    {
        return [
            "username" => $this->username,
            "firstname" => $this->firstname,
            "email" => $this->email,
            "lastname" => $this->lastname,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
