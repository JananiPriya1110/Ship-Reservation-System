package com.srs.bean;

import jakarta.persistence.*;

@Entity
@Table(name = "schedule")
public class ScheduleBean {

    @Id
    @Column(name = "schedule_id")
    private String scheduleId;

    @Column(name = "ship_id", nullable = false)
    private String shipId;

    @Column(name = "route_id", nullable = false)
    private String routeId;

    @Column(name = "start_date", nullable = false)
    private String startDate;

    // ✅ Constructors
    public ScheduleBean() {}

    public ScheduleBean(String scheduleId, String shipId, String routeId, String startDate) {
        this.scheduleId = scheduleId;
        this.shipId = shipId;
        this.routeId = routeId;
        this.startDate = startDate;
    }

    // ✅ Getters & Setters

    public String getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId;
    }

    public String getShipId() {
        return shipId;
    }

    public void setShipId(String shipId) {
        this.shipId = shipId;
    }

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }
}