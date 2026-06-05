package com.srs.bean;

import jakarta.persistence.*;

@Entity
@Table(name = "route")
public class RouteBean {

    @Id
    @Column(name = "route_id")
    private String routeId;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

    @Column(name = "travel_duration", nullable = false)
    private String travelDuration;

    @Column(nullable = false)
    private double fare;

    // ✅ Constructors
    public RouteBean() {}

    public RouteBean(String routeId, String source, String destination, String travelDuration, double fare) {
        this.routeId = routeId;
        this.source = source;
        this.destination = destination;
        this.travelDuration = travelDuration;
        this.fare = fare;
    }

    // ✅ Getters & Setters
    public String getRouteId() { return routeId; }
    public void setRouteId(String routeId) { this.routeId = routeId; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getTravelDuration() { return travelDuration; }
    public void setTravelDuration(String travelDuration) { this.travelDuration = travelDuration; }

    public double getFare() { return fare; }
    public void setFare(double fare) { this.fare = fare; }
}