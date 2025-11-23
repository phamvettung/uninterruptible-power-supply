package com.tungpv.upss.service.impl;

import com.tungpv.upss.entity.ERole;
import com.tungpv.upss.entity.Role;
import com.tungpv.upss.repository.RoleRepository;
import com.tungpv.upss.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Optional<Role> findByRoleName(ERole roleName) {
        return roleRepository.findByRoleName(roleName);
    }
}
