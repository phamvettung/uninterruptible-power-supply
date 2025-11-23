package com.tungpv.upss.service.impl;

import com.tungpv.upss.entity.Users;
import com.tungpv.upss.repository.UserRepository;
import com.tungpv.upss.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Users findByUsername(String userName) {
        return userRepository.findByUsername(userName);
    }

    @Override
    public boolean exitsByUsername(String userName) {
        return userRepository.existsByUsername(userName);
    }

    @Override
    public boolean exitsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public Users saveOrUpdate(Users user) {
        return userRepository.save(user);
    }

    @Override
    public List<Users> getAll() {
        return userRepository.findAll();
    }
}
