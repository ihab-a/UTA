<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('playlists', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("description")->nullable();
            $table->boolean("private")->default(true);

            $table->foreignId("user")
                ->constrained("users", "id")
                ->onDelete("cascade")
                ->onUpdate("cascade");
            $table->unsignedBiginteger("file")->nullable();

            $table->foreign("file")
                ->references("id")
                ->on("files")
                ->onDelete("set null")
                ->onUpdate("cascade");
                
            $table->timestamps();
        });

        DB::statement('ALTER TABLE playlists ADD FULLTEXT(title)');
    }

    public function down(): void
    {
        Schema::dropIfExists('playlists');
    }
};
