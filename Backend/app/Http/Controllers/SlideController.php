<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Slide;
use Illuminate\Support\Facades\Storage;

class SlideController extends Controller
{
    /**
     * Display a listing of the slides.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Slide::latest()->get());
    }

    /**
     * Show the form for creating a new slide.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // Not typically used in API-based controllers.
        return response()->json(['message' => 'Display form for creating a new slide (not used in API).']);
    }

    /**
     * Store a newly created slide in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|string',
            'link' => 'nullable|string|url',
            'order' => 'nullable|integer|min:0',
            'status' => 'required|boolean',
        ]);

        $slide = Slide::create($validated);

        return response()->json([
            'message' => 'Slide created successfully',
            'slide' => $slide,
        ], 201);
    }

    /**
     * Display the specified slide.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $slide = Slide::find($id);

        if (!$slide) {
            return response()->json(['message' => 'Slide not found'], 404);
        }

        return response()->json($slide);
    }

    /**
     * Show the form for editing the specified slide.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // Not typically used in API-based controllers.
        return response()->json(['message' => 'Display form for editing slide (not used in API).']);
    }

    /**
     * Update the specified slide in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $slide = Slide::find($id);

        if (!$slide) {
            return response()->json(['message' => 'Slide not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'sometimes|required|string',
            'link' => 'nullable|string|url',
            'order' => 'nullable|integer|min:0',
            'status' => 'sometimes|required|boolean',
        ]);

        $slide->update($validated);

        return response()->json([
            'message' => 'Slide updated successfully',
            'slide' => $slide,
        ]);
    }

    /**
     * Remove the specified slide from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $slide = Slide::find($id);

        if (!$slide) {
            return response()->json(['message' => 'Slide not found'], 404);
        }

        $slide->delete();

        return response()->json(['message' => 'Slide deleted successfully']);
    }

    /**
     * Upload slide image.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('slides', $imageName, 'public');
    
            return response()->json([
                'imageUrl' => Storage::url($path)
            ]);
        }
    
        return response()->json(['error' => 'No image uploaded'], 400);
    }
    
    /**
     * Get active slides for the swiper component.
     *
     * @return \Illuminate\Http\Response
     */
    public function getActiveSlides()
    {
        return response()->json(
            Slide::where('status', true)
                ->orderBy('order')
                ->get()
        );
    }
    
    /**
     * Reorder slides.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'slides' => 'required|array',
            'slides.*.id' => 'required|exists:slides,id',
            'slides.*.order' => 'required|integer|min:0'
        ]);
        
        $slides = $request->input('slides');
        
        foreach ($slides as $slideData) {
            Slide::where('id', $slideData['id'])->update(['order' => $slideData['order']]);
        }
        
        return response()->json(['message' => 'Slides reordered successfully']);
    }
}