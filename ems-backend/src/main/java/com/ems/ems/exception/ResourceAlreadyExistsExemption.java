package com.ems.ems.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ResourceAlreadyExistsExemption extends RuntimeException {
  public ResourceAlreadyExistsExemption(String message) {
    super(message);
  }
}
