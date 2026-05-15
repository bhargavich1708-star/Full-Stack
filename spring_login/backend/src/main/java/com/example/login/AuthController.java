package com.example.login;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Value("${spring.security.user.name}")
    private String correctUsername;

    @Value("${spring.security.user.password}")
    private String correctPassword;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (correctUsername.equals(request.getUsername()) && correctPassword.equals(request.getPassword())) {
            return ResponseEntity.ok(Map.of("message", "Success! You are logged in."));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Oops! Wrong name or password. Try again!"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        // Mocking a successful signup
        return ResponseEntity.ok(Map.of("message", "Yay! Welcome to the club, " + request.getUsername() + "! 🎉"));
    }

    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class SignupRequest {
        private String username;
        private String email;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
