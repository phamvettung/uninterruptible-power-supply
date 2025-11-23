package com.tungpv.upss.service;

import com.tungpv.upss.entity.ERole;
import com.tungpv.upss.entity.Role;

import java.util.Optional;

public interface RoleService {
    Optional<Role> findByRoleName(ERole roleName);
}
