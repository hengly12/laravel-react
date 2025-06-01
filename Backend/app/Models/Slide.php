<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slide extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'image',
        'link',
        'order',
        'status'
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'status' => 'boolean',
        'order' => 'integer',
    ];
    
    /**
     * Get active slides ordered by position.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getActiveSlides()
    {
        return self::where('status', true)
            ->orderBy('order')
            ->get();
    }
}