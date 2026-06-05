package com.srs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.srs.bean.CredentialsBean;
import com.srs.dao.CredentialDao;

@Service
public class CredentialService {

    @Autowired
    private CredentialDao repo;

    // ✅ LOGIN
    public CredentialsBean login(String userID, String password) {

        CredentialsBean dbUser = repo.findByUserID(userID);

        if (dbUser == null) return null;

        if (dbUser.getPassword().equals(password)) {
            return dbUser;
        }

        return null;
    }

    // ✅ REGISTER
    public String register(CredentialsBean user) {

        CredentialsBean existing = repo.findByUserID(user.getUserID());

        if (existing != null) {
            return "USER_ALREADY_EXISTS";
        }

        repo.save(user);
        return "REGISTER_SUCCESS";
    }
    public void save(CredentialsBean user) {
        repo.save(user);   // ✅ MUST exist
    }
}