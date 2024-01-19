<?php

namespace App\Policies;

use App\Enums\ActivityPermissions;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ActivityPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can(ActivityPermissions::READ->value);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Activity $activity): bool
    {
        return $user->can(ActivityPermissions::READ->value) && $user->organizations->contains($activity->organization_id);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can(ActivityPermissions::CREATE->value);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Activity $activity): bool
    {
        return $user->can(ActivityPermissions::UPDATE->value) && $user->organizations->contains($activity->organization_id);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Activity $activity): bool
    {
        return $user->can(ActivityPermissions::DELETE->value) && $user->organizations->contains($activity->organization_id);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Activity $activity): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Activity $activity): bool
    {
        return false;
    }
}
