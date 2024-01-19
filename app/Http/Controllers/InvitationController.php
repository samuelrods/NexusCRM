<?php

namespace App\Http\Controllers;

use App\Http\Requests\AcceptInvitationRequest;
use App\Models\OrganizationInvitation;
use App\Models\User;
use Illuminate\Http\Request;

class InvitationController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'memberInfo' => ['required', 'string', 'max:255'],
        ]);

        $user = User::where('username', $validated['memberInfo'])
            ->orWhere('email', $validated['memberInfo'])
            ->first();

        // If the user does not exist, return an error.
        if (!$user) {
            return back()->withErrors([
                'memberInfo' => 'The user you are trying to add does not exist.',
            ]);
        }

        $organizationId = session('organization_id');

        // If the user is already a member of the organization, return an error.
        if ($user->memberships()->where('organization_id', $organizationId)->exists()) {
            return back()->withErrors([
                'memberInfo' => 'The user you are trying to add is already a member of the organization.',
            ]);
        }

        // Check if the user has an invitation to the organization.
        $invitation = $user->invitations()->where('organization_id', $organizationId)->first();

        // If the user has an invitation, return an error.
        if ($invitation) {
            return back()->withErrors([
                'memberInfo' => 'The user you are trying to add already has an invitation to the organization.',
            ]);
        }

        // Otherwise, create a new invitation.
        $user->invitations()->create([
            'organization_id' => $organizationId,
        ]);

        return back()->with('message', 'Invitation sent successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AcceptInvitationRequest $request, OrganizationInvitation $invitation)
    {
        $status = $request->input('status');

        if ($status) {
            $invitation->update(['status' => 'accepted']);

            $invitation->organization->memberships()->create([
                'user_id' => $invitation->user_id
            ]);

            return back()->with(['message' => 'Invitation accepted successfully.', 'type' => 'success']);
        }

        $invitation->update(['status' => 'declined']);

        return back()->with(['message' => 'Invitation successfully denied.', 'type' => 'failure']);
    }
}
