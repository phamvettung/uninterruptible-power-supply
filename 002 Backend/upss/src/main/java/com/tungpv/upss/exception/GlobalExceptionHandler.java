package com.tungpv.upss.exception;

import com.tungpv.upss.dto.response.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class GlobalExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<MessageResponse> handlingException(Exception exception){
        MessageResponse response = new MessageResponse(CodeReturn.UNCATEGORIZED_EXCEPTION.getCode(), CodeReturn.UNCATEGORIZED_EXCEPTION.getMessage(), exception.getMessage());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(value = CustomException.class)
    ResponseEntity<MessageResponse> handlingCustomException(CustomException exception){
        MessageResponse response = new MessageResponse(exception.getCodeReturn().getCode(), exception.getCodeReturn().getMessage(), null);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<MessageResponse> handlingValidation(MethodArgumentNotValidException exception){
        String enumKey = exception.getFieldError().getDefaultMessage();
        CodeReturn errorCode = CodeReturn.INVALID_KEY;
        try {
            errorCode = CodeReturn.valueOf(enumKey);
        } catch (Exception e) {

        }
        MessageResponse response = new MessageResponse(errorCode.getCode(), errorCode.getMessage(), null);
        return ResponseEntity.badRequest().body(response);
    }
}
