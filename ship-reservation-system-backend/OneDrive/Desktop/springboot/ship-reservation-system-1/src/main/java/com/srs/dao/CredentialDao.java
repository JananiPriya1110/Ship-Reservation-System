package com.srs.dao;

import com.srs.bean.CredentialsBean;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CredentialDao extends JpaRepository<CredentialsBean, String> {

    CredentialsBean findByUserID(String userID);
}