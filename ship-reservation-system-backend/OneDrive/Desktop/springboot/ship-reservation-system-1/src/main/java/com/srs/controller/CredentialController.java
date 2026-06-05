package com.srs.controller;

import com.srs.bean.CredentialsBean;
import com.srs.service.CredentialService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class CredentialController {

    @Autowired
    private CredentialService service;

    // ✅ REGISTER
    @PostMapping("/register")
    public String register(@RequestBody CredentialsBean user) {

        if (user.getUserType() == null || user.getUserType().isEmpty()) {
            user.setUserType("U"); // default USER
        }

        return service.register(user);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public String login(@RequestBody CredentialsBean user) {

        CredentialsBean dbUser = service.login(
                user.getUserID(),
                user.getPassword()
        );

        if (dbUser == null) {
            return "INVALID";
        }

        if (dbUser.getUserType().equals("A")) {
            return "ADMIN_SUCCESS";
        }

        if (dbUser.getUserType().equals("U")) {
            return "USER_SUCCESS";
        }

        return "UNKNOWN";
    }
}