package com.srs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.srs.bean.ProfileBean;
import com.srs.service.ProfileService;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "*")   // ✅ ADD THIS LINE
public class ProfileController {

    @Autowired
    private ProfileService service;

    @PostMapping("/add")
    public int addProfile(@RequestBody ProfileBean profile) {
        return service.addProfile(profile);
    }

    @GetMapping("/all")
    public List<ProfileBean> getAll() {
        return service.selectAll();
    }
    
    
    @GetMapping("/{id}")
    public ProfileBean getById(@PathVariable String id) {
        System.out.println("Fetching profile for: " + id);
        return service.selectById(id);
    }

   
    @DeleteMapping("/delete/{id}")
    public int delete(@PathVariable String id) {
        return service.deleteProfile(id);
    }
}