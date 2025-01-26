<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            // Remove expires_at column if it exists
            if (Schema::hasColumn('personal_access_tokens', 'expires_at')) {
                $table->dropColumn('expires_at');
            }
        });
    }

    public function down()
    {
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            $table->timestamp('expires_at')->nullable();
        });
    }
};