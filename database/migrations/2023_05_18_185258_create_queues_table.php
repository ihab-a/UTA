<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('queues', function (Blueprint $table) {
            $table->foreignId("song")
                ->constrained("songs", "id")
                ->onDelete("cascade")
                ->onUpdate("cascade");

            $table->foreignId("user")
                ->constrained("users", "id")
                ->onDelete("cascade")
                ->onUpdate("cascade");

            $table->integer("time")->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('queues');
    }
};
