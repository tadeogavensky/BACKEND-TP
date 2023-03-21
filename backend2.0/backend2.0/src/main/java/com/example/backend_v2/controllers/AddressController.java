package com.example.backend_v2.controllers;


import com.example.backend_v2.entities.Address;
import com.example.backend_v2.services.AddressService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/address")
@CrossOrigin(origins = "http://localhost:3000")
public class AddressController {
    @Autowired
    AddressService addressService;

    private final Logger log = LoggerFactory.getLogger(AddressController.class);


    @PostMapping()
    public ResponseEntity<Address> save(@RequestBody Address address) {
        return ResponseEntity.ok(addressService.save(address));
    }

    @PutMapping(path = "/{id}")
    public String update(@RequestBody Address address) {
        addressService.update(address);
        return "redirect:/updatesuccess-page";
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Address> safeDelete(@PathVariable Long id){
        return addressService.safeDelete(id);
    }
}
