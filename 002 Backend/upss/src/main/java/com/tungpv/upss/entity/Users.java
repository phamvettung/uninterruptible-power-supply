package com.tungpv.upss.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Users")
public class Users implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserId")
    private int userId;

    @Column(name = "Lastname", columnDefinition = "NVARCHAR(50)")
    private String lastname;
    @Column(name = "Firstname", columnDefinition = "NVARCHAR(50)")
    private String firstname;

    @Column(name = "Username", length = 50, unique = true, nullable = false)
    private String username;

    @Column(name = "Password", columnDefinition = "VARCHAR(255)", nullable = false)
    @JsonIgnore
    private String password;

    @Column(name = "Email", columnDefinition = "NVARCHAR(50)", nullable = false, unique = true)
    private String email;

    @Column(name="Status")
    private boolean status;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="UserRole", joinColumns = @JoinColumn(name = "UserId"), inverseJoinColumns = @JoinColumn(name = "RoleId"))
    private Set<Role> roles = new HashSet<>();
}
