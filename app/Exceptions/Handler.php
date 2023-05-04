<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
// use Illuminate\Database\QueryException;
use Throwable;

class Handler extends ExceptionHandler
{
    public function render($req, Throwable $exception){
        if($exception instanceof ModelNotFoundException)
            return response() -> json(["error" => "not found"], 404);

        // database error
        // if($exception instanceof QueryException)
          // return response() -> json(["error" => "database error"], 500);
        
        if(!$exception instanceof HttpException)
            return parent::render($req, $exception);

        $status = $exception -> getStatusCode();
        $message = $exception -> getMessage();

        // if not found return the app ( the app handles the exception )
        if($status == "404"){
            if($req -> header("Accept") == "application/json")
                return response() -> json(["error" => "this endpoint was not found"], 404);
            return response() -> view("app");
        }

        if($status == "429")
            return response() -> json(["error" => "too many requests"], 429);

        if($status == "405")
            return response() -> json(["error" => $message], 405);

        return response() -> json(["error" => $message], $status);
    }
  /**
   * A list of exception types with their corresponding custom log levels.
   *
   * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
   */
  protected $levels = [
      //
  ];

  /**
   * A list of the exception types that are not reported.
   *
   * @var array<int, class-string<\Throwable>>
   */
  protected $dontReport = [
      //
  ];

  /**
   * A list of the inputs that are never flashed to the session on validation exceptions.
   *
   * @var array<int, string>
   */
  protected $dontFlash = [
      'current_password',
      'password',
      'password_confirmation',
  ];

  /**
   * Register the exception handling callbacks for the application.
   */
  public function register(): void
  {
      $this->reportable(function (Throwable $e) {
          //
      });
  }
}
