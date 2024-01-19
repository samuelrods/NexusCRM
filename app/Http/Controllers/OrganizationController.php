<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\OrganizationMember;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $memberships = auth()->user()->memberships()->with(['organization.user'])->get();
        $invitations = auth()->user()->invitations()->where('status', 'pending')->with('organization.user')->get();

        return Inertia::render('Organizations', [
            'memberships' => $memberships,
            'invitations' => $invitations
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $organization = Organization::create([
            'name' => $request->name,
            'user_id' => auth()->id(),
            'created_at' => now(),
        ]);

        $organization->memberships()->save(OrganizationMember::make([
            'user_id' => auth()->id(),
        ]));

        // create a role for the owner
        Role::create([
            'name' => 'owner',
            'guard_name' => 'web',
            'organization_id' => $organization->id,
        ]);

        setPermissionsTeamId($organization->id);

        // assign the owner role to the owner
        $organization->user->syncRoles([$organization->roles->first()->name]);
        // $member->user->syncRoles($role->name);


        return to_route('organizations.index')->with(['message' => 'Organization created successfully!', 'type' => 'success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organization $organization)
    {
        $organization->roles->each(function ($role) {
            $role->delete();
        });
        $organization->delete();
        session()->forget('organization_id');
    }
}
