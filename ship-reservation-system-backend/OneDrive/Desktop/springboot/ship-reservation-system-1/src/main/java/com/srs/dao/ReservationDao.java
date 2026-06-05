package com.srs.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.srs.bean.ReservationBean;

public interface ReservationDao
        extends JpaRepository<ReservationBean, String> {

    boolean existsByScheduleIdAndBookingStatusNot(
            String scheduleId,
            String bookingStatus
    );
}