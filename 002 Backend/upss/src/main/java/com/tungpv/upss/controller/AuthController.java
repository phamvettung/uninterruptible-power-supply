package com.tungpv.upss.controller;

import com.tungpv.upss.dto.request.LoginRequest;
import com.tungpv.upss.dto.request.RefreshRequest;
import com.tungpv.upss.dto.request.SignupRequest;
import com.tungpv.upss.dto.response.JwtResponse;
import com.tungpv.upss.dto.response.MessageResponse;
import com.tungpv.upss.entity.ERole;
import com.tungpv.upss.entity.Role;
import com.tungpv.upss.entity.Users;
import com.tungpv.upss.exception.CodeReturn;
import com.tungpv.upss.exception.CustomException;
import com.tungpv.upss.security.CustomUserDetails;
import com.tungpv.upss.service.RoleService;
import com.tungpv.upss.service.UserService;
import com.tungpv.upss.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/v1/auth")
@Slf4j
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/refresh")
    public ResponseEntity<MessageResponse> refresh (@RequestBody RefreshRequest request){

        String username = jwtUtil.extractUsername(request.getRefreshToken());
        if (jwtUtil.isTokenValid2(request.getRefreshToken(), username)){
            String newAccessToken = jwtUtil.generateAccessToken(username);

            JwtResponse authorization = new JwtResponse(newAccessToken, request.getRefreshToken(), jwtUtil.getACCESS_TOKEN_EXPIRATION(), "Bearer ");
            CodeReturn errorCode = CodeReturn.REFRESH_SUCCESS;
            return ResponseEntity.status(errorCode.getStatusCode()).body(new MessageResponse(errorCode.getCode(), errorCode.getMessage() , authorization));
        }
        CodeReturn errorCode = CodeReturn.REFRESH_FAILED;
        return ResponseEntity.status(errorCode.getStatusCode()).body(new MessageResponse(errorCode.getCode(), errorCode.getMessage() , null));
    }

    @PostMapping("/login")
    public ResponseEntity<MessageResponse> login (@RequestBody LoginRequest loginRequest, HttpServletResponse response){

        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword() ));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            String accessToken = jwtUtil.generateAccessToken(userDetails.getUsername());
            String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());

            JwtResponse authorization = new JwtResponse(accessToken, refreshToken, jwtUtil.getACCESS_TOKEN_EXPIRATION(), "Bearer ");
            CodeReturn errorCode = CodeReturn.LOGIN_SUCCESS;
            return ResponseEntity.status(errorCode.getStatusCode()).body(new MessageResponse(errorCode.getCode(), errorCode.getMessage() , authorization));

        } catch (UsernameNotFoundException | BadCredentialsException e){
            CodeReturn errorCode = CodeReturn.USERNAME_PASSWORD_INCORRECT;
            return ResponseEntity.status(errorCode.getStatusCode()).body(new MessageResponse(errorCode.getCode(), errorCode.getMessage() ,e.getMessage()));
        } catch (AuthenticationException e){
            CodeReturn errorCode = CodeReturn.INVALID_CREDENTIALS;
            return ResponseEntity.status(errorCode.getStatusCode()).body(new MessageResponse(errorCode.getCode(), errorCode.getMessage(), e.getMessage()));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageResponse> register(@RequestBody @Valid SignupRequest signupRequest){

        if (userService.exitsByUsername(signupRequest.getUsername())) {
            CodeReturn errorCode = CodeReturn.USER_EXISTED;
            return ResponseEntity.status(errorCode.getStatusCode()).body(new MessageResponse(errorCode.getCode(), errorCode.getMessage(), null));
        }
        if (userService.exitsByEmail(signupRequest.getEmail())) {
            CodeReturn errorCode = CodeReturn.EMAIL_EXISTED;
            return ResponseEntity.status(errorCode.getStatusCode()).body(new MessageResponse(errorCode.getCode(), errorCode.getMessage(), null));
        }

        Users users = new Users();
        users.setLastname(signupRequest.getLastname());
        users.setFirstname(signupRequest.getFirstname());
        users.setUsername(signupRequest.getUsername());
        users.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        users.setEmail(signupRequest.getEmail());
        users.setStatus(signupRequest.isStatus());
        Set<String> strRoles = signupRequest.getRoles();
        Set<Role> roles = new HashSet<Role>();
        if(strRoles == null){
            //default role user
            Role userRole = roleService.findByRoleName(ERole.ROLE_USER).orElseThrow(() -> new CustomException(CodeReturn.USER_NOT_EXISTED));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin": {
                        Role adminRole = roleService.findByRoleName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new CustomException(CodeReturn.ROLE_NOT_EXISTED));
                        roles.add(adminRole);
                        break;
                    }
                    case "moderator": {
                        Role modRole = roleService.findByRoleName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new CustomException(CodeReturn.ROLE_NOT_EXISTED));
                        roles.add(modRole);
                        break;
                    }
                    case "user": {
                        Role userRole = roleService.findByRoleName(ERole.ROLE_USER)
                                .orElseThrow(() -> new CustomException(CodeReturn.ROLE_NOT_EXISTED));
                        roles.add(userRole);
                        break;
                    }
                    default:
                        throw new IllegalArgumentException("Unexpected value: " + role);
                }
            });
        }
        users.setRoles(roles);
        userService.saveOrUpdate(users);
        CodeReturn errorCode = CodeReturn.USER_REGISTERED;
        return ResponseEntity.status(errorCode.getStatusCode()).body(new MessageResponse(errorCode.getCode(), errorCode.getMessage(), users));
    }
}
