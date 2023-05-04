<?php
namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;

trait jsonFailedValidation{
	protected function failedValidation(Validator $validator){
		response() -> json($validator -> errors(), 400) -> send();
		exit();
	}
	protected function failedAuthorization(){
	  throw new HttpException(403, "access denied");
	}
}