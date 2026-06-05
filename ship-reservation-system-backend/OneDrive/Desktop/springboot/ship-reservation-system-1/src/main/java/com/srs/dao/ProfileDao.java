package com.srs.dao;
import com.srs.bean.ProfileBean;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProfileDao extends JpaRepository<ProfileBean, String> {
}