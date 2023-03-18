package com.example.backend_v2.repositories;

import com.example.backend_v2.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address,Long> {
}
