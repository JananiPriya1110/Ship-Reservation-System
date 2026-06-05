package com.srs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.srs.bean.ReservationBean;
import com.srs.dao.ReservationDao;

@Service
public class ReservationService {

    @Autowired
    private ReservationDao dao;

    // ➤ Add Reservation
    public int addReservation(ReservationBean r) {

        if (r == null || r.getReservationId() == null) {
            return 0;
        }

        if (r.getBookingStatus() == null) {
            r.setBookingStatus("BOOKED");
        }

        if (r.getPaymentStatus() == null) {
            r.setPaymentStatus("NOT_PAID");
        }

        dao.save(r);
        return 1;
    }

    // ➤ Get All Reservations
    public List<ReservationBean> getAllReservations() {
        return dao.findAll();
    }

    // ➤ Get by ID
    public ReservationBean getById(String id) {
        Optional<ReservationBean> opt = dao.findById(id);
        return opt.orElse(null);
    }

    // ➤ Delete
    public int deleteReservation(String id) {
        if (dao.existsById(id)) {
            dao.deleteById(id);
            return 1;
        }
        return 0;
    }

    // ➤ Payment
    public String makePayment(String reservationId) {

        ReservationBean r = dao.findById(reservationId).orElse(null);

        if (r == null) {
            return "Reservation not found";
        }

        if ("CANCELLED".equals(r.getBookingStatus())) {
            return "Cannot pay for cancelled ticket";
        }
        
        

        r.setPaymentStatus("PAID");
        r.setBookingStatus("CONFIRMED");

        dao.save(r);

        return "Payment Successful";
    }
    public String cancelTicket(String reservationId) {

        ReservationBean r = dao.findById(reservationId).orElse(null);

        if (r == null) {
            return "Reservation not found";
        }

        r.setBookingStatus("CANCELLED");
        r.setPaymentStatus("REFUNDED");

        dao.save(r);

        return "Ticket Cancelled Successfully";
    }
}