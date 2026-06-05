package com.srs.bean;

import jakarta.persistence.*;

@Entity
@Table(name = "passengers")
public class PassengerBean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int passengerId;

    private String name;
    private int age;
    private String gender;
    private String contactNumber;

    // 🔗 Relationship with Reservation
    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private ReservationBean reservation;

    // Getters and Setters

    public int getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(int passengerId) {
        this.passengerId = passengerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public ReservationBean getReservation() {
        return reservation;
    }

    public void setReservation(ReservationBean reservation) {
        this.reservation = reservation;
    }
}