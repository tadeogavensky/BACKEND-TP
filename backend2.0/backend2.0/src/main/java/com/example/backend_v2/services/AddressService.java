package com.example.backend_v2.services;

import com.example.backend_v2.entities.Address;
import com.example.backend_v2.entities.Address;
import com.example.backend_v2.repositories.AddressRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    public void AddressController(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }
    private final Logger log = LoggerFactory.getLogger(AddressService.class);

    public List<Address> findAll(){
        return  addressRepository.findAll();
    }

    public List<Address> findAllNotDeleted(){

        return addressRepository.findAllNotDeleted();
    }
    public Optional<Address> findById(Long id){
        return addressRepository.findById(id);
    }

    public Address save(Address address) {
        return addressRepository.save(address);
    }
    
    public Address update(Address address) {
        return addressRepository.save(address);

    }

    public Address safeDelete(Long id){
        Optional<Address> optionalAddress = addressRepository.findById(id);
        if (optionalAddress.isPresent()) {
            Address address = optionalAddress.get();
            address.setDeleted(true);
            System.out.println(address);
            return addressRepository.save(address);
        } else {
            return null;
        }
    }
    public Optional<Address> findByAddress(String street, int number, int zipcode, String state) {
        return Optional.ofNullable(addressRepository.findByAddress(street, number, zipcode, state));
    }
}
