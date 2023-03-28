package com.example.backend_v2.repositories;

import com.example.backend_v2.entities.Address;
import com.example.backend_v2.entities.Patient;
import com.example.backend_v2.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.format.annotation.NumberFormat;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address,Long> {

    @Query("SELECT a FROM Address a WHERE a.deleted=false")
    List<Address> findAllNotDeleted();
    @Query("SELECT a FROM Address a WHERE a.street = ?1 AND a.number = ?2 AND a.zipcode = ?3 AND a.state = ?4 AND a.deleted = false")
    Address findByAddress(String street,int number, int zipcode, String state);

}
