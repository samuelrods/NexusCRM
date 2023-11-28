<?php

namespace App\Policies;

use App\Enums\ClientPermissionsEnum;
use App\Models\Client;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ClientPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can(ClientPermissionsEnum::READ_CLIENTS->value);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Client $client): bool
    {
        return $user->can(ClientPermissionsEnum::READ_CLIENTS->value);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can(ClientPermissionsEnum::CREATE_CLIENTS->value);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Client $client): bool
    {
        return $user->can(ClientPermissionsEnum::UPDATE_CLIENTS->value);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Client $client): bool
    {
        return $user->can(ClientPermissionsEnum::DELETE_CLIENTS->value);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Client $client): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Client $client): bool
    {
        return false;
    }
}
