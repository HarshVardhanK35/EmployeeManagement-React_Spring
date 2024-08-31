package com.ems.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class EmployeeDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private Number contactNumber;


    public EmployeeDto(Long id, String firstName, String lastName, String email, String contactNumber, String address) {
    }
}
