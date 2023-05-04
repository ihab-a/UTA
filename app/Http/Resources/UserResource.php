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
            "created" => $this->created_at,
            "updated" => $this->updated_at,
        ];
    }
}
