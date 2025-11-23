package com.tungpv.upss.controller;

import com.tungpv.upss.dto.response.MessageResponse;
import com.tungpv.upss.entity.Users;
import com.tungpv.upss.exception.CodeReturn;
import com.tungpv.upss.service.UserService;
import com.tungpv.upss.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/v1/user")
public class UserController {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<MessageResponse> getAllUser(){
        List<Users> users = userService.getAll();
        CodeReturn errorCode = CodeReturn.SUCCESS;
        return ResponseEntity.status(errorCode.getStatusCode()).body(new MessageResponse(errorCode.getCode(), errorCode.getMessage() , users));
    }

    @GetMapping("/info")
    public ResponseEntity<MessageResponse> getUserInfo(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtUtil.extractUsername(token);
        Users user = userService.findByUsername(username);
        if(user != null){
            CodeReturn errorCode = CodeReturn.SUCCESS;
            return ResponseEntity.status(errorCode.getStatusCode()).body(new MessageResponse(errorCode.getCode(), errorCode.getMessage() , user));
        } else {
            CodeReturn errorCode = CodeReturn.USER_NOT_EXISTED;
            return ResponseEntity.status(errorCode.getStatusCode()).body(new MessageResponse(errorCode.getCode(), errorCode.getMessage() , null));
        }
    }
}
