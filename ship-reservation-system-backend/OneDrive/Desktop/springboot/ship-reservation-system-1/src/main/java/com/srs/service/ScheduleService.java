package com.srs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.srs.bean.ScheduleBean;
import com.srs.dao.ReservationDao;
import com.srs.dao.ScheduleDao;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleDao dao;

    @Autowired
    private ReservationDao reservationDao;

    // ADD
    public void addSchedule(ScheduleBean schedule) {
        dao.save(schedule);
    }

    // GET ALL
    public List<ScheduleBean> selectAll() {
        return dao.findAll();
    }

    // GET BY ID
    public ScheduleBean selectById(String id) {
        return dao.findById(id).orElse(null);
    }

    // UPDATE
    public String updateSchedule(ScheduleBean schedule) {

        // check reservation exists
        boolean booked =
            reservationDao.existsByScheduleIdAndBookingStatusNot(
                schedule.getScheduleId(),
                "CANCELLED"
            );

        if (booked) {
            return "Cannot update. Schedule already booked.";
        }

        dao.save(schedule);

        return "Updated Successfully";
    }

    // DELETE
    public String deleteSchedule(String id) {

        // check reservation exists
        boolean booked =
            reservationDao.existsByScheduleIdAndBookingStatusNot(
                id,
                "CANCELLED"
            );

        if (booked) {
            return "Cannot delete. Schedule already booked.";
        }

        dao.deleteById(id);

        return "Deleted Successfully";
    }
}