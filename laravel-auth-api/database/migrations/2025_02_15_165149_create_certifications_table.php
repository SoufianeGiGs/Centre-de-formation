<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('category');
            $table->string('instructor');
            $table->string('duration');
            $table->integer('chapters_count');
            $table->integer('tests_count');
            $table->decimal('price', 8, 2);
            $table->string('image')->nullable();
            $table->date('issued_date');
            $table->integer('validity_period'); // Validity period in months
            $table->string('certification_code')->unique();
            $table->text('requirements')->nullable();
            $table->enum('status', ['active', 'expired', 'archived'])->default('active');
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certifications');
    }
};
