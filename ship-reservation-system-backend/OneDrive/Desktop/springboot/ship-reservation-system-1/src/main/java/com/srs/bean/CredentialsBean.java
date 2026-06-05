package com.srs.bean;

import jakarta.persistence.*;

@Entity
@Table(name = "credentials")
public class CredentialsBean {

    @Id
    @Column(name = "user_id")
    private String userID;

    private String password;

    @Column(name = "user_type")
    private String userType; // A or U

    @Transient
    private String newPassword; // for change password only

    // Getters & Setters

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
    
}