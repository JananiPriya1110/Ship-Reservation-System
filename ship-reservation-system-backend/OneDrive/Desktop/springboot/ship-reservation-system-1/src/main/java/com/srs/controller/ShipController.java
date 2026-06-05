package com.srs.controller;

import com.srs.bean.ShipBean;
import com.srs.service.ShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/ship")
@CrossOrigin(origins = "*")
public class ShipController {

    @Autowired
    private ShipService shipService;

    // ✅ ADD SHIP WITH IMAGE
    @PostMapping("/add")
    public ResponseEntity<?> addShip(
            @RequestParam("shipId") String shipId,
            @RequestParam("shipName") String shipName,
            @RequestParam("seatingCapacity") int seatingCapacity,
            @RequestParam("reservationCapacity") int reservationCapacity,
            @RequestParam("image") MultipartFile image,
            @RequestParam("userType") String userType
    ) {
        try {
            // 🔒 Basic validation
            if (!userType.equals("A")) {
                return ResponseEntity.badRequest().body("Only Admin can add ships");
            }

            if (shipId.isEmpty() || shipName.isEmpty()) {
                return ResponseEntity.badRequest().body("Ship ID and Name required");
            }

            // ❗ Check duplicate
            if (shipService.existsById(shipId)) {
                return ResponseEntity.badRequest().body("Ship ID already exists");
            }

            ShipBean ship = new ShipBean();
            ship.setShipId(shipId);
            ship.setShipName(shipName);
            ship.setSeatingCapacity(seatingCapacity);
            ship.setReservationCapacity(reservationCapacity);

            // ✅ SAVE IMAGE
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path uploadPath = Paths.get("uploads");

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.write(filePath, image.getBytes());

            // ✅ IMAGE URL
            ship.setImageUrl("http://localhost:8080/uploads/" + fileName);

            shipService.addShip(ship);

            return ResponseEntity.ok("Ship Added Successfully");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // ✅ GET ALL SHIPS
    @GetMapping("/all")
    public ResponseEntity<List<ShipBean>> getAllShips() {
        return ResponseEntity.ok(shipService.getAllShips());
    }
     
    //update
    
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateShip(
            @PathVariable String id,
            @RequestParam("shipName") String shipName,
            @RequestParam("seatingCapacity") int seatingCapacity,
            @RequestParam("reservationCapacity") int reservationCapacity,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam String userType
    ) {
        try {
            if (!userType.equals("A")) {
                return ResponseEntity.badRequest().body("Only Admin can update ships");
            }

            ShipBean existing = shipService.getShipById(id);

            existing.setShipName(shipName);
            existing.setSeatingCapacity(seatingCapacity);
            existing.setReservationCapacity(reservationCapacity);

            // ✅ UPDATE IMAGE IF PROVIDED
            if (image != null && !image.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path uploadPath = Paths.get("uploads");

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Path filePath = uploadPath.resolve(fileName);
                Files.write(filePath, image.getBytes());

                existing.setImageUrl("http://localhost:8080/uploads/" + fileName);
            }

            shipService.addShip(existing);

            return ResponseEntity.ok("Ship Updated Successfully");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating ship");
        }
    }

               






















    // ✅ DELETE SHIP
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteShip(
            @PathVariable String id,
            @RequestParam String userType
    ) {
        try {
            if (!userType.equals("A")) {
                return ResponseEntity.badRequest().body("Only Admin can delete ships");
            }

            if (!shipService.existsById(id)) {
                return ResponseEntity.badRequest().body("Ship not found");
            }

            shipService.deleteShip(id);

            return ResponseEntity.ok("Ship Deleted");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    "Cannot delete ship (it may be used in schedule)"
            );
        }
    }
}
