package com.example.backend_v2.services;

import com.example.backend_v2.controllers.AddressController;
import com.example.backend_v2.entities.Address;
import com.example.backend_v2.repositories.AddressRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public class AddressService {

    private AddressRepository addressRepository;

    public void AddressController(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }
    private final Logger log = LoggerFactory.getLogger(AddressService.class);

    public List<Address> findAll(){
        return  addressRepository.findAll();
    }

    public ResponseEntity<Address> findById(Long id){
        Optional<Address> OptAddress =  addressRepository.findById(id);
        return OptAddress.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    public Address save(Address address) {
        return addressRepository.save(address);
    }

    public Address update( Address address) {

        if(!addressRepository.existsById(address.getId())){
            log.warn("The address does not exists!");
        }
        return addressRepository.save(address);

    }

    public ResponseEntity<Address> safeDelete(Long id){
        if(!addressRepository.existsById(id)){
            log.warn("The address does not exists!");
            return ResponseEntity.notFound().build();
        }
        Optional<Address> OptAddress = addressRepository.findById(id);
        if (OptAddress.isPresent()){
            Address address = OptAddress.get();
            address.setDeleted(true);
            addressRepository.save(address);
        }
        return ResponseEntity.noContent().build();
    }
    
}
