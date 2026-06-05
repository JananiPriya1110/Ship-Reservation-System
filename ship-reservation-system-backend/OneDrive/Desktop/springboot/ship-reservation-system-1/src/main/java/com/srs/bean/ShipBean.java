package com.srs.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ship")
public class ShipBean {

    @Id   // ✅ MUST be present
    private String shipId;

    private String shipName;
    private int seatingCapacity;
    private int reservationCapacity;
    private String imageUrl;

    // Getters and Setters

    public String getShipId() {
        return shipId;
    }

    public void setShipId(String shipId) {
        this.shipId = shipId;
    }

    public String getShipName() {
        return shipName;
    }

    public void setShipName(String shipName) {
        this.shipName = shipName;
    }

    public int getSeatingCapacity() {
        return seatingCapacity;
    }

    public void setSeatingCapacity(int seatingCapacity) {
        this.seatingCapacity = seatingCapacity;
    }

    public int getReservationCapacity() {
        return reservationCapacity;
    }

    public void setReservationCapacity(int reservationCapacity) {
        this.reservationCapacity = reservationCapacity;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}