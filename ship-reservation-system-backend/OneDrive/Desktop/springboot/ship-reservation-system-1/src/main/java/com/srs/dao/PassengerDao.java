package com.srs.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.srs.bean.PassengerBean;

@Repository
public interface PassengerDao extends JpaRepository<PassengerBean, Integer> {
}