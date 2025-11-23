package com.tungpv.upss.service;

import com.tungpv.upss.entity.Users;

import java.util.List;

public interface UserService {
    Users findByUsername(String userName);
    boolean exitsByUsername(String userName);
    boolean exitsByEmail(String email);
    Users saveOrUpdate(Users user);
    List<Users> getAll();
}
