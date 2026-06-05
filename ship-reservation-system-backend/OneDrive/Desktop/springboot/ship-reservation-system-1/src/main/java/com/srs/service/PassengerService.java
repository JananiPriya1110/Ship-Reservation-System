package com.srs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.srs.bean.PassengerBean;
import com.srs.dao.PassengerDao;

@Service
public class PassengerService {

    @Autowired
    private PassengerDao repo;

    // ADD
    public PassengerBean addPassenger(PassengerBean passenger) {
        return repo.save(passenger);
    }

    // GET ALL
    public List<PassengerBean> selectAll() {
        return repo.findAll();
    }

    // DELETE
    public void deletePassenger(int id) {
        repo.deleteById(id);
    }
}