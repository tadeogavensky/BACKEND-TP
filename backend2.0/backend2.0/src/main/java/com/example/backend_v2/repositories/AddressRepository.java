package com.example.backend_v2.repositories;

import com.example.backend_v2.entities.Address;
import com.example.backend_v2.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AddressRepository extends JpaRepository<Address,Long> {

    @Query("SELECT a FROM Address a WHERE a.street = ?1 AND a.number = ?2 AND a.zipcode = ?3 AND a.state = ?4")
    Address findByAddress(String street,int number, int zipcode, String state);

}
