package com.srs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.srs.bean.RouteBean;
import com.srs.service.RouteService;

@RestController
@RequestMapping("/route")
@CrossOrigin(origins = "*")
public class RouteController {

    @Autowired
    private RouteService service;

    // ✅ ADD
    @PostMapping("/add")
    public String addRoute(@RequestBody RouteBean route,
                           @RequestParam String userType) {

        if (!userType.equals("A")) {
            return "Access Denied";
        }

        service.addRoute(route);
        return "Route Added Successfully";
    }

    // ✅ GET ALL
    @GetMapping("/all")
    public List<RouteBean> getAll() {
        return service.getAllRoutes();
    }

    // ✅ UPDATE
    @PutMapping("/update/{id}")
    public String update(@PathVariable String id,
                         @RequestBody RouteBean route,
                         @RequestParam String userType) {

        if (!userType.equals("A")) {
            return "Access Denied";
        }

        service.updateRoute(id, route);
        return "Route Updated Successfully";
    }

    // ✅ DELETE (FIXED RESPONSE)
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable String id,
                         @RequestParam String userType) {

        if (!userType.equals("A")) {
            return "Access Denied";
        }

        try {
            service.deleteRoute(id);
            return "Deleted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}