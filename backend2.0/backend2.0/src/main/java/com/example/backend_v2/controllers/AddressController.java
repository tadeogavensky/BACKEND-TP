package com.example.backend_v2.controllers;


import com.example.backend_v2.entities.Address;
import com.example.backend_v2.services.AddressService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/address")
@CrossOrigin(origins = "http://localhost:3000")
public class AddressController {
    @Autowired
    AddressService addressService;

    private final Logger log = LoggerFactory.getLogger(AddressController.class);

    /* @GetMapping("/findAll")
    public ResponseEntity<?>findAll() {
        return ResponseEntity.ok(addressService.findAll());
    }*/

    @GetMapping("/findAll")
    public ResponseEntity<?> findAllNotDeleted() {
        return ResponseEntity.ok(addressService.findAllNotDeleted());
    }


    @PostMapping()
    public ResponseEntity<?> save(@RequestBody Address address) {
        addressService.save(address);
        return ResponseEntity.ok(addressService.findById(address.getId()));

    }

    @PutMapping(path = "/{id}")
    public String update(@RequestBody Address address) {
        addressService.update(address);
        return "redirect:/updatesuccess-page";
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> safeDelete(@PathVariable(value = "id") Long id) {
        if (addressService.safeDelete(id) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Address could not be found");
        }
        return ResponseEntity.ok().body("Address deleted successfully");
    }
}
