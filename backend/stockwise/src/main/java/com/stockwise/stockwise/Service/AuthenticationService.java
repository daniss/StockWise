package com.stockwise.stockwise.Service;

import com.stockwise.stockwise.DTO.UserLoginDto;
import com.stockwise.stockwise.DTO.UserRegisterDto;
import com.stockwise.stockwise.Model.User;
import com.stockwise.stockwise.Repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public User signup(UserRegisterDto userRegisterDto) {
        User user = new User(userRegisterDto.getUsername(), userRegisterDto.getEmail(), passwordEncoder.encode(userRegisterDto.getPassword()));
        return userRepository.save(user);
    }

    public User authenticate(UserLoginDto userLoginDto) {
        User user = userRepository.findByEmail(userLoginDto.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException(userLoginDto.getEmail()));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        userLoginDto.getPassword()
                )
        );



        return user;
    }
}
