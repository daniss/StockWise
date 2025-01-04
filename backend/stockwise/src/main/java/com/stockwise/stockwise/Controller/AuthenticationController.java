package com.stockwise.stockwise.Controller;

import com.stockwise.stockwise.DTO.UserLoginDto;
import com.stockwise.stockwise.DTO.UserRegisterDto;
import com.stockwise.stockwise.Model.User;
import com.stockwise.stockwise.Response.LoginResponse;
import com.stockwise.stockwise.Service.AuthenticationService;
import com.stockwise.stockwise.Service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody UserRegisterDto userRegisterDto) {
        User registeredUser = authenticationService.signup(userRegisterDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody UserLoginDto userLoginDto) {
        User authenticatedUser = authenticationService.authenticate(userLoginDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verify() {
        return ResponseEntity.status(201).build();
    }
}
