package com.srs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.srs.bean.ProfileBean;
import com.srs.dao.ProfileDao;

@Service
public class ProfileService {

    @Autowired
    private ProfileDao dao;

    // 🔹 Add Profile (Register User)
    public int addProfile(ProfileBean profile) {
        if (profile != null) {
            dao.save(profile);
            return 1;
        } else {
            return 0;
        }
    }

    // 🔹 Update Profile
    public int updateProfile(ProfileBean profile) {
        Optional<ProfileBean> opt = dao.findById(profile.getUserID());

        if (opt.isPresent()) {
            dao.save(profile);
            return 1;
        } else {
            return 0;
        }
    }

    // 🔹 Delete Profile
    public int deleteProfile(String userId) {
        if (userId != null) {
            dao.deleteById(userId);
            return 1;
        } else {
            return 0;
        }
    }

    // 🔹 View All Profiles
    public List<ProfileBean> selectAll() {
        return dao.findAll();
    }
    
    
    public ProfileBean selectById(String id) {
        return dao.findById(id).orElse(null);
    }

    
}