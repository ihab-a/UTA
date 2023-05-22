<?php
namespace Database\Seeders;

use App\Models\Song;
use App\Models\User;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File as IlluminateFile;
use Illuminate\Database\Seeder;

class SongSeeder extends Seeder
{
    public function run(): void
    {
        $target = __DIR__ . "/../../example_songs";
        if (!file_exists($target)) {
            mkdir($target, 0777, true);
        }
        foreach (IlluminateFile::files("example_songs") as $file) {
            $name = $file->getBaseName();

            // save the path for use when reading the file
            $path = "seeded_song_" . hash("sha256", $name) . "." . $file->getExtension();

            // Check if the file already exists
            if (Storage::disk('public')->exists($path)) {
                echo "'$path' already exists, skipping...\n";
                continue; // Skip processing if the file already exists
            }

            $stream = fopen($file->getPathname(), 'r');

            Storage::disk('public')->put($path, $stream);

            fclose($stream);

            $file = File::create([
                "path" => $path,
                "name" => $name,
            ]);

            Song::factory()
                ->title($file->name)
                ->file($file->id)
                ->create();
        }
    }
}
