package com.srs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.srs.bean.ScheduleBean;
import com.srs.service.ScheduleService;

@RestController
@RequestMapping("/schedule")
@CrossOrigin(origins = "*")
public class ScheduleController {

    @Autowired
    private ScheduleService service;

    // ADD
    @PostMapping("/add")
    public String addSchedule(
            @RequestBody ScheduleBean schedule,
            @RequestParam String userType
    ) {

        if (!userType.equals("A")) {
            return "Access Denied";
        }

        service.addSchedule(schedule);

        return "Schedule Added Successfully";
    }

    // GET ALL
    @GetMapping("/all")
    public List<ScheduleBean> getAll() {
        return service.selectAll();
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public String update(
            @PathVariable String id,
            @RequestBody ScheduleBean schedule,
            @RequestParam String userType
    ) {

        if (!userType.equals("A")) {
            return "Access Denied";
        }

        schedule.setScheduleId(id);

        return service.updateSchedule(schedule);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String delete(
            @PathVariable String id,
            @RequestParam String userType
    ) {

        if (!userType.equals("A")) {
            return "Access Denied";
        }

        return service.deleteSchedule(id);
    }
}