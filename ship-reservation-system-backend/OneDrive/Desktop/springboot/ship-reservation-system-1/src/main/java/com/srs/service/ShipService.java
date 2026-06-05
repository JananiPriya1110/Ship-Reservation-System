package com.srs.service;

import com.srs.bean.ShipBean;
import com.srs.dao.ShipDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShipService {

    @Autowired
    private ShipDao repo;

    // ✅ ADD SHIP
    public ShipBean addShip(ShipBean ship) {
        return repo.save(ship);
    }

    // ✅ GET ALL SHIPS
    public List<ShipBean> getAllShips() {
        return repo.findAll();
    }

    // ✅ CHECK IF EXISTS (IMPORTANT)
    public boolean existsById(String id) {
        return repo.existsById(id);
    }

    // ✅ GET ONE SHIP (optional but useful)
    public ShipBean getShipById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ship not found"));
    }

    // ✅ UPDATE SHIP
    public ShipBean updateShip(String id, ShipBean ship) {

        ShipBean existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ship not found"));

        existing.setShipName(ship.getShipName());
        existing.setSeatingCapacity(ship.getSeatingCapacity());
        existing.setReservationCapacity(ship.getReservationCapacity());

        // ❗ NOTE: Not updating image here
        // If you want image update, tell me

        return repo.save(existing);
    }

    // ✅ DELETE SHIP
    public void deleteShip(String id) {
        try {
            repo.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete ship (used in schedule)");
        }
    }
}