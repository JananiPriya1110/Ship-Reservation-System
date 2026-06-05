package com.srs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.srs.bean.PassengerBean;
import com.srs.service.PassengerService;

@RestController
@RequestMapping("/passenger")
@CrossOrigin(origins = "*")   // 🔥 VERY IMPORTANT for React
public class PassengerController {

    @Autowired
    private PassengerService service;

    // ✅ ADD PASSENGER
    @PostMapping("/add")
    public PassengerBean addPassenger(@RequestBody PassengerBean p) {
        return service.addPassenger(p);
    }

    // ✅ VIEW ALL (ADMIN ONLY)
    @GetMapping("/all")
    public Object getAll(@RequestParam String userType) {

        if (!"A".equals(userType)) {
            return "Access Denied: Only Admin can view passenger details";
        }

        return service.selectAll();
    }
    @DeleteMapping("/delete/{id}")
    public String deletePassenger(@PathVariable int id,
                                  @RequestParam String userType) {

        if (!userType.equals("A")) {
            return "Access Denied";
        }

        service.deletePassenger(id);

        return "Passenger Deleted Successfully";
    }
}