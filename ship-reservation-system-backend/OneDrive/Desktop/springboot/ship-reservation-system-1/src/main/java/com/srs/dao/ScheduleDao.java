package com.srs.dao;
import com.srs.bean.ScheduleBean;


import org.springframework.data.jpa.repository.JpaRepository;
public interface ScheduleDao extends JpaRepository<ScheduleBean, String> {

}

	