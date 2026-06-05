package com.srs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.srs.bean.ReservationBean;
import com.srs.service.ReservationService;

@RestController
@RequestMapping("/reservation")
@CrossOrigin(origins = "*")   // ✅ IMPORTANT
public class ReservationController {

    @Autowired
    private ReservationService service;

    // ➤ Add Reservation
    @PostMapping("/add")
    public String add(@RequestBody ReservationBean r) {

        int result = service.addReservation(r);

        if(result == 1) {
            return "Reservation Added";
        }

        return "Failed";
    }

    // ➤ Get All
    @GetMapping("/all")
    public List<ReservationBean> getAll() {
        return service.getAllReservations();
    }

    // ➤ Get by ID
    @GetMapping("/{id}")
    public ReservationBean getById(@PathVariable String id) {
        return service.getById(id);
    }

    // ➤ Delete
    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {

        int result = service.deleteReservation(id);

        if(result == 1) {
            return "Deleted Successfully";
        }

        return "Not Found";
    }

    // ➤ Payment
    @PostMapping("/pay/{id}")
    public String pay(@PathVariable String id) {
        return service.makePayment(id);
    }

    // ➤ Cancel
    @PostMapping("/cancel/{id}")
    public String cancel(@PathVariable String id) {
        return service.cancelTicket(id);
    }
}