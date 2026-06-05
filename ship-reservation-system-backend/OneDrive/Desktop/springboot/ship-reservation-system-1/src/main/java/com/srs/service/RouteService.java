package com.srs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.srs.bean.RouteBean;
import com.srs.dao.RouteDao;

@Service
public class RouteService {

    @Autowired
    private RouteDao dao;

    // ✅ ADD
    public RouteBean addRoute(RouteBean route) {
        return dao.save(route);
    }

    // ✅ UPDATE
    public RouteBean updateRoute(String id, RouteBean route) {
        Optional<RouteBean> existing = dao.findById(id);

        if (existing.isPresent()) {
            route.setRouteId(id);
            return dao.save(route);
        } else {
            throw new RuntimeException("Route not found");
        }
    }

    // ✅ DELETE (FIXED)
    public void deleteRoute(String id) {
        try {
            dao.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete route. It is used in schedule.");
        }
    }

    // ✅ GET ALL
    public List<RouteBean> getAllRoutes() {
        return dao.findAll();
    }

    // ✅ GET BY ID
    public RouteBean getById(String id) {
        return dao.findById(id).orElse(null);
    }
}