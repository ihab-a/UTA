<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $fillable = [
        "path",
        "name",
    ];

    static function _store($filename = "file")
    {
        $file = request()->file($filename);
        $name = $file->getClientOriginalName();

        // random hash
        $hash = hash("sha512", microtime() . FacadesRequest::ip() . rand() . $name);

        // save the path for use when reading the file
        $path = $hash . "." . $file->getClientOriginalExtension();

        $file->storeAs("public", $path);

        $file = File::create([
            "path" => $path,
            "name" => $name,
        ]);

        return $file;
    }

    static function _get($file)
    {
        // if file object is given don't fetch database
        if (!($file instanceof File))
            $file = File::findOrFail($file);

        $path = Storage::path('public/' . $file->path);

        return [
            "content" => file_get_contents($path),
            "headers" => [
                "Content-Type" => mime_content_type($path),
                "Content-Disposition" => "attachment; filename=\"{$file->name}\"",
            ],
        ];
    }
    static function _delete($file)
    {
        // if file object is given don't fetch database
        if (!($file instanceof File))
            $file = File::findOrFail($file);

        $file->delete();
        Storage::delete('public/' . $file->path);

        return $file;
    }
}
