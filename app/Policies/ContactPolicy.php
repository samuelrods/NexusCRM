<?php

namespace App\Policies;

use App\Enums\ContactPermissions;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ContactPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can(ContactPermissions::READ->value);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Contact $contact): bool
    {
        return $user->can(ContactPermissions::READ->value) && $user->organizations->contains($contact->organization_id);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can(ContactPermissions::CREATE->value);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Contact $contact): bool
    {
        $hasPermission = $user->can(ContactPermissions::UPDATE->value) && $user->organizations->contains($contact->organization_id);

        return  $hasPermission;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Contact $contact): bool
    {
        return $user->can(ContactPermissions::DELETE->value) && $user->organizations->contains($contact->organization_id);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Contact $contact): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Contact $contact): bool
    {
        return false;
    }

    /**
     * Perform pre-authorization checks on the model.
    */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('owner')) {
            return true;
        }

        return null; // see the note above in Gate::before about why null must be returned here.
    }
}
