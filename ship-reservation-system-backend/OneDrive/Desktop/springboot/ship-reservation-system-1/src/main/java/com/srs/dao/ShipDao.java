package com.srs.dao;

import com.srs.bean.ShipBean;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipDao extends JpaRepository<ShipBean, String> {
}