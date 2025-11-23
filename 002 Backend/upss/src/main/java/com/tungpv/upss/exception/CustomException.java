package com.tungpv.upss.exception;

public class CustomException extends RuntimeException{
    private CodeReturn codeReturn;

    public CustomException(CodeReturn codeReturn){
        super(codeReturn.getMessage());
        this.codeReturn = codeReturn;
    }

    public CodeReturn getCodeReturn() {
        return codeReturn;
    }

    public void setCodeReturn(CodeReturn codeReturn) {
        this.codeReturn = codeReturn;
    }
}
