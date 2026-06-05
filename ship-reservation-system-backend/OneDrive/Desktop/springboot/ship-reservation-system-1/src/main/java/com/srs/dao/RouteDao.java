package com.srs.dao;

import com.srs.bean.RouteBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteDao extends JpaRepository<RouteBean, String> {
}