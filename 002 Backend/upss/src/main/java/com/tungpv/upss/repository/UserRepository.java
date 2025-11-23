package com.tungpv.upss.repository;

import com.tungpv.upss.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    @Query(value = "SELECT * FROM users u WHERE u.username = ?1", nativeQuery = true)
    Users findByUsername(String username);

    @Query(value = "SELECT * FROM users u WHERE u.email = ?1", nativeQuery = true)
    Users findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
